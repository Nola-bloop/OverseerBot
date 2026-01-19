import caller from '../API-calls.js';

function extractArgument(input) {
    // Remove the leading &command
    const withoutCommand = input.trim().replace(/^&\S+\s*/, "");

    // Quoted argument
    if (withoutCommand.startsWith('"')) {
        const match = withoutCommand.match(/^"([^"]*)"/);
        return match ? match[1] : null;
    }

    // Unquoted argument
    const match = withoutCommand.match(/^\S+/);
    return match ? match[0] : null;
}

export default {
	["track-channel"] : async (message) => {
		const user = message.author
		const guild = message.guild
		const channel = message.channel

		let campaign = await caller.GetGuildCampaign(guild.id)
		if (campaign.response){ console.log(campaign.response); await caller.Reply(message, "Could not create the chapter: "+campaign.response) }
		if (!campaign){ console.log("Could not fetch campaign"); await caller.Reply(message, "Could not create the chapter.") }

		await caller.CreateChapter(channel.name, 1, channel.id, campaign.id, 0)
		await caller.Reply(message, "Success.")
	},
	["set-group"] : async (message) => {
		const user = message.author
		const guild = message.guild
		const channel = message.channel

		let campaign = await caller.GetGuildCampaign(guild.id)
		if (campaign.response){ console.log(campaign.response); await caller.Reply(message, "Could not create the chapter group: "+campaign.response) }
		let name = extractArgument(message.content)
		let chapter = await caller.GetChapterFromChannelAndGuild(campaign.id, channel.id)

		if (chapter.response) { console.log(chapter.response); await caller.Reply(message, "Could not create the chapter group: "+chapter.response) }

		await caller.CreateChapterGroup(name, campaign.id)

		let chapterGroup = await GetChapterGroupFromGuildAndName(campaign.id, name)
		//chapter group should exist, provided the API works.

		await caller.UpdateChapterToGroupRelation(chapterGroup.id, chapter.id)

		caller.Reply(message, "Success.")
	}
}