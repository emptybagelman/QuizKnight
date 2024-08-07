"use client"

import { useGame } from "../GameContext";
import Combat from "./Combat";
import Quiz from "./Quiz";
import useSound from "use-sound";
import into_the_wastes from "@/public/sounds/into_the_wastes.mp3"

export default function GameWindow(){

    const {quizState} = useGame()
    const [playMusic, { stop }] = useSound(into_the_wastes,{
        volume: 0.1,
        interrupt: true
    })

    return (
        <div
        onMouseEnter={() => playMusic()}
        onMouseLeave={() => stop()}
        >
            {!quizState 
                ? <Combat />
                : <Quiz />  
            }
        </div>
    )
}