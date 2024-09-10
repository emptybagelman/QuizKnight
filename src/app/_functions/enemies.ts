import { randomInt } from "./game_functions";

export function enemyStats(name: string, loop:number) {
    let hp: number;
    let dmg: number;
    let armour: number;

    switch (name){
        case "Goblin":
            hp = randomInt((2 + Math.floor(loop * 0.65)), 1)
            dmg = randomInt((2 + Math.floor(loop * 0.35)), 1)
            armour = randomInt((0 + Math.floor(loop * 0.2)), 1)
            break;
        case "Mushroom":
            hp = randomInt((3 + Math.floor(loop * 0.8)), 2)
            dmg = randomInt((1 + Math.floor(loop * 0.5)), 1)
            armour = randomInt((1 + Math.floor(loop * 0.3)), 1)
            break;
        case "Skeleton":
            hp = randomInt((2 + Math.floor(loop * 0.55)), 1)
            dmg = randomInt((3 + Math.floor(loop * 0.5)), 1)
            armour = randomInt((1 + Math.floor(loop * 0.2)), 1)
            break;
        case "Flying Eye":
            hp = randomInt((3 + Math.floor(loop * 0.6)), 2)
            dmg = randomInt((2 + Math.floor(loop * 0.45)), 1)
            armour = 0
            break;
        case "Toad":
            hp = randomInt((4 + Math.floor(loop * 1.2)), 2)
            dmg = randomInt((2 + Math.floor(loop * 0.55)), 1)
            armour = 0
            break;
        case "Demon Slime":
            hp = 150
            dmg = 10
            armour = 0
            break;
        default:
            hp = randomInt((2 + Math.floor(loop * 1)), 1)
            dmg = randomInt((2 + Math.floor(loop * 1)), 1)
            armour = 0
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