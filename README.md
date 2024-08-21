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
- [] new logo
- [x] make armour finite, only health can recharge per wave
- [] style up the cards
- [x] better screen sizing
- [x] new basic sprites!
- [] settings
    - [x] volume slider
    - [] animation toggle
    - [] difficulty mode
- [] gameplay!
    - [] consumables
        - random chance for enemy to drop consumable
        - [] burn over time
        - [] static
            - chance to make enemy freeze
        - [x] hp potion
        - [] mana (power move) potion
        - [] temporary agility
        - [] single use shield
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
    - [x] crit chance
    - [x] block chance
    - [] upgrades
        - [] power move
            - has to recharge over time
            - out of play for two moves after
            - may only hold one power move at once
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
        - [] quiz
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