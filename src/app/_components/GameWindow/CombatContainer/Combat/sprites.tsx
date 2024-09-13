import { type Enemy, type PlayerType } from "@/app/_types/types";
import sprites from "./sprites.module.scss";

export const playerAnims = (player: PlayerType, enemyBool: boolean, playerBool: boolean) => {
    if(player.hp <= 0) return sprites.playerDeathAnim;
    if(player.agility && enemyBool) return sprites.playerEvadeAnim;
    if(enemyBool) return sprites.playerHitAnim;
    if(playerBool) return sprites.playerAttackAnim;
    return sprites.player;
}

const goblinAnims = (goblin: Enemy, arr: Enemy[], enemyBool: boolean, playerBool: boolean) => {
    const first = arr[0];

    if(!arr) return "";
    if(!first) return "";

    if(goblin.hp <= 0) return sprites.goblinDeathAnim;
    if(playerBool && goblin.id === first.id) return sprites.goblinHitAnim;
    if(enemyBool && goblin.id === first.id) return sprites.goblinAttackAnim; 
    return sprites.goblin;
}

export const mushroomAnims = (mushroom: Enemy, arr: Enemy[], enemyBool: boolean, playerBool: boolean) => {
    const first = arr[0];
    
    if(!arr) return "";
    if(!first) return "";

    if(mushroom.hp <= 0) return sprites.mushroomDeathAnim;
    if(playerBool && mushroom.id === first.id) return sprites.mushroomHitAnim;
    if(enemyBool && mushroom.id === first.id) return sprites.mushroomAttackAnim; 
    return sprites.mushroom;
}

export const skeletonAnims = (skeleton: Enemy, arr: Enemy[], enemyBool: boolean, playerBool: boolean) => {
    const first = arr[0];
    
    if(!arr) return "";
    if(!first) return "";

    if(skeleton.hp <= 0) return sprites.skeletonDeathAnim;
    if(playerBool && skeleton.id === first.id) return sprites.skeletonHitAnim;
    if(enemyBool && skeleton.id === first.id) return sprites.skeletonAttackAnim; 
    return sprites.skeleton;
}

export const eyeAnims = (eye: Enemy, arr: Enemy[], enemyBool: boolean, playerBool: boolean) => {
    const first = arr[0];
    
    if(!arr) return "";
    if(!first) return "";

    if(eye.hp <= 0) return sprites.eyeDeathAnim;
    if(playerBool && eye.id === first.id) return sprites.eyeHitAnim;
    if(enemyBool && eye.id === first.id) return sprites.eyeAttackAnim; 
    return sprites.eye;
}

export const toadAnims = (toad: Enemy, arr: Enemy[], enemyBool: boolean, playerBool: boolean) => {
    const first = arr[0];
    
    if(!arr) return "";
    if(!first) return "";

    if(toad.hp <= 0) return sprites.toadDeathAnim;
    if(playerBool && toad.id === first.id) return sprites.toadHitAnim;
    if(enemyBool && toad.id === first.id) return sprites.toadAttackAnim; 
    return sprites.toad;
}

export const firewormAnims = (fireworm: Enemy, arr: Enemy[], enemyBool: boolean, playerBool: boolean) => {
    const first = arr[0];
    
    if(!arr) return "";
    if(!first) return "";

    if(fireworm.hp <= 0) return sprites.firewormDeathAnim;
    if(playerBool && fireworm.id === first.id) return sprites.firewormHitAnim;
    if(enemyBool && fireworm.id === first.id) return sprites.firewormAttackAnim; 
    return sprites.fireworm;
}

export const resolveAnimType = (enemy: Enemy, arr: Enemy[], enemyBool: boolean, playerBool: boolean) => {
    if(enemy.name === "Goblin") return goblinAnims(enemy, arr, enemyBool, playerBool)
    if(enemy.name === "Mushroom") return mushroomAnims(enemy, arr, enemyBool, playerBool)
    if(enemy.name === "Skeleton") return skeletonAnims(enemy, arr, enemyBool, playerBool)
    if(enemy.name === "Flying Eye") return eyeAnims(enemy, arr, enemyBool, playerBool)
    if(enemy.name === "Toad") return toadAnims(enemy, arr, enemyBool, playerBool)
    if(enemy.name === "Fireworm") return firewormAnims(enemy, arr, enemyBool, playerBool)

}