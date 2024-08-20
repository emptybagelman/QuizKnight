"use client"

import { type Enemy } from "@/app/_types/types"
import { resolveAnimType } from "../../CombatContainer/Combat/sprites"
import HealthBar from "../HealthBar"
import Hit from "../Hit"
import { useCombat } from "@/app/_components/CombatContext"

export default function EnemySprite(
    {
        id,
        enemy,
        damage,

    }:{
        id: number,
        enemy: Enemy,
        damage: number,
    }) {

        const { enemyData, playerAttack, enemyAttack } = useCombat()

    return (
        <div
            key={id}
            className={enemyData[0] && resolveAnimType(enemy, enemyData, enemyAttack, playerAttack)}>
            {
                playerAttack && enemyData[0]?.id === enemy.id
                ? <Hit dmg_value={damage}/>
                : ""
            }
            <HealthBar character={enemy} />
        </div>
    )
}