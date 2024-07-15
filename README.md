# GeoKnight 2.0

## SQL tables
> just for my own mind

**category**
- id *primary key*
- category *string*

**question_group**
- id *primary key*
- difficulty *string*
- question *string*
- answers *array of strings*
- correct_index *integer*
- category_id *foreign key references category*

**upgrade**
- id *primary key*
- name *string*
- description *string*
- affected_stat *string*
- default_value *integer*
- consumable *boolean*

## gameplay

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