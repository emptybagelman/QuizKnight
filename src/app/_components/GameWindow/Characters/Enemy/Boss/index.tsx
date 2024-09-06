"use client"

import { Enemy } from "@/app/_types/types";
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
        className={styles.slimeBoss}>
            {
                playerAttack && enemyData[0]?.id === enemy.id
                ? <Hit dmg={player.dmg} />
                : ""
            }
            <BossHealthbar />
        </div>
    )
}

function BossHealthbar(){

    return (
        <div className={styles.bossbar}>

        </div>
    )
}