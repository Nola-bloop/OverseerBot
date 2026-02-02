import { SlashCommandBuilder, MessageFlags } from 'discord.js';
import caller from '../API-calls.js';

const AUTHORIZED_USERS = [
	"300012833016512514", //Nola
	"1290040130622591038",
]

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
	)
	.addSubcommand(subCommand =>
		subCommand
		.setName('track-channel')
		.setDescription('Add this channel to the tracked channel list.')
	)
	.addSubcommand(subCommand =>
		subCommand
		.setName('forced-refresh')
		.setDescription('Make the bot scan the channels ahead of schedule.')
	)
	.addSubcommand(subCommand =>
		subCommand
		.setName('url')
		.setDescription("Get a link to the guild's campaign.")
	),
	async execute (interaction) {
		const user = interaction.member.user;
		const sub = interaction.options.getSubcommand();
		const guild = interaction.guild
		const channel = interaction.channel

		if (sub === "passwd"){
			return await caller.Reply(interaction, "Command not implemented yet.")
			caller.UpdatePassword(user.id, user.username, interaction.options.getString("p"))
		}
		else if (sub === "set-group") {
			return await caller.Reply(interaction, "Command not implemented yet.")

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
		else if (sub === "track-channel"){
			if (!AUTHORIZED_USERS.includes(user.id)){
				return await caller.Reply(interaction, "You are not authorized to use this command.")
			}

			let campaign = await caller.GetGuildCampaign(guild.id)
			if (campaign.response){ console.log(campaign.response); return await caller.Reply(interaction, "Could not create the chapter: "+campaign.response) }
			if (!campaign){ console.log("Could not fetch campaign"); return await caller.Reply(interaction, "Could not create the chapter.") }

			await caller.CreateChapter(channel.name, 1, channel.id, campaign.id, 0)
			await caller.Reply(interaction, "Success.")

		}
		else if (sub === "forced-refresh"){
			if (!AUTHORIZED_USERS.includes(user.id)){
				return await caller.Reply(interaction, "You are not authorized to use this command.")
			}

			await caller.LogNewMessages(client)
			return await caller.Respond(interaction, "success")
		}
		else if (sub === "url"){
			return await caller.Respond(interaction, "[nolar-eclipse.ca](https://nolar-eclipse.ca/?guild="+guild.id+")")
		}
	}
};