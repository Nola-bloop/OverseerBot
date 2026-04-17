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
            relations:["Samira Suleiman","Kazmir Naivros","Valcrest"],
            title:`# Laucian Caerwyn [Sy]`,
            text:`# Laucian Caerwyn [Sy]\n-# *mag  ‧  3      str  ‧  3      def  ‧  2      int  ‧  2      hp  ‧  64*\n-# half-elf\n-# unk. class, lv.?\n-# Chaotic good\n-# Veteran\n\nBoon : A minor healing spell, which bestows the ability to cure minor cuts, bruises, wounds, and ailments. He can use this spell without limits, though repeated use might provoke side-effects.\n\n## Physique\ndark colors, ashy grey, muddled brown. pops of red, and deep sapphire blue. rusted metal, shiny gemstones. a freshly sharpened sword. an assortment of animal skins: leather, fur, snakeskin boots. smells of oak, cedar, musk, & lavender.\n\n## Backstory\nborn in the woods to his mother odille, laucian grew up far removed from his royal heritage. nineteen years later, the king caught wind of the existence of his bastard son, though by then lauc’s mother had already passed. with nothing left to tether himself to the traveller clan of elves he was raised by, lauc accepted the king’s offer to return to court. when he arrived at the palace in valcrest, it was decided lauc would be placed under the care of his uncle, head commander of the knights of valmora. they travelled together for the remainder of his youth. when he grew of age, he was given his own troupe of knights, a small group that oversees “special operatives”, often stationed at remote edges of the kingdom.`
        },
        "Samira Suleiman": {
            type:"entry",
            relations:["Laucian Caerwyn","Kazmir Naivros","Valcrest","Zahira"],
            title:`# Samira "Mira" Suleiman [Sy]`,
            text:`-# *mag  ‧  5      dex  ‧  1      cha  ‧  2      int  ‧  2      hp  ‧  64*\n-# siren\n-# sorceress, lv.?\n-# Chaotic neutral\n-# Veteran\n\nBoon : An earring, permanently embedded into her ears, which allows her to appear as an > illusion, no matter the distance, so long as she has a person to tether herself to.\n\n## Physique\ngold, silver, smoky greys, and a deep, sunset orange. rubies, sapphires, emeralds. freshly dipped incense, and rose petals.\n\n## Backstory\nsamira was born for one purpose alone: to someday advise the king as the suleiman family had for several suns. she was trained for this role in the ancient city of zahira, deep in the dunes of the outer reaches of the high desert. raised in solitude aside from her sisters, under sloped sandstone walls, samira’s divination of sun magic culminated at a young age. she was revered, and worshipped: a prodigy. what her family didn’t account for, was the sliver of snake blood leftover in her mother’s lineage passing on to samira. “the palace has no place for a serpent.”\n\nthe role she had been coveting was transitioned over to her younger sister, sumaiya. determined to leave valmora for good, samira’s plans were interrupted by prince lauc, who offered her a position as his counsel. he remarked how she blended into the night, the shine of her scales revealing her in the moonlight.`
        },
        "Kazmir Naivros" : {
            type:"entry",
            relations:["Laucian Caerwyn","Samira Suleiman","Valcrest"],
            title:"# Kazmir “Kaz” Naivros [Sy]",
            text:`-# *int  ‧  1      str  ‧  4      def  ‧  2      cha  ‧  1      hp  ‧  70*\n-# half-elf, fae-touched\n-# unk. class, lv.?\n-# Neutral Good\n-# Veteran\n\nBoon : When blocking a strike bare-handed, Kaz can either absorb or deflect 8 pts of damage.\n\n## Physique\nlush greens, light and dark, and all shades in between. rich browns, reds, yellow. cinnamon, cardamon, evergreen, & honey.\n\n## Backstory\nwhether the stranger from his childhood was a dream, or a mirage, kaz is uncertain, but one fact remains certain: the powers he was gifted are a curse. at any moment, against his will, a wild magic appears at his fingertips, threatening everything around him. after an accident in his youth, kaz fled to the ancient parts of the woodlands, isolated from civilization and his hometown in the river valley.\n\nkaz encountered the prince spontaneously, offering assistance as a guide through the outer edges of the forest. upon witnessing kaz’s fortitude, lauc extended an offer: serve as his guard on his journeys across the far reaches of the kingdom. the two quickly formed an unexpected and cherished companionship. together, they formed the start of the seventeenth oath, an offshoot of valmora’s royal knights.`
        },
        "Arya Eunari" : {
            type:"entry",
            relations:["Valcrest"],
            title:"# Arya Eunari [Sy]",
            text:`-# *int  ‧  2      str  ‧  1      dex  ‧  2      mag  ‧  3      hp  ‧  33*\n-# human\n-# cleric(?), lv.?\n-# Chaotic neutral\n-# Novice\n\n## Physique\nblack, & navy blue, crimson red, & oranges. velvet, and satin. silver, stone, & carnelian.\n\n## Backstory\nit seemed arya’s fate was written in the stars, ordained at birth by the high priestess to become her successor. like many women that belonged to her order, arya has retained zero contact with her birth parents, raised entirely by “the sisters of ilyune”. the only surviving symbol of her identity before induction are a set of daggers, twin dragonflies, strapped to her thighs for protection.\n\nafter years of dedication, and faith without question, arya failed the final ritual necessary to become a servant of ilyune. without hesitation, she was shunned by the temple and cast out. before arya left, she caught wind of some news: ilyune’s high priestess was under investigation for murder charges. desperate to regain favor, arya took the fall for her crimes, though there has been little word from her sisters, or the moon goddess, since.`
        },
        "Eponine Snjordottir" : {
            type:"entry",
            relations:["The Demon","Valcrest"],
            title:"# Éponine Snjórdóttir [Cam]",
            text:`-# *int  ‧  2      str  ‧  1      def  ‧  1      mag  ‧  3      hp  ‧  49*\n-# half-elf\n-# warlock, lv.3\n-# Chaotic good\n-# Novice\n\n## Physique\nNo information.\n\n## Backstory\nÉponine has always heard these voices, quite like a siren's song. She chased them for as long as she could remember, sang back even. She never knew their origin and thought maybe if she did, they would leave her alone. But she became quite used to them.\n\nEirdis,her sister  has been missing for two years now. By elvish standards, two years isn't that long but to Éponine it is far too long. The journey to Valcrest is long and the voices are getting stronger, she gives in to them. She makes a deal, an exchange for power. Little did she know that she wasn't making a deal with a friendly angel but rather a demon. Perhaps it was fitting it was a demon, only a demon would understand just how far she would go to see her sister safe again.\n\n## Personality\nGrowing up in the frost mountains meant that from a young age you had to be quick skinned and quick witted, yet somehow young Eponine retained much of her softness.\n\n-# "Snjórdóttir" - Daughter of Snow? / Snjór. Just a thought.`
        },
        "Guinevere Hallow" : {
            type:"entry",
            relations:["Pragma Hallow","House Hallow"],
            title:"# Guinevere Hallow [Jill]",
            text:`-# *mag  ‧  1      def  ‧  1      dex  ‧  5      hp  ‧  51*\n-# half-elf\n-# Shadow monk, lv.?\n-# unknown alignment\n-# Novice\n-# 50 years old\n\nA striking young woman dressed in monastic robes, Guinevere Hallow is modest in all but personality. Her hair is dark, thick, and wavy, typically worn loose. Her nose is crooked at the base from an injury she suffered from a once-friend. There is a white dagger tattooed on her throat, and her left eye has a mote of purple in the iris. Her forty years as a glorified nun did nothing to tame her tongue - but it did wonders for her punch.\n\nthe Gods and prayed for a solution to her madness - a prayer that remains unanswered.`
        },
        "Pragma Hallow" : {
            type:"entry",
            relations:["Guinevere Hallow","House Hallow"],
            title:"# Pragma Hallow [Jill]",
            text:`-# *mag  ‧  3      cha  ‧  2      hp  ‧  25*\n-# high-elf\n-# Shadow monk, lv.1\n-# unknown alignment\n-# Beginner\n-# 141 years old\n\nPragma is a man being torn in half. Born to two successful sires whose empires he might inherit, he had the pick of his choice - yet chose neither. For years, he thrived under the care of his mother, Antares, who saw the writing on the wall and predicted the fall of House Hallow. They raised their son as a single parent, and taught him the way of the diplomat, with silver tongues and whispered secrets as weapons.\n\nperceivably destroyed overnight.`
        },
        "Atrel Jahvenros" : {
            type:"entry",
            relations:["Underground"],
            title:"# Doctor A. Jahvenros [Jaz]",
            text:[`-# *int  ‧  5      dex  ‧  1      def  ‧  2      cha  ‧  2      hp  ‧  66*\n-# Human\n-# Rogue, lv.1\n-# Neutral Good\n-# Veteran\n-# in the early 30s\n\nBoon : A necklace of a cadaceus staff, wound around his neck. It grants him  5 pts of resistance to magic damage, as well as spells that influence one's mental state.\n\n## Physical\nwell-dressed, most often with any combination of a dress shirt, vest, tie, and suit jacket. glasses. neat swooped brown hair, mustache most of the time. carries a soft brown leather briefcase. often with books or journals, anatomical sketchbooks. has a silver chain around his neck with a solid silver caduceus dangling from it.\n\n## Personality\nlevelheaded. astute. trustworthy. though to himself, a first impression reveals his cutting intellect. well-educated, in the way he speaks and carries himself. a relentless kindness, beneath the calculation of self-preservation.\n\n## Strengths\nnimble, accurate handwork. slight of hand. well-versed in disguise, including changing his own voice. surgery of any level. expert medic skills. versed in high society. smuggling. anatomical drawing. preservation (herbs, fresh ingredients.. organs).`,
            `## Backstory\ndr. jahvenros was a well-regarded medical doctor in the upper society of valcrest, with patients as high profile as the royal family. anyone who concerns themselves with his personal life finds he has no close family in valcrest and has never married.\n\nhis fondness for the people of the underground led to many assignments moonlighting as a medic, adorned in the disguise of a plague doctor. no one knows his identity. until one mission goes wrong, and he ends up in prison.\n\natrel grew up in the streets of the underground as an orphan, the only tie to his birth parents being a necklace gifted to him by a medicinal shopkeeper who claimed to know his mother. his wit kept him alive, made him agile and well-spoken. even to the other streetfolk of the underground, it was clear that atrel’s potential outshone his circumstance. his early promise as a street and combat medic led him to an upperclass medical and surgical education and soon into his career garnered the title of ‘the miracle doctor’. he keeps his past quiet, many believing the rumor that he was the lone\n\nsurvivor of the young nobleman jahvenros, a victim of a double homicide that killed the nobleman and his wife.`]
        },
        "Ranona Whistreet" : {
            type:"entry",
            relations:[],
            title:"# Ranona Maude Whistreet [Jaz]",
            text:`-# *dex  ‧  2      str  ‧  3      def  ‧  1      cha  ‧  1      hp  ‧  43*\n-# half-elf\n-# Rogue, lv.?\n-# Chaotic Neutral\n-# Novice\n-# late 20s, early 30s\n\n## Physical\ndark brunette curly natural hair, just past her shoulders. mid to dark complexion. elfish ears, poking out of her curls. petite and muscular with pronounced collarbones and cleavage. dark eyes.\n\n## Personality\noutgoing, bubbly, charismatic, funloving. kindhearted, gentle. agile, resourceful, thoughtful.\n\n## Strengths\nhand-to-hand combat, swiftness, potionmaking, mixology,\n\n## Backstory\nborn into the belly of the underground, ranona was thrust into hardship early in life. she grew up on the streets, learning slight of hand and thievery young. most of her young life, she was known by her middle name “maude”. she became a nimble fighter, the best in her weight class. she would place anonymous bets on herself in underground fighting rings to turn a profit and took contract crime jobs. gruff and guarded, she kept the enormity of her heart tucked away.\n\nafter a bout of amnesia, she woke up from a coma after a failed contract. she remembers minimal: blood, pain, days stretching into weeks then months. she has large scars across her abdomen and back. upon recovery, she took a new lease on life. she moved far across the underground to begin again. she started to go by her first name “ranona”. she took out her braids to wear her hair curly and natural. she began working and living at a tavern as a bartender, traded leather for lace, and worked on prioritizing her joy instead of her misery.`
        },
        "Onyx" : {
            type:"entry",
            relations:["Garten", "Emeril Vernesse"],
            title:"# Onyx [Cat]",
            text:`-# *mag  ‧  1      str  ‧  5      def  ‧  3      int  ‧  1      hp  ‧  72*\n-# Half-human, half-waterfolk\n-# unk. class, lv.3\n-# Lawful neutral\n-# Veteran\n\n## Physical\nMidnight hair, often down or braided. Grey eyes that glimmer in the night and seem more blue near water. Silver armbands, dagger at her waist, knives at her boots, and a sword on her back.\n\n## Backstory\nIt was the highest form of loyalty. An oath sealed with blood, a bond that could not be broken. An honor but also a compulsion. Whether or not she was willing to die for her princess was never in question. Not when surviving for her proved a much more grueling fate.\n\n## Personality\nOnyx is a very serious person. Quiet, observant. Doesn’t waste her words. She tends to ignore sarcasm. Very mission-driven and goal-oriented. Thinks she knows everything she needs to. Doesn’t like to question her beliefs. Stubborn. Takes a lot to change her mind on something.`
        },
        "Emeril Vernesse" : {
            type:"entry",
            relations:["Garten", "Onyx"],
            title:"# Emeril Vernesse [Cat]",
            text:`-# *mag  ‧  3      str  ‧  1      def  ‧  1      cha  ‧  2      hp  ‧  49*\n-# unk. race\n-# unk. class, lv.?\n-# unk. alignment\n-# Novice\n\n## Physical\nLong curly hair that shines auburn in the sunlight. Freckled, sun-kissed skin. Golden eyes.\nMurmurs of doubt and of her immaturity followed Emeril like a shadow. Around every corner, hushed whispers voiced their support for her cousin, Leif. Frustrated and more than a little anxious, Emeril knew she needed to do something. The throne was her birthright, and she’d be damned if she let the humiliation of being passed over for queen come to fruition. She was determined to deter Leif’s movements and take the crown for herself. But the battle for the crown wasn’t the only thing of concern to her.\n\nThings have been shifting in Garten. The country’s two hundred years of prosperity and good fortune seem to have taken a turn. Suddenly, the waterfolk, with whom the Vernesse royal family has had a longstanding agreement, have not been upholding their end of the deal. Not to mention, an attack on a fleet of Valmoran ships supposedly carried out by the waterfolk has led to tension between Valmora and Garten.\n\nGuaranteeing her spot as crown princess would mean nothing if Garten no longer maintained its sovereignty, wealth, and status. And Emeril refused to be known as the first Queen in generations who let Garten’s economy crumble. War will not start under her reign. It can’t. She needed to resolve these issues quickly for the sake of her reputation, and she was willing to use whatever was at her disposal.\n\nWith hostility growing, Emeril decided to step up to the negotiation table. She offered to represent her country’s best interests by traveling to Valcrest as a show of good faith to lead the peace talks. But once in Valcrest, things did not go according to plan.`
        },
        "Winnie Amra" : {
            type:"entry",
            relations:[],
            title:"# Winnie Amra [Sam]",
            text:[`-# *mag  ‧  2      dex  ‧  1      cha  ‧  1      int  ‧  1      hp  ‧  33*\n-# Firbolg\n-# Druid, lv.3\n-# Neutral Good\n-# Novice\n\n## Physical\nAlthough shorter than the average Firbolg at around six feet, she hides the little muscle she has under loose, plain clothing and a well-loved yellow wool scarf. She has shoulder length auburn hair, darker fur covered ears with piercings and soft charcoal-lined violet eyes. Chestnut peach fur and darker freckles cover the rest of her body.\n\n## Backstory\nShe grew up in a small isolated village off the outskirts of the Woodlands and running an apothecary shop has always provided for her family. The ancient woods were her backyard and she wouldoften explore and learn the way of the plants from her grandmother. At night, her grandmother spoke of the old magic and stories held in the stars and constellations above them. Winnie was always fascinated. As the oldest, she was expected to be at the forefront of the family business while her sister was awarded more freedom. She was not one to argue with that destiny, but something else calls out to Winnie, something deeper and unknown. She left a note one moonless night. Only her grandmother witnessed her go, pointing up to the stars as she began a new journey alone.\n\nThe past couple of years have not been as kind to Winnie’s once upbeat and optimistic attitude. She sold what she could make on the road, tinctures and potions, her strength for hard or laborious tasks. A merchant named Vinric the Trademaster approached with a fine offer of gold for the price of delivering packages, mostly expensive or hefty merchandise, to his most personal clientele. It seemed easy enough. The last package she delivered contained jewelry and a wardrobe of arsenic filled clothing not even she could detect. Vinric fled, taking his fortunes with him as Winnie was left to fall for his crimes. Now she awaits her trial, without her family’s knowledge and with little hope.`,
            `## Personality\nWinnie puts up a tough exterior that hides her softer heart. She is a sucker to do what’s right and to help those in need to the best of her ability. She reserves her feelings to herself, to not be overly trusting and eventually betrayed. She can become lost in the moment, often daydreaming of a life she is not currently living.\n\n## Proficiencies\nnature, survival, strength, arcana, star charting/reading, foraging, medicinal herbs, plant magic, mending`]
        },
        "Gabrielle" : {
            type:"entry",
            relations:["Ssyphsis"],
            title:"# Gabrielle [Nola]",
            text:`-# *dex  ‧  3      int  ‧  2      cha  ‧  2      hp  ‧  48*\n-# Aasimar\n-# Ranger, lv.3\n-# True Neutral\n-# Novice\n\nBoon : Magical bells that react to negative energy. Lies, guilt, intent to kill, they all make the bells twitch. The bells come from Gabrielle's victims. Ringing them either echoes their last words or their screams.\n*The bells give Gabrielle +3 on perception and investigation rolls.*\n\n## Physical\nAs a fallen celestial, Gabrielle has large black wings that they can conceal at will.  They wear a worn black cloak, spotted with holes.. They also wear a horned silver mask, to hide their eyes. The fit makes them look like a huge raven. At their belt dangle a large amount of tiny bells of varying shape and color. Each one of them represents a victim executed by Gabrielle. Ringing them can make the sound of their screams or even sometimes echo their last words.\n\n## Personality\nThey have trouble showing kindness to others, which makes it hard for them to get close to anyone. They know how to fake empathy, although sometimes it can be obvious, but they don't usually do it since they see no value in it. They are also extremely cautious, after being cast off from their native land. Despite the lack of empathy, Gabrielle is absolutely able to feel enraged and lustful. They are a monster on all fronts. It is required to tread carefully when dealing with them because of their indifference to killing. They can be talked down with a show of overwhelming force. Gabrielle generally does not talk. They don't do small talk. Although they do have a chilling stare, as if you can see their past struggles buried deep under there.\n\n## Backstory\nGabrielle grew up as an outcast of an aasimar village in the North-East dunes of the High Desert. They found an easy way to make money: kill people. When they reached Valcrest, they quickly became a sought-after mercenary.`
        },
    },
    Map : {
        "  Valmora" : {
            type:"entry",
            relations: ["Valcrest", "High Desert", "Frost Peaks", "River Valley", "Woodlands", "Underground"],
            title:"# Valmora",
            text: `Vast lands, composed of its capital, Valmora, the High Desert, the Frost Peaks, the River Valley, the Woodlands and the Underground.`
        },
        " Valcrest" : {
            type:"entry",
            relations: ["Valmora"],
            title:"# Valcrest",
            text: `The capital of Valmora, located at the center of the land.`
        },
        " High Desert" : {
            type:"entry",
            relations: ["Valmora","Zahira","Munsburrow","Ninsth"],
            title:"# The High Desert",
            text: `# The High Desert\n__!!subject to change!!__\nThis area is, as the name entails, a vast desert. Though it isn't without its charms. The architects from this area had to adapt to the materials available and the rough conditions, so the few cities populating this land all share a distinct energy of radiance that the other regions cannot mimic.\n\nThree major cities can be found:\n- Zahira - City of commerce\n- Ninsth - Religious city\n- Munsburrow - Middle point for travellers\nThe High Desert is an especially dangerous place when venturing the wilds. It is highly recommended to be accompanied of a local who knows the intricacies to navigating the sands.`
        },
        "Zahira" : {
            type:"entry",
            relations: ["High Desert", "Samira Suleiman"],
            title:"# Zahira",
            text: `No information at the moment.`
        },
        "Munsburrow" : {
            type:"entry",
            relations: ["High Desert"],
            title:"# Munsburrow",
            text: `No information at the moment.`
        },
        "Ninsth" : {
            type:"entry",
            relations: ["High Desert"],
            title:"# Ninsth",
            text: `No information at the moment.`
        },
        "Ssyphsis" : {
            ype:"entry",
            relations: ["High Desert", "Gabrielle"],
            title:"# Ssyphsis",
            text: `No information at the moment.`
        },
        " Frost Peaks" : {
            type:"entry",
            relations: ["Valmora"],
            title:"# The Frost Peaks",
            text: `No information at the moment.`
        },
        " River Valley" : {
            type:"entry",
            relations: ["Valmora"],
            title:"# The River Valley",
            text: `No information at the moment.`
        },
        " Woodlands" : {
            type:"entry",
            relations: ["Valmora"],
            title:"# The Woodlands",
            text: `No information at the moment.`
        },
        " Underground" : {
            type:"entry",
            relations: ["Valmora", "Atrel Jahvenros"],
            title:"# The Underground",
            text: `No information at the moment.`
        },
        "House Hallow" : {
            type:"entry",
            relations: ["Guinevere Hallow", "Pragma Hallow"],
            title:"# House Hallow",
            text: `*House Hallow has fallen on hard times.*\n\nWhat was once a flourishing manor in the heart of the River Valley now lies the rundown Gourd Keep, with its skeletal and dying master. Lord Hallow has given one final request to his children.\n\nI know it is not in your nature, Guinevere, Pragma, but I beg of you - Please come home. Please speak with me.\n\nSomething must be done to keep House Hallow alive.`
        },
        "Garten" : {
            type:"entry",
            relations: ["Onyx", "Emeril Vernesse"],
            text: `# Vanya, Garten\nNo other information at the moment.`
        },
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
    
    let entryText = `${entry.title}`
    if (entry.text.length > 1) entryText += ` (${page}/${entry.text.length})`
    entryText += `\n${entry.text[page-1]}`

    console.log(`type: ${typeof entry.text[page-1]}`)

    const embed = new EmbedBuilder()
        .setTitle("You are consulting the entry for "+key)
        .setDescription(`Page: ${page}/${entry.text.length}.`)
        .setFooter({ text: `See also...` });

    const components = [];

    const buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId(`info_query_${key}_${page-1}`)
            .setLabel('◀')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(page === 1),

        new ButtonBuilder()
            .setCustomId(`info_query_${key}_${page+1}`)
            .setLabel('▶')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(page === entry.text.length),
            
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
            .setCustomId('info_query_'+entry.relations[i]+'_1')
            .setLabel(""+entry.relations[i])
            .setStyle(ButtonStyle.Primary)
        )


        if (i%4 == 3 || i == entry.relations.length-1) components.push(row)
    }

    components.push(buttons);

    return {
        content: entryText,
        embeds: [embed],
        components,
        flags: [MessageFlags.Ephemeral]
    };
}

function removeLeadingSpacesFromKeys(obj) {
  const result = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = key.replace(/^\s+/, '');
      result[newKey] = obj[key];
    }
  }
  return result;
}

export function queryEntries(query) {
    let queue = [{ entry: entries, path: [] }]

    while (queue.length > 0) {
        let { entry: current, path } = queue.shift()
        current = removeLeadingSpacesFromKeys(current)

        if (current === null || typeof current !== 'object') {
            console.log("current is of invalid type: "+ typeof current +" continuing...")
            continue;
        }

        if (Object.prototype.hasOwnProperty.call(current, query)) {
            return {
                entry: current[query],
                path: [...path]
            }
        }



        if (current.type !== "entry" && !Array.isArray(current)) {
            for (let key in current) {
                let val = current[key];

                if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
                    queue.push({
                        entry: val,
                        path: [...path, key]
                    });
                }
            }
        }
    }

    return {
        type: "error",
        text: `Could not find key '${query}'.`
    };
}