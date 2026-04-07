import {
    SlashCommandBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    MessageFlags
} from 'discord.js';

const PAGE_SIZE = 20;

export const entries = {
    Bestiary : {
        "☆ Undeads ☆" : {
            "Zombie" : {
                type:"entry",
                relations:["Laucian Caerwyn"],
                text:`
# Zombies
test entry.
Entries will contain a brief description of the enemy, possibly special encounters as well.

There can also be a record of usual stats for this creature, like

> hp : 20-25
> str: 1
> dex: -2
> con: 1
> int: -5
> wis: -5
> cha: -5

*!! Inflicts necrosis on melee hit.*

stuff like that.

# also you may notice that this entry is related to Lauc, that's also a test :p
`
            },
            "Skeleton": {
                type:"entry",
                relations:[],
                text:`
# Skeletons
test entry
`
            },
        },
        "☆ Aberrations ☆" : {

        },
        "☆ Celestials ☆" : {

        },
        "☆ Demons ☆" : {

        },
        "☆ Fauna ☆" : {

        },
    },
    Cast : {
        "Laucian Caerwyn": {
            type:"entry",
            relations:[],
            text:`
# Laucian Caerwyn
-# *mag  ‧  3      str  ‧  3      def  ‧  2      int  ‧  2      hp  ‧  64*

## Physique
dark colors, ashy grey, muddled brown. pops of red, and deep sapphire blue. rusted metal, shiny gemstones. a freshly sharpened sword. an assortment of animal skins: leather, fur, snakeskin boots. smells of oak, cedar, musk, & lavender.

## Backstory
born in the woods to his mother odille, laucian grew up far removed from his royal heritage. nineteen years later, the king caught wind of the existence of his bastard son, though by then lauc’s mother had already passed. with nothing left to tether himself to the traveller clan of elves he was raised by, lauc accepted the king’s offer to return to court. when he arrived at the palace in valcrest, it was decided lauc would be placed under the care of his uncle, head commander of the knights of valmora. they travelled together for the remainder of his youth. when he grew of age, he was given his own troupe of knights, a small group that oversees “special operatives”, often stationed at remote edges of the kingdom.
`
        },
        "Samira Suleiman": {
            type:"entry",
            relations:[],
            text:`
# Samira "Mira" Suleiman
-# *mag  ‧  5      dex  ‧  1      cha  ‧  2      int  ‧  2      hp  ‧  64*

## Physique
gold, silver, smoky greys, and a deep, sunset orange. rubies, sapphires, emeralds. freshly dipped incense, and rose petals.

## Backstory
samira was born for one purpose alone: to someday advise the king as the suleiman family had for several suns. she was trained for this role in the ancient city of zahira, deep in the dunes of the outer reaches of the high desert. raised in solitude aside from her sisters, under sloped sandstone walls, samira’s divination of sun magic culminated at a young age. she was revered, and worshipped: a prodigy. what her family didn’t account for, was the sliver of snake blood leftover in her mother’s lineage passing on to samira. “the palace has no place for a serpent.”

the role she had been coveting was transitioned over to her younger sister, sumaiya. determined to leave valmora for good, samira’s plans were interrupted by prince lauc, who offered her a position as his counsel. he remarked how she blended into the night, the shine of her scales revealing her in the moonlight.
`
        },
        "Kazmir Naivros" : {
            type:"entry",
            relations:[],
            text:`
# Kazmir “Kaz” Naivros
-# *int  ‧  1      str  ‧  4      def  ‧  2      cha  ‧  1      hp  ‧  70*

## Physique
lush greens, light and dark, and all shades in between. rich browns, reds, yellow. cinnamon, cardamon, evergreen, & honey.

## Backstory
whether the stranger from his childhood was a dream, or a mirage, kaz is uncertain, but one fact remains certain: the powers he was gifted are a curse. at any moment, against his will, a wild magic appears at his fingertips, threatening everything around him. after an accident in his youth, kaz fled to the ancient parts of the woodlands, isolated from civilization and his hometown in the river valley.

kaz encountered the prince spontaneously, offering assistance as a guide through the outer edges of the forest. upon witnessing kaz’s fortitude, lauc extended an offer: serve as his guard on his journeys across the far reaches of the kingdom. the two quickly formed an unexpected and cherished companionship. together, they formed the start of the seventeenth oath, an offshoot of valmora’s royal knights.
`
        },
    },
    Map : {
        "Valcrest" : {
            type:"entry",
            relations: ["Valmora"],
            text: ``,
        }
    }
}

