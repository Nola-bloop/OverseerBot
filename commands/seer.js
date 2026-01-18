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
		.setName('create-chapter-group')
		.setDescription('Create a chapter-group.')
		.addStringOption(option =>
        	option
        		.setName('n')
        		.setDescription('The name of the chapter group.')
        		.setRequired(true)
        )
	),
	async execute (interaction) {
		const userId = interaction.member.user.id;
		const username = interaction.member.user.username
		const sub = interaction.options.getSubcommand();
		const guild = interaction.guild

		if (sub === "passwd"){
			caller.UpdatePassword(userId, username, interaction.options.getString("p"))
		}
		else if (sub === "create-chapter-group") {
			let campaign = caller.GetGuildCampaign(guild.id)
			if (campaign.response){ console.log(campaign.response); caller.Reply(interaction, "Could not create the chapter group: "+campaign.response) }

			await caller.CreateChapterGroup(interaction.options.getString("n"), campaign.id)
		}
	}
};