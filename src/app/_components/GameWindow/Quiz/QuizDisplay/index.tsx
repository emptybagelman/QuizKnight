"use client"

import styles from "./styles.module.scss"
import { useGame } from "../../../GameContext"
import { useState } from "react"
import { type GameStateProps } from "@/app/_types/types"
import { useLoop } from "../QuizLoopContext"
import useAudio from "@/app/_hooks/useVolume"
import usePlayer from "@/app/_hooks/usePlayer"

export default function QuizDisplay(){

    const {
        player,
        gameState,
        setGameState,
        } = useGame()

    // const { updatePlayerStat } = usePlayer()

    const { setQuestionsAnswered } = useLoop()

    const [ corrState, setCorrState ] = useState<boolean | null>(null)

    const { playCorrectSound, playHoverSound, playWrongSound } = useAudio()


    function handleAnswer(ans: string){
        if(!gameState.currentCard || !gameState.currentUpgrade) return new Error ("No card or upgrade provided.")

        const question = gameState.currentCard.question
        const ansIndex = question.answers.findIndex(x => x === ans)

        if(ansIndex === question.correct_index){

            setGameState((prev: GameStateProps) => ({
                ...prev,
                score: prev.score + 50
            }))
            playCorrectSound()

            // const stat = gameState.currentUpgrade.affected_stat

            // if(!(stat in player)) return new Error(`Stat ${stat} doesn't exist! (yet)`)

            // let bonus: number = gameState.currentUpgrade.default_value;
            // if(question.difficulty === "easy") bonus = 5
            // else if(question.difficulty === "medium") bonus = 10;
            // else if(question.difficulty === "hard") bonus = 25;
            
            setCorrState(true)
            setGameState((prev: GameStateProps) => ({
                ...prev,
                statToken: prev.statToken + 1
            }))
            // updatePlayerStat(stat,1,bonus)
        }
        else{
            playWrongSound()
            setCorrState(false)
        }

        setTimeout(() => {
            setCorrState(null)
            setQuestionsAnswered((prev: number) => prev + 1)
            setGameState((prev: GameStateProps) => ({
                ...prev,
                questionState: false,
            }))
            
        }, 1000);
    }

    if(gameState.questionState)
    return (
        <div className={styles.quiz_display_wrapper}>
            <h2>{gameState.currentCard?.category?.category}</h2>
            <h3>{gameState.currentCard?.question.question}</h3>

            <div className={styles.answers}>
                {
                    gameState.currentCard &&
                    gameState.currentCard.question.answers.map((ans, idx) => (
                        <button
                        onClick={() => handleAnswer(ans)}
                        onMouseEnter={() => playHoverSound()}
                        key={idx}
                        className={
                            corrState != null
                            ? corrState
                                ? styles.correct
                                : styles.incorrect
                            : ""
                        }
                        style={{pointerEvents: corrState == true || corrState == false ? "none" : "auto"}}
                        >
                            {ans}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}