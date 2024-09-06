"use client"

import Combat from "./CombatContainer/Combat";
import CombatStateProvider from "../CombatContext";
import styles from "./styles.module.scss"

export default function GameWindow(){

    return (
        <div className={styles.game_window}>
            <CombatStateProvider>
                <Combat /> 
            </CombatStateProvider>
        </div>
    )
}