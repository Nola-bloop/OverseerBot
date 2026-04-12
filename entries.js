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
                text:`# Zombies\ntest entry.\nEntries will contain a brief description of the enemy, possibly special encounters as well.\n\nThere can also be a record of usual stats for this creature, like\n\n> hp : 20-25\n> str: 1\n> dex: -2\n> con: 1\n> int: -5\n> wis: -5\n> cha: -5\n\n*!! Inflicts necrosis on melee hit.*\n\nstuff like that.\n\n# also you may notice that this entry is related to Lauc, that's also a test :p`
            },
            "Skeleton": {
                type:"entry",
                relations:[],
                text:`# Skeletons\ntest entry`
            },
        },
        "☆ Aberrations ☆" : {

        },
        "☆ Celestials ☆" : {

        },
        "☆ Demons ☆" : {
            "The Demon":{
                type:"entry",
                relations:["Eponine Snjordottir"],
                text:`# The Demon\n\nKnown to sometimes take over Éponine's body. No other information.`
            }
        },
        "☆ Fauna ☆" : {

        },
    },
    Cast : {
        "Laucian Caerwyn": {
            type:"entry",
            relations:["Samira Suleiman","Kazmir Naivros"],
            text:`# Laucian Caerwyn [Sy]\n-# *mag  ‧  3      str  ‧  3      def  ‧  2      int  ‧  2      hp  ‧  64*\n-# half-elf\n-# unk. class, lv.?\n-# Chaotic good\n\n## Physique\ndark colors, ashy grey, muddled brown. pops of red, and deep sapphire blue. rusted metal, shiny gemstones. a freshly sharpened sword. an assortment of animal skins: leather, fur, snakeskin boots. smells of oak, cedar, musk, & lavender.\n\n## Backstory\nborn in the woods to his mother odille, laucian grew up far removed from his royal heritage. nineteen years later, the king caught wind of the existence of his bastard son, though by then lauc’s mother had already passed. with nothing left to tether himself to the traveller clan of elves he was raised by, lauc accepted the king’s offer to return to court. when he arrived at the palace in valcrest, it was decided lauc would be placed under the care of his uncle, head commander of the knights of valmora. they travelled together for the remainder of his youth. when he grew of age, he was given his own troupe of knights, a small group that oversees “special operatives”, often stationed at remote edges of the kingdom.`
        },
        "Samira Suleiman": {
            type:"entry",
            relations:["Laucian Caerwyn","Kazmir Naivros"],
            text:`# Samira "Mira" Suleiman [Sy]\n-# *mag  ‧  5      dex  ‧  1      cha  ‧  2      int  ‧  2      hp  ‧  64*\n-# siren\n-# sorceress, lv.?\n-# Chaotic neutral\n\n## Physique\ngold, silver, smoky greys, and a deep, sunset orange. rubies, sapphires, emeralds. freshly dipped incense, and rose petals.\n\n## Backstory\nsamira was born for one purpose alone: to someday advise the king as the suleiman family had for several suns. she was trained for this role in the ancient city of zahira, deep in the dunes of the outer reaches of the high desert. raised in solitude aside from her sisters, under sloped sandstone walls, samira’s divination of sun magic culminated at a young age. she was revered, and worshipped: a prodigy. what her family didn’t account for, was the sliver of snake blood leftover in her mother’s lineage passing on to samira. “the palace has no place for a serpent.”\n\nthe role she had been coveting was transitioned over to her younger sister, sumaiya. determined to leave valmora for good, samira’s plans were interrupted by prince lauc, who offered her a position as his counsel. he remarked how she blended into the night, the shine of her scales revealing her in the moonlight.`
        },
        "Kazmir Naivros" : {
            type:"entry",
            relations:["Laucian Caerwyn","Samira Suleiman"],
            text:`# Kazmir “Kaz” Naivros [Sy]\n-# *int  ‧  1      str  ‧  4      def  ‧  2      cha  ‧  1      hp  ‧  70*\n-# half-elf, fae-touched\n-# unk. class, lv.?\n-# Neutral Good\n\n## Physique\nlush greens, light and dark, and all shades in between. rich browns, reds, yellow. cinnamon, cardamon, evergreen, & honey.\n\n## Backstory\nwhether the stranger from his childhood was a dream, or a mirage, kaz is uncertain, but one fact remains certain: the powers he was gifted are a curse. at any moment, against his will, a wild magic appears at his fingertips, threatening everything around him. after an accident in his youth, kaz fled to the ancient parts of the woodlands, isolated from civilization and his hometown in the river valley.\n\nkaz encountered the prince spontaneously, offering assistance as a guide through the outer edges of the forest. upon witnessing kaz’s fortitude, lauc extended an offer: serve as his guard on his journeys across the far reaches of the kingdom. the two quickly formed an unexpected and cherished companionship. together, they formed the start of the seventeenth oath, an offshoot of valmora’s royal knights.`
        },
        "Arya Eunari" : {
            type:"entry",
            relations:[],
            text:`# Arya Eunari [Sy]\n-# *int  ‧  2      str  ‧  1      dex  ‧  2      mag  ‧  3      hp  ‧  33*\n-# human\n-# cleric(?), lv.?\n-# Chaotic neutral\n\n## Physique\nblack, & navy blue, crimson red, & oranges. velvet, and satin. silver, stone, & carnelian.\n\n## Backstory\nit seemed arya’s fate was written in the stars, ordained at birth by the high priestess to become her successor. like many women that belonged to her order, arya has retained zero contact with her birth parents, raised entirely by “the sisters of ilyune”. the only surviving symbol of her identity before induction are a set of daggers, twin dragonflies, strapped to her thighs for protection.\n\nafter years of dedication, and faith without question, arya failed the final ritual necessary to become a servant of ilyune. without hesitation, she was shunned by the temple and cast out. before arya left, she caught wind of some news: ilyune’s high priestess was under investigation for murder charges. desperate to regain favor, arya took the fall for her crimes, though there has been little word from her sisters, or the moon goddess, since.`
        },
        "Eponine Snjordottir" : {
            type:"entry",
            relations:["The Demon"],
            text:`# Éponine Snjórdóttir [Cam]\n-# *int  ‧  2      str  ‧  1      def  ‧  1      mag  ‧  3      hp  ‧  49*\n-# half-elf\n-# warlock, lv.3\n-# Chaotic good\n\n## Physique\nNo information.\n\n## Backstory\nÉponine has always heard these voices, quite like a siren's song. She chased them for as long as she could remember, sang back even. She never knew their origin and thought maybe if she did, they would leave her alone. But she became quite used to them.\n\nEirdis,her sister  has been missing for two years now. By elvish standards, two years isn't that long but to Éponine it is far too long. The journey to Valcrest is long and the voices are getting stronger, she gives in to them. She makes a deal, an exchange for power. Little did she know that she wasn't making a deal with a friendly angel but rather a demon. Perhaps it was fitting it was a demon, only a demon would understand just how far she would go to see her sister safe again.\n\n## Personality\nGrowing up in the frost mountains meant that from a young age you had to be quick skinned and quick witted, yet somehow young Eponine retained much of her softness.\n\n-# "Snjórdóttir" - Daughter of Snow? / Snjór. Just a thought.`
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

export function queryEntries(query) {
    let queue = [entries];

    while (queue.length > 0) {
        let current = queue.shift();

        if (current === null || typeof current !== 'object') {
            console.log("current is of invalid type: "+ typeof current +" continuing...")
            continue;
        }

        if (Object.prototype.hasOwnProperty.call(current, query)) {
            console.log("found object.")
            return current[query];
        }


        
        if (current.type !== "entry" && !Array.isArray(current)) {
            for (let key in current) {
                let value = current[key];

                if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
                    queue.push(value);
                }
            }
        }
    }

    return {
        type: "error",
        text: `Could not find key '${query}'.`
    };
}