export function buildPage(list, page, pathPrefix = "") {
    let keys = Object.keys(list).sort()
    const maxPage = Math.max(0, Math.ceil(keys.length / PAGE_SIZE) - 1);

    page = Math.max(0, Math.min(page, maxPage));

    const start = page * PAGE_SIZE;
    const currentEntries = keys.slice(start, start + PAGE_SIZE);

    const path = pathPrefix.split('_')
    let title = ""
    for (let i = 0; i < path.length; i++){
        if (path[i] !== "") {
            title += path[i]
            if (i !== path.length-1) title += " → "
        }
    }
    if (title === "") title = "Categories"


    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription('Browse the records of the Valmora campaign!')
        .setFooter({ text: `Page ${page + 1}/${maxPage + 1}` });

    const buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId(`info_prev${pathPrefix}_${page}`)
            .setLabel('◀')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(page === 0),

        new ButtonBuilder()
            .setCustomId(`info_next${pathPrefix}_${page}`)
            .setLabel('▶')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(page === maxPage),

        new ButtonBuilder()
            .setCustomId(`info_back${pathPrefix}`)
            .setLabel('Go back')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(pathPrefix == ""),
    );

    const components = [];

    let row = null
    for (let i = 0; i < currentEntries.length; i++){
        if (i % 4 == 0) row = new ActionRowBuilder()

        row.addComponents(
            new ButtonBuilder()
            .setCustomId('info_entry'+pathPrefix+'_'+currentEntries[i])
            .setLabel(""+currentEntries[i])
            .setStyle(ButtonStyle.Primary)
        )


        if (i%4 == 3 || i == currentEntries.length-1) components.push(row)
    }

    components.push(buttons);

    return {
        embeds: [embed],
        components,
        flags: [MessageFlags.Ephemeral]
    };
}

export function buildEntry(entry, key, pathPrefix = "", page = 1){

    if (entry.type !== "entry") return {
        content: "Invalid operation. **Tell Nola!!** (with how you got there if possible)"
    }

    if (typeof entry.text == "string") entry.text = [entry.text]

    console.log(`type: ${typeof entry.text[page-1]}`)

    const embed = new EmbedBuilder()
        .setTitle("You are consulting the entry for "+key)
        .setDescription(`Page: ${page}/${entry.text.length}.`)
        .setFooter({ text: `See also...` });

    const components = [];

    const buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId(`info_back${pathPrefix}`)
            .setLabel('Go back')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(false),
    );


    let row = null
    for (let i = 0; i < entry.relations?.length ?? 0; i++){
        if (i % 4 == 0) row = new ActionRowBuilder()

        row.addComponents(
            new ButtonBuilder()
            .setCustomId('info_query_'+entry.relations[i])
            .setLabel(""+entry.relations[i])
            .setStyle(ButtonStyle.Primary)
        )


        if (i%4 == 3 || i == entry.relations.length-1) components.push(row)
    }

    components.push(buttons);

    return {
        content: entry.text[page-1],
        embeds: [embed],
        components,
        flags: [MessageFlags.Ephemeral]
    };
}

export function queryEntries(query){
    let searchObjs = [entries]
    while (searchObjs.length !== 0){
        if (searchObjs[0][query] !== undefined) return searchObjs[0][query]
        for (var k in searchObjs[0]){
            if (searchObjs[0][k].length ?? 0 > 0) searchObjs.push(searchObjs[0][k])
        }
        searchObjs.shift()
    }
    return {
        key: "Invalid entry.",
        type:"entry",
        relations:[],
        text:"Invalid entry."
    }
}