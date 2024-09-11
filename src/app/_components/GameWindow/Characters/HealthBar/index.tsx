"use client"

import { type Enemy, type PlayerType } from "@/app/_types/types"
import styles from "./styles.module.scss"
import { useSettings } from "@/app/_components/SettingsContext"
import { handleHpBar } from "@/app/_functions/game_functions"

export default function HealthBar({character}: {character: PlayerType | Enemy}){

    const { damageNumbers } = useSettings()

    return (
        <div className={styles.healthbar_wrapper} content={character.name}>
            <div id={styles.hp} style={handleHpBar(character)}></div>
            <div id={styles.maxhp}></div>
            {
                character.armour > 0 &&
                <div id={styles.armour}>{damageNumbers ? Math.floor(character.armour) : character.armour}</div>
            }
        </div>
    )
}
