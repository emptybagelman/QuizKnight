"use client"

import { useGame } from "../GameContext";
import StartScreen from "../StartScreen";
import Combat from "./Combat";
import Quiz from "./Quiz";

export default function GameWindow(){

    const {quizState} = useGame()

    return (
        <div>
            {!quizState 
                ? <Combat />
                : <Quiz />  
            }
        </div>
    )
}