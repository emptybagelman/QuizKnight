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
- [] better combat anims
- [] more enemy types
- [] adjust scaling
- [] sound effects
    - [x] hit
    - [] die
    - [x] button hover
    - [] music
        - [] combat
        - [] quiz
- [] visual effects
    - [] screen shake
    - [1/2] sprite damage
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