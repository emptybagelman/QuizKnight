"use client"

import { useGame } from "../GameContext";
import Combat from "./CombatContainer/Combat";
import Quiz from "./Quiz";
import useSound from "use-sound";
import { audio } from "@/app/assets/sounds";
import CombatStateProvider from "../CombatContext";

export default function GameWindow(){

    const {gameState} = useGame()
    const [playMusic, { stop }] = useSound(audio.into_the_wastes,{
        volume: 0.1,
        interrupt: true
    })

    return (
        <div
        onMouseEnter={() => playMusic()}
        onMouseLeave={() => stop()}
        >
            {gameState.quizState 
                ? <Quiz />
                : <CombatStateProvider>
                    <Combat /> 
                </CombatStateProvider>
            }
        </div>
    )
}