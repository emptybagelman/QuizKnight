"use client"

import { useCombat } from "../../../CombatContext"
import { useGame } from "../../../GameContext"
import { playerAnims } from "../../CombatContainer/Combat/sprites"
import { CONSTANTS } from "@/app/_functions/CONSTANTS"

export default function Player({children}:{children : React.ReactNode}){

    const { player, gameState } = useGame()
    const { enemyAttack, playerAttack } = useCombat()

    return (
        <div 
            className={
                `${player && playerAnims(player, enemyAttack, playerAttack)}
                ${gameState.loop > CONSTANTS.BOSS_ROUND ? "darken" : ""}`
            }
        >
            {children}
        </div>
    )
}