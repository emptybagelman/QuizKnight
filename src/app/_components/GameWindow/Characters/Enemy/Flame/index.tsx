"use client"

import { useGame } from "@/app/_components/GameContext"
import styles from "./styles.module.scss"
import { type Consumable } from "@/app/_types/types"
import { useMemo } from "react"

export default function Flame(){

    const { player } = useGame()
    const firebombCharge = useMemo(() => getFirebombCharge() ,[player.consumables])

    function getFirebombCharge(){
        const firebomb = player.consumables.filter((item) => item.name === "Firebomb")[0]
        return firebomb?.charge
    }

    return (
        <div className={`${firebombCharge && firebombCharge > 0 ? styles.flame : ""}`}>
        </div>
    )
}