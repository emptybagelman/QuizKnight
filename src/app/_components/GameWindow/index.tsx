"use client"

import { useGame } from "../GameContext";
import Combat from "./CombatContainer/Combat";
import Quiz from "./Quiz";
import CombatStateProvider from "../CombatContext";
import styles from "./styles.module.scss"
import SettingsWidget from "../Settings/GameSettings";

export default function GameWindow(){

    const {gameState} = useGame()

    return (
        <div className={styles.game_window}>
            <SettingsWidget />
            {gameState.quizState 
                ? <Quiz />
                : <CombatStateProvider>
                    <Combat /> 
                </CombatStateProvider>
            }
        </div>
    )
}