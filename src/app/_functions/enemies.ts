import { randomInt } from "./game_functions";

export function enemyStats(name: string, loop:number) {
    let hp: number;
    let dmg: number;
    let armour: number;

    switch (name){
        case "Goblin":
            hp = randomInt((1 + Math.floor(loop * 0.6)), 1)
            dmg = randomInt((1 + Math.floor(loop * 0.4)), 1)
            armour = randomInt((1 + Math.floor(loop * 0.25)), 1)
            break;
        case "Mushroom":
            hp = randomInt((3 + Math.floor(loop * 0.5)), 2)
            dmg = randomInt((1 + Math.floor(loop * 0.2)), 1)
            armour = randomInt((2 + Math.floor(loop * 0.6)), 2)
            break;
        case "Skeleton":
            hp = randomInt((2 + Math.floor(loop * 0.3)), 1)
            dmg = randomInt((3 + Math.floor(loop * 0.8)), 1)
            armour = randomInt((1 + Math.floor(loop * 0.4)), 1)
            break;
        case "Flying Eye":
            hp = randomInt((3 + Math.floor(loop * 0.7)), 2)
            dmg = randomInt((2 + Math.floor(loop * 0.5)), 2)
            armour = 0
            break;
        default:
            hp = randomInt((2 + Math.floor(loop * 0.6)), 1)
            dmg = randomInt((2 + Math.floor(loop * 0.4)), 1)
            armour = randomInt((1 + Math.floor(loop * 0.25)), 1)
            break;
    }

    if(hp <= 0) {
        hp = 1
    }
    if(dmg <= 0) {
        dmg = 1
    }
    if(armour < 0) {
        armour = 0
    }

    return {hp: hp, dmg: dmg, armour: armour}
}