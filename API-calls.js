const API_URL = "https://nolar-eclipse.ca:8443"
import { MessageFlags } from 'discord.js';

const TUPPERBOTID = "431544605209788416"

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
async function fetchAllThreads(channel) {
    // Get active threads from cache
    let activeThreads = Array.from(channel.threads.cache.values());
    if (!activeThreads){
    	console.log("could not read active threads:")
    	console.log(activeThreads)
    	activeThreads = []
    }

    // Fetch archived threads
    let archivedThreads = await channel.threads.fetchArchived();
    archivedThreads = archivedThreads.threads
    if (!archivedThreads){
    	console.log("could not read archived threads:")
    	console.log(archivedThreads)
    	archivedThreads = []
    }


    // Combine both active and archived threads
    const allThreads = [...activeThreads, ...archivedThreads];

    for (let i = 0; i < allThreads.length; i++){
    	if (!allThreads[i].name){
    		for (let j = 0; j < allThreads[i].length; j++){
    			if (allThreads[i][j].name) allThreads[i] = allThreads[i][j]
    		}
    	}
    }

    return allThreads;
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
	deferReply : async (interaction, message) => {
		await interaction.deferReply({ flags: [MessageFlags.Ephemeral] })
	},
	Reply : async (interaction, message) => {
		await interaction.reply({ content: message, flags: MessageFlags.Ephemeral })
	},
	editDeferReply : async (interaction, message) => {
		await interaction.editReply({ content: message })
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

		//good up to here

		for (const ch of chapters) {
		  let latestMessages = await this.GetLatestMessageFromChapter(ch.id)
		  const channel = await client.channels.fetch(ch.dc_channel_id);
		  const allThreads = await fetchAllThreads(channel);
		  if (!latestMessages || latestMessages.length === 0){
		  	latestMessages = [{
			    thread: {id:0},
			    date_sent: "1970-01-01T00:00:00"
			  }];
		  }
		  console.log("threads comparaison: " + `${allThreads.length} > ${latestMessages.length}`)
		  if (allThreads.length >= latestMessages.length){
			  //console.log("all threads")
			  //console.log(allThreads)

			  for (const t of allThreads) {
			  	console.log("t:")
			  	console.log(t.name)
			  	if (!t.name) console.log(t[1])
			    const dbThread = await this.GetThreadFromPair(t.id, t.name);
			    latestMessages.push({
			      thread: {id:dbThread.id},
			      date_sent: "1970-01-01T00:00:00"
			    });
			  }
		  }
		  console.log("lm:")
		  console.log(latestMessages)
		  for (const lm of latestMessages){
		  	let sourceChannel



		  	if (lm.thread.id === 0) {
			    sourceChannel = await client.channels.fetch(ch.dc_channel_id);
			}

			if (lm.thread.id !== 0) {
			    const threadInfo = await this.GetThreadFromId(lm.thread.id);
			    sourceChannel = await client.channels.fetch(threadInfo.dc_thread_id);
			}

			console.log("sourceChan:" + sourceChannel?.name ?? "none")

		  	let messages = await fetchMessagesAfterFromTextChannel(sourceChannel, new Date(lm.date_sent))

		  	console.log("messages:" + messages?.length ?? "none")

		  	for (const m of messages){
		  		if (m.type === 18) continue //skip thread initiators
		  		let speaker = await this.GetCharacterFromCampaignAndName(ch.campaign, m.member?.displayName ?? m.author.globalName ?? m.author.username ?? "Unnamed")
		  		let res = await this.CreateMessage({
		  			message: m.content,
		  			dc_message_id: m.id,
		  			chapter: ch.id,
		  			speaker: speaker.id,
		  			date_sent: m.createdAt,
		  			thread: m.channel.isThread() ? (await this.GetThreadFromPair(m.channel.id, m.channel.name)).id : 0
		  		})
		  	}
		  	console.log("exitted m loop")
		  }
		  console.log("exitted lm loop")
		}
		console.log("exitted ch loop")
	},
	UpdatePassword : async (dc_user_id, dc_username, password_clear) => {
		const fetchUrl = `${API_URL}/users?discordId=${dc_user_id}&discordUsername=${dc_username}&passwordClear=${password_clear}`
		console.log("Fetching : "+fetchUrl)
		const response = await fetch(fetchUrl, {
		  method: "POST"
		});

		let data = await response.json()
		return data
	},
	CreateChapterGroup : async (name, campaign) => {
		const fetchUrl = `${API_URL}/clusterInput/chapterGroup?name=${name}&campaign=${campaign}`
		console.log("Fetching : "+fetchUrl)
		const response = await fetch(fetchUrl, {
		  method: "GET"
		});

		let data = await response.json()
		return data
	},
	CreateChapter : async (name, isCanon, dcChannelId, campaign, chapterGroup) => {
		const fetchUrl = `${API_URL}/clusterInput/chapter?name=${name}&isCanon=${isCanon}&dcChannelId=${dcChannelId}&campaign=${campaign}&chapterGroup=${chapterGroup}`
		console.log("Fetching : "+fetchUrl)
		const response = await fetch(fetchUrl, {
		  method: "GET"
		});

		let data = await response.json()
		console.log("message res: "+data)
		return data
	},
	CreateMessage : async (messageJson) => {
		const fetchUrl = `${API_URL}/clusterInput/message`
		console.log("Fetching : "+fetchUrl+" ; "+messageJson.message.substring(0, 15)+"...")
		const response = await fetch(fetchUrl, {
		  method: "POST",
		  headers: { "Content-Type": "application/json" },
		  body: JSON.stringify(messageJson)
		});

		let data = await response.json()
		return data
	},
	CreateThread : async (name, dc_thread_id) => {
		const fetchUrl = `${API_URL}/clusterInput/thread`
		console.log("Fetching : "+fetchUrl)
		const response = await fetch(fetchUrl, {
		  method: "POST",
		  headers: { "Content-Type": "application/json" },
		  body: JSON.stringify({
		  	name:name,
		  	dc_thread_id:dc_thread_id
		  })
		});

		let data = await response.json()
		return data
	},
	UpdateChapterToGroupRelation : async (chapterGroupId, chapterId) => {
		const fetchUrl = `${API_URL}/clusterInput/chapter?chapterGroup=${chapterGroupId}&chapterId=${chapterId}`
		console.log("Fetching : "+fetchUrl)
		const response = await fetch(fetchUrl, {
		  method: "PUT",
		});

		let data = await response.json()
		return data
	},
	GetLatestMessageFromChapter : async (chapterId) => {
		const fetchUrl = `${API_URL}/clusterOutput/message/latest/${chapterId}`
		console.log("Fetching : "+fetchUrl)
		const response = await fetch(fetchUrl, {
		  method: "GET",
		});

		let data = await response.json()
		return data
	},
	GetGuildCampaign : async (dc_guild_id) => {
		const fetchUrl = `${API_URL}/clusterOutput/campaign/guild/${dc_guild_id}`
		console.log("Fetching : "+fetchUrl)
		const response = await fetch(fetchUrl, {
		  method: "GET",
		});

		let data = await response.json()
		return data
	},
	GetChapterFromChannelAndGuild : async (campaignId, channelId) => {
		const fetchUrl = `${API_URL}/clusterOutput/chapter/campchanid/${campaignId}/${channelId}`
		console.log("Fetching : "+fetchUrl)
		const response = await fetch(fetchUrl, {
		  method: "GET",
		});

		let data = await response.json()
		return data
	},
	GetChapterGroupFromGuildAndName : async (campaignId, name) => {
		const fetchUrl = `${API_URL}/clusterOutput/chapterGroup/pair/${campaignId}/${name}`
		console.log("Fetching : "+fetchUrl)
		const response = await fetch(fetchUrl, {
		  method: "GET",
		});

		let data = await response.json()
		return data
	},
	GetAllChaptersFromCampaign : async (campaignId) => {
		const fetchUrl = `${API_URL}/clusterOutput/chapter/all/${campaignId}`
		console.log("Fetching : "+fetchUrl)
		const response = await fetch(fetchUrl, {
		  method: "GET",
		});

		let data = await response.json()
		return data
	},
	GetAllCampaigns : async (campaignId) => {
		const fetchUrl = `${API_URL}/clusterOutput/campaign/all`
		console.log("Fetching : "+fetchUrl)
		const response = await fetch(fetchUrl, {
		  method: "GET",
		});

		let data = await response.json()
		return data
	},
	GetCharacterFromCampaignAndName : async (campaignId, name) => {
		const fetchUrl = `${API_URL}/clusterOutput/character/pair/${campaignId}/${name}`
		console.log("Fetching : "+fetchUrl)
		const response = await fetch(fetchUrl, {
		  method: "GET",
		});

		let data = await response.json()
		return data
	},
	GetThreadFromPair : async (threadDiscordId, name) => {
		const fetchUrl = `${API_URL}/clusterOutput/thread/pair/`
		console.log("Fetching : "+fetchUrl)
		const response = await fetch(fetchUrl, {
		  method: "POST",
		  headers: { "Content-Type": "application/json" },
		  body: JSON.stringify({
		  	name:name,
		  	dc_thread_id:threadDiscordId
		  })
		});

		let data = await response.json()
		return data
	},
	GetThreadFromId : async (threadId) => {
		const fetchUrl = `${API_URL}/clusterOutput/thread/id/${threadId}`
		console.log("Fetching : "+fetchUrl)
		const response = await fetch(fetchUrl, {
		  method: "GET",
		});

		let data = await response.json()
		return data
	}
}