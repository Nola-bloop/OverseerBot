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

export default {
	Respond : async (interaction, message) => {
		await interaction.reply({ content: message, flags: MessageFlags.Ephemeral })
	},
	Reply : async (interaction, message) => {
		await interaction.reply({ content: message, flags: MessageFlags.Ephemeral })
	},
	UpdatePassword : async (dc_user_id, dc_username, password_clear) => {
		dc_username = sanitize(dc_username)
		const fetchUrl = `${API_URL}/users?discordId=${dc_user_id}&discordUsername=${dc_username}&passwordClear=${password_hash}`
		const response = await fetch(fetchUrl, {
		  method: "POST"
		});

		let data = await response.json()
		return data
	},
	CreateChapterGroup : async (name, campaign) => {
		name = sanitize(name)
		const fetchUrl = `${API_URL}/clusterInput/chapterGroup?name=${name}&campaign=${campaign}`
		const response = await fetch(fetchUrl, {
		  method: "GET"
		});

		let data = await response.json()
		return data
	},
	CreateChapter : async (name, isCanon, dcChannelId, campaign, chapterGroup) => {
		name = sanitize(name)
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
		  method: "GET",
		  body: messageJson
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
}