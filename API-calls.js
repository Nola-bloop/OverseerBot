const API_URL = "http://107.152.41.172:8889"
import { MessageFlags } from 'discord.js';

function sanitize(str) {
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&apos;')
              .replace(/\\/g, '&bsol;')
              .replace(/ /g, '&nbsp;');
}

async function fetchMessagesAfterFromTextChannelCopilot(textChannel, afterDate) {
    const cutoff = new Date(afterDate);
    const collected = [];
    let lastId = null;

    while (true) {
        const options = { limit: 100 };
        if (lastId) options.after = lastId;

        const messages = await textChannel.messages.fetch(options);
        if (messages.size === 0) break;

        for (const msg of messages.values()) {
            if (msg.createdAt > cutoff) {
                collected.push(msg);
            }
        }

        lastId = messages.last().id;
    }

    return collected;
}
async function fetchMessagesAfterFromTextChannel(channel, afterDate) {
  const cutoff = new Date(afterDate);
  const collected = [];
  let lastId;

  while (true) {
    const options = { limit: 100 };
    if (lastId) options.before = lastId;

    const messages = await channel.messages.fetch(options);
    if (messages.size === 0) break;

    for (const msg of messages.values()) {
      if (msg.createdAt > cutoff) {
        collected.push(msg);
      }
    }

    // Stop early once it's gone past the cutoff
    if (messages.last().createdAt <= cutoff) {
      break;
    }

    lastId = messages.last().id;
  }

  return collected;
}

