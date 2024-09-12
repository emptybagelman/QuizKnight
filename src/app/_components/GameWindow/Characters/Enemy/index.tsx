"use client"

import { type Enemy } from "@/app/_types/types"
import { resolveAnimType } from "../../CombatContainer/Combat/sprites"
import HealthBar from "../HealthBar"
import Hit from "../Hit"
import { useCombat } from "@/app/_components/CombatContext"
import { useGame } from "@/app/_components/GameContext"
import Flame from "./Flame"

export default function EnemySprite(
    {
        id,
        enemy,
    }:{
        id: number,
        enemy: Enemy,
    }) {

        const { player, gameState } = useGame()
        const { enemyData, playerAttack, enemyAttack } = useCombat()

    return (
        <div
            key={id}
            className={`${resolveAnimType(enemy, enemyData, enemyAttack, playerAttack)} ${gameState.loop > 15 ? "darken" : ""}`}
            >
            {
                playerAttack && enemyData[0]?.id === enemy.id
                ? <Hit dmg={player.dmg} />
                : ""
            }
            <HealthBar character={enemy} />
            {
                enemyData[0]?.id === enemy.id
                ? <Flame />
                : ""
            }
        </div>
    )
}