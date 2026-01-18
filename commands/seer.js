import { SlashCommandBuilder, MessageFlags } from 'discord.js';
import caller from '../API-calls.js';
export default {
	data: new SlashCommandBuilder()
	.setName('dnd')
	.setDescription('Manage overseer bot.')
	.addSubcommand(subCommand =>
		subCommand
			.setName('passwd')
			.setDescription('Set account password for Overseer Bot.')
			.addStringOption(option =>
	        	option
	        		.setName('p')
	        		.setDescription('The new password.')
	        		.setRequired(true)
	        )
	).addSubcommand(subCommand =>
		subCommand
		.setName('set-group')
		.setDescription('Set the group of the channel the command is executed in.')
		.addStringOption(option =>
        	option
        		.setName('n')
        		.setDescription('The name of the chapter group.')
        		.setRequired(true)
        )
	),
	async execute (interaction) {
		const user = interaction.member.user;
		const sub = interaction.options.getSubcommand();
		const guild = interaction.guild
		const channel = interaction.channel

		if (sub === "passwd"){
			caller.UpdatePassword(user.id, user.username, interaction.options.getString("p"))
		}
		else if (sub === "set-group") {
			let campaign = caller.GetGuildCampaign(guild.id)
			if (campaign.response){ console.log(campaign.response); caller.Reply(interaction, "Could not create the chapter group: "+campaign.response) }
			let name = interaction.options.getString("n")
			let chapter = await GetChapterFromChannelAndGuild(campaign.id, channel.id)

			if (chapter.response) { console.log(chapter.response); caller.Reply(interaction, "Could not create the chapter group: "+chapter.response) }

			await caller.CreateChapterGroup(name, campaign.id)

			let chapterGroup = await GetChapterGroupFromGuildAndName(campaign.id, name)
			//chapter group should exist, provided the API works.

			await caller.UpdateChapterToGroupRelation(chapterGroup.id, chapter.id)
		}
	}
};