export default {
	Respond : async (interaction, message) => {
		await interaction.reply({ content: message, flags: MessageFlags.Ephemeral })
	},
	Reply : async (interaction, message) => {
		await interaction.reply({ content: message, flags: MessageFlags.Ephemeral })
	},
	LogNewMessages: async function (client) {
	  let campaigns = await this.GetAllCampaigns()

	  let chapters = []

		for (const g of campaigns) {
		  const chaps = await this.GetAllChaptersFromCampaign(g.id)
		  chapters.push(...chaps)
		}

		const chapterMap = new Map()
		chapters.forEach(c => chapterMap.set(c.id, c))

		for (const ch of chapters) {
		  const latestMessages = await this.GetLatestMessageFromChapter(ch.id)
		  for (const lm of latestMessages){
		  	let sourceChannel

		  	if (lm.thread === 0) {
				    sourceChannel = await client.channels.fetch(ch.dc_channel_id);
				}

				if (lm.thread !== 0) {
				    const threadInfo = await this.GetThreadFromId(lm.thread);
				    sourceChannel = await client.channels.fetch(threadInfo.dc_thread_id);
				}

		  	let messages = await fetchMessagesAfterFromTextChannel(sourceChannel, new Date(lm.date_sent))

		  	for (const m of messages){
		  		let speaker = await this.GetCharacterFromCampaignAndName(ch.campaign, m.author.username)
		  		await this.CreateMessage({
		  			message: m.content,
		  			dc_message_id: m.id,
		  			chapter: ch.id,
		  			speaker: speaker.id,
		  			date_sent: m.createdAt,
		  			thread: m.channel.isThread() ? await this.GetThreadFromPair(m.channel.id, m.channel.name) : 0
		  		})
		  	}
		  }
		}
	},
	UpdatePassword : async (dc_user_id, dc_username, password_clear) => {
		const fetchUrl = `${API_URL}/users?discordId=${dc_user_id}&discordUsername=${dc_username}&passwordClear=${password_clear}`
		const response = await fetch(fetchUrl, {
		  method: "POST"
		});

		let data = await response.json()
		return data
	},
	CreateChapterGroup : async (name, campaign) => {
		const fetchUrl = `${API_URL}/clusterInput/chapterGroup?name=${name}&campaign=${campaign}`
		const response = await fetch(fetchUrl, {
		  method: "GET"
		});

		let data = await response.json()
		return data
	},
	CreateChapter : async (name, isCanon, dcChannelId, campaign, chapterGroup) => {
		const fetchUrl = `${API_URL}/clusterInput/chapter?name=${name}&isCanon=${isCanon}&dcChannelId=${dcChannelId}&campaign=${campaign}&chapterGroup=${chapterGroup}`
		console.log(fetchUrl)
		const response = await fetch(fetchUrl, {
		  method: "GET"
		});

		let data = await response.json()
		return data
	},
	CreateMessage : async (messageJson) => {
		messageJson.message = sanitize(messageJson.message)
		const fetchUrl = `${API_URL}/clusterInput/message`
		const response = await fetch(fetchUrl, {
		  method: "POST",
		  headers: { "Content-Type": "application/json" },
		  body: JSON.stringify(messageJson)
		});

		let data = await response.json()
		return data
	},
	CreateThread : async (name, dc_thread_id) => {
		const fetchUrl = `${API_URL}/clusterInput/thread?name=${name}&dc_thread_id=${dc_thread_id}`
		const response = await fetch(fetchUrl, {
		  method: "GET",
		});

		let data = await response.json()
		return data
	},
	UpdateChapterToGroupRelation : async (chapterGroupId, chapterId) => {
		const fetchUrl = `${API_URL}/clusterInput/chapter?chapterGroup=${chapterGroupId}&chapterId=${chapterId}`
		const response = await fetch(fetchUrl, {
		  method: "PUT",
		});

		let data = await response.json()
		return data
	},
	GetLatestMessageFromChapter : async (chapterId) => {
		const fetchUrl = `${API_URL}/clusterInput/message/latest/${chapterId}`
		const response = await fetch(fetchUrl, {
		  method: "GET",
		});

		let data = await response.json()
		return data
	},
	GetGuildCampaign : async (dc_guild_id) => {
		const fetchUrl = `${API_URL}/clusterOutput/campaign/guild/${dc_guild_id}`
		console.log(`guild fetch url: ${fetchUrl}`)
		const response = await fetch(fetchUrl, {
		  method: "GET",
		});

		let data = await response.json()
		return data
	},
	GetChapterFromChannelAndGuild : async (campaignId, channelId) => {
		const fetchUrl = `${API_URL}/clusterOutput/chapter/campchanid/${campaignId}/${channelId}`
		const response = await fetch(fetchUrl, {
		  method: "GET",
		});

		let data = await response.json()
		return data
	},
	GetChapterGroupFromGuildAndName : async (campaignId, name) => {
		const fetchUrl = `${API_URL}/clusterOutput/chapterGroup/pair/${campaignId}/${name}`
		const response = await fetch(fetchUrl, {
		  method: "GET",
		});

		let data = await response.json()
		return data
	},
	GetAllChaptersFromCampaign : async (campaignId) => {
		const fetchUrl = `${API_URL}/clusterOutput/chapter/all/${campaignId}`
		const response = await fetch(fetchUrl, {
		  method: "GET",
		});

		let data = await response.json()
		return data
	},
	GetAllCampaigns : async (campaignId) => {
		const fetchUrl = `${API_URL}/clusterOutput/campaign/all`
		const response = await fetch(fetchUrl, {
		  method: "GET",
		});

		let data = await response.json()
		return data
	},
	GetCharacterFromCampaignAndName : async (campaignId, name) => {
		const fetchUrl = `${API_URL}/character/pair/${campaignId}/${name}`
		const response = await fetch(fetchUrl, {
		  method: "GET",
		});

		let data = await response.json()
		return data
	},
	GetThreadFromPair : async (threadDiscordId, name) => {
		const fetchUrl = `${API_URL}/thread/pair/${threadDiscordId}/${name}`
		const response = await fetch(fetchUrl, {
		  method: "GET",
		});

		let data = await response.json()
		return data
	},
	GetThreadFromId : async (threadId) => {
		const fetchUrl = `${API_URL}/thread/id/${threadId}`
		const response = await fetch(fetchUrl, {
		  method: "GET",
		});

		let data = await response.json()
		return data
	}
}