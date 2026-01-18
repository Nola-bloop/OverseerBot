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
	["set-group"] : async (message) => {
		const user = message.author
		const guild = message.guild
		const channel = message.channel

		let campaign = caller.GetGuildCampaign(guild.id)
		if (campaign.response){ console.log(campaign.response); caller.Reply(interaction, "Could not create the chapter group: "+campaign.response) }
		let name = extractArgument(message.content)
		let chapter = await caller.GetChapterFromChannelAndGuild(campaign.id, channel.id)

		if (chapter.response) { console.log(chapter.response); caller.Reply(interaction, "Could not create the chapter group: "+chapter.response) }

		await caller.CreateChapterGroup(name, campaign.id)

		let chapterGroup = await GetChapterGroupFromGuildAndName(campaign.id, name)
		//chapter group should exist, provided the API works.

		await caller.UpdateChapterToGroupRelation(chapterGroup.id, chapter.id)
	}
}