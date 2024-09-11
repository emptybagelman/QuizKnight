# GeoKnight 2.0

I made this as a remake to my **first** JavaScript project I co-created in 2023. Made with new technologies such as [Next.js](https://nextjs.org/), [Drizzle](https://orm.drizzle.team/), [TypeScript](https://www.typescriptlang.org/) and more.

## Checklist

### Gameplay loop
1. load game wave 1
    - [x] evaluate dmg / hp
    - [x] lose -> gameover
    - [x] win ->
2. fetch question (3 rounds)
    - [x] category -> difficulty -> questions 
3. random card picks
    - [x] generate random card array (length tbd)
    - [x] pick card
    - [x] update stats
    - [x] repeat for number of correct questions

### Todos
- [x] damage bar
- [x] new logo
- [x] make armour finite, only health can recharge per wave
- [] style up the cards
- [x] better screen sizing
- [x] new basic sprites!
- [] Hooks - to reduce state setting muddiness
    - [x] player
    - [] enemy
    - [] game

- [] settings
    - [x] volume slider
    - [x] damage number rounded toggle
    - [] animation toggle
    - [] difficulty mode
- [] gameplay!
    - [x] convert current powering system to stat point system
        - [x] quiz display overlays combat
        - [x] once completed, stat screen appears, player can allocate points to level up
    - [] mini enemy icons
        - shows how many enemies in array & hp
    - [] consumables
        - [x] convert into single icon when holding multiple items
        - [x] random chance for enemy to drop consumable
        - [x] burn over time
        - [] static
            - chance to make enemy freeze
        - [x] hp potion
        - [x] mana (power move) potion
        - [x] agility crystal - dodge next attack
        - [] single use shield ?? 
    - [x] enemy differences
        - [x] goblin
            - low hp
            - low dmg
            - low armour
        - [x] mushroom
            - good hp
            - good armour
            - low dmg
        - [x] skeleton
            - low hp
            - good dmg
            - low armour
        - [x] flying eye
            - mid hp
            - mid dmg
            - no armour
        - BOSS
            - [x] Demon Slime
                - [x] all anims
                - [x] activates ability
                - [x] special sounds
    - [x] crit chance
    - [x] block chance
    - [] upgrades
        - [x] power move
            - [x] has to recharge +10 per kill
            - [] may only hold one power move at once
        - [] two attacks in one round
        - [] passive hp regen
- [x] better combat anims
    - [x] get hit
    - [x] hit
    - [x] die
- [x] more enemy types
    - [x] flying eye
    - [x] mushroom
    - [x] skeleton
- [] adjust scaling
- [] sound effects
    - [x] hit
    - [] die
    - [x] button hover
    - [x] music
    - [x] combat
        - [x] combat
        - [x] quiz
- [] visual effects
    - [x] screen shake
    - [x] sprite damage
    - [] animate consumables
- [] better backdrop
    - maybe even play with sprite creation and custom scenes
    - could even turn into a rougelike dungeon crawler (pipedream)
- [] make scoreboard work
    - [] best category
    - [] worst category
    - [] most questions answered
    - [] longest streak
    - [x] levels reached (loop number)
    - [] username (if not guest)
    - [x] total score
    - [] enemies defeated