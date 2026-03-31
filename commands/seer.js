import { SlashCommandBuilder, MessageFlags } from 'discord.js';
import caller from '../API-calls.js';

const PC_POOL = [
    "Arya",
    "Onyx",
    "Éponine",
    "Gabrielle",
    "Guinevere",
    "Pragma",
    "Atrel",
    "Winnie",
    "Ranona",
]

const NPC_POOL = [
    "Laucian",
    "Kazmir",
    "Samira",
    "Valen",
    "Vesper",
    "Emeril",
    "Kaelus"

    //the ones below will be added later once we know more about them
    //"Terathi'in",
    //"The foreteller",
    //"Leonidas",
    //"Stellan",
    //"Evander",

]

const PROMPT_POOL = [
    `That wasn't supposed to happen`,
    `I didn't think it would hurt this much`,
    `Say it again. slowly`,
    `That's not what you told me last time.`,
    `You promised.`,
    `Stay. Just for a minute.`,
    `I made this for you.`,
    `Do you hate me for it?`,
    `I can't fix this`,
    `I thought of you`,
    `I'll stay up with you.`,
    `You're terrible at this.`
]

const AUTHORIZED_USERS = [
	"300012833016512514", //Nola
	"1290040130622591038",
]

function getRandomElement(array, pullCount){

    let selection = []

    for (let i = 0; i < pullCount; i++){
        selection.push(array[Math.floor(Math.random() * array.length)])
        array = array.filter(item => item !== selection[selection.length])
    }

    return selection;
}

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
	)
    .addSubcommand(subCommand =>
        subCommand
        .setName('get-prompt')
        .setDescription("Get a prompt, along with characters to use.")
        .addBooleanOption(option =>
            option
            .setName("add-npcs")
            .setDescription("Add characters like Samira, Kaz, etc to the selection pool.")
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option
            .setName('character-count')
            .setDescription("Select <this many> characters for the cast.")
        )

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
			await caller.deferReply(interaction, "Logging...")

			await caller.LogNewMessages(interaction.client)
			return await caller.editDeferReply(interaction, "success")
		}
		else if (sub === "url"){
			return await caller.Reply(interaction, "[nolar-eclipse.ca](https://nolar-eclipse.ca/?guild="+guild.id+")")
		}
        else if (sub === "get-prompt"){
            const addNPCs = interaction.options.getBoolean('add-npcs') ?? false
            const pickCount = interaction.options.getInteger('character-count') ?? 1



            if (pickCount < 0) pickCount = 0

            let charaPool = [...PC_POOL]

            if (addNPCs) charaPool.push(...NPC_POOL)

            let characters = getRandomElement(charaPool, pickCount)



            let prompt = getRandomElement(PROMPT_POOL, 1)[0]



            let msg = `## Your prompt:\n\n`

            msg += '> "'+prompt+'"\n\n'

            msg += 'Selected characters:\n'

            msg += '`'

            for (let i = 0; i < characters.length; i++){
                msg += characters[i]+'\n'
            }
            msg += '`'

            return await caller.Reply(interaction, msg)
        }
	}
};