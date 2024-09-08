"use client"

import { GameStateProps } from "@/app/_types/types";
import { useGame } from "../../GameContext";
import { PauseIcon, PlayIcon } from "../../Icons";
import styles from "./styles.module.scss";

export default function AutoPlay(){

    const { gameState, setGameState } = useGame()

    function handleClick(){
        setGameState((prev: GameStateProps) => ({
            ...prev,
            autoPlay: !prev.autoPlay
        }))
    }

    return (
        <button
            className={styles.autoplay_button}
            onClick={handleClick}
            >
            {
                gameState.autoPlay
                ? <PauseIcon />
                : <PlayIcon />
            }
        </button>
    )
}