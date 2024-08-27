"use client"

import { type Enemy } from "@/app/_types/types"
import { resolveAnimType } from "../../CombatContainer/Combat/sprites"
import HealthBar from "../HealthBar"
import Hit from "../Hit"
import { useCombat } from "@/app/_components/CombatContext"
import { useGame } from "@/app/_components/GameContext"

export default function EnemySprite(
    {
        id,
        enemy,
    }:{
        id: number,
        enemy: Enemy,
    }) {

        const { player } = useGame()
        const { enemyData, playerAttack, enemyAttack } = useCombat()

    return (
        <div
            key={id}
            className={enemyData[0] && resolveAnimType(enemy, enemyData, enemyAttack, playerAttack)}>
            {
                playerAttack && enemyData[0]?.id === enemy.id
                ? <Hit dmg={player.dmg} parry={false}/>
                : ""
            }
            <HealthBar character={enemy} />
        </div>
    )
}