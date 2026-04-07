export default {
    Bestiary : {
        "☆ Undeads ☆" : {
            "Zombie" : {
                type:"entry",
                relations:[]
                text:
`
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
`
            },
            "Skeleton": {
                type:"entry",
                relations:[],
                text:
`
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
            text:
`
# Laucian Caerwyn
-# *mag  ‧  3      str  ‧  3      def  ‧  2      int  ‧  2      hp  ‧  64*

## Physique
dark colors, ashy grey, muddled brown. pops of red, and deep sapphire blue. rusted metal, shiny gemstones. a freshly sharpened sword. an assortment of animal skins: leather, fur, snakeskin boots. smells of oak, cedar, musk, & lavender.

## Backstory
born in the woods to his mother odille, laucian grew up far removed from his royal heritage. nineteen years later, the king caught wind of the existence of his bastard son, though by then lauc’s mother had already passed. with nothing left to tether himself to the traveller clan of elves he was raised by, lauc accepted the king’s offer to return to court. when he arrived at the palace in valcrest, it was decided lauc would be placed under the care of his uncle, head commander of the knights of valmora. they travelled together for the remainder of his youth. when he grew of age, he was given his own troupe of knights, a small group that oversees “special operatives”, often stationed at remote edges of the kingdom.
        `,
        "Samira Suleiman": `
# Samira "Mira" Suleiman
-# *mag  ‧  5      dex  ‧  1      cha  ‧  2      int  ‧  2      hp  ‧  64*

## Physique
gold, silver, smoky greys, and a deep, sunset orange. rubies, sapphires, emeralds. freshly dipped incense, and rose petals.

## Backstory
samira was born for one purpose alone: to someday advise the king as the suleiman family had for several suns. she was trained for this role in the ancient city of zahira, deep in the dunes of the outer reaches of the high desert. raised in solitude aside from her sisters, under sloped sandstone walls, samira’s divination of sun magic culminated at a young age. she was revered, and worshipped: a prodigy. what her family didn’t account for, was the sliver of snake blood leftover in her mother’s lineage passing on to samira. “the palace has no place for a serpent.”

the role she had been coveting was transitioned over to her younger sister, sumaiya. determined to leave valmora for good, samira’s plans were interrupted by prince lauc, who offered her a position as his counsel. he remarked how she blended into the night, the shine of her scales revealing her in the moonlight.
        `,
        "Kazmir Naivros" : `
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