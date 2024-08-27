"use client"

import { useCombat } from "../../../CombatContext"
import { useGame } from "../../../GameContext"
import { playerAnims } from "../../CombatContainer/Combat/sprites"

export default function Player({children}:{children : React.ReactNode}){

    const { player } = useGame()
    const { enemyAttack, playerAttack } = useCombat()

    return (
        <div className={player && playerAnims(player, enemyAttack, playerAttack)}>
            {children}
        </div>
    )
}