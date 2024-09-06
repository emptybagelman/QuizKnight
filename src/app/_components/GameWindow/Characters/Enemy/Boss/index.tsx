"use client"

import { type Enemy } from "@/app/_types/types";
import styles from "./styles.module.scss";
import { useGame } from "@/app/_components/GameContext";
import { useCombat } from "@/app/_components/CombatContext";
import Hit from "../../Hit";

export default function Boss({
    enemy,
}:{
    enemy: Enemy,
}){

    const { player } = useGame()
    const { enemyData, playerAttack, enemyAttack } = useCombat()

    return (
        <div
            className={slimeBossAnims(enemy, enemyData, enemyAttack, playerAttack)}>
            {
                playerAttack && enemyData[0]?.id === enemy.id
                ? <Hit dmg={player.dmg} />
                : ""
            }
        </div>
    )
}

const slimeBossAnims = (slimeBoss: Enemy, arr: Enemy[], enemyBool: boolean, playerBool: boolean) => {
    const first = arr[0];
    
    if(!arr) return "";
    if(!first) return "";

    if(slimeBoss.hp <= 0) return styles.slimeBossDeath;
    if(playerBool && slimeBoss.id === first.id) return styles.slimeBossHit;
    if(enemyBool && slimeBoss.id === first.id) return styles.slimeBossAttack; 
    return styles.slimeBoss;
}