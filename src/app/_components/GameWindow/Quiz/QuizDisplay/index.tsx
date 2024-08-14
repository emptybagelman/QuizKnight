"use client"

import styles from "./styles.module.scss"
import { useGame } from "../../../GameContext"
import { useState } from "react"
import { type GameStateProps, type Player } from "@/app/_types/types"
import { useLoop } from "../QuizLoopContext"
import useAudio from "@/app/_hooks/useVolume"

export default function QuizDisplay(){

    const {
        player,
        setPlayer,
        gameState,
        setGameState,
        } = useGame()

    const { questionsAnswered, setQuestionsAnswered } = useLoop()

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

            const stat = gameState.currentUpgrade.affected_stat

            if(!(stat in player)) return new Error(`Stat ${stat} doesn't exist! (yet)`)

            let bonus: number = gameState.currentUpgrade.default_value;
            if(question.difficulty === "medium") bonus += 1;
            else if(question.difficulty === "hard") bonus += 2;
            
            setCorrState(true)
            if(stat === "hp"){
                setPlayer((prev: Player) => ({
                    ...prev,
                    maxhp: prev.maxhp + bonus
                }))
            }
            else{
                setPlayer((prev: Player) => ({
                    ...prev,
                    [stat]: Number(prev[stat as keyof Player]) + bonus
                }))
            }
        }
        else{

            playWrongSound()

            setCorrState(false)
        }

        setTimeout(() => {

            setPlayer((prev: Player) => ({
                ...prev,
                hp: prev.maxhp,
            }))
            // setDisplayQuestionState(false)
            setGameState((prev: GameStateProps) => ({
                ...prev,
                questionState: false
            }))
            setCorrState(null)
            setQuestionsAnswered((prev: number) => prev + 1)

        }, 1000);
    }

    if(questionsAnswered == 3){
        setQuestionsAnswered(0)
        setGameState((prev: GameStateProps) => ({
            ...prev,
            loop: prev.loop + 1,
            quizState: false
        }))
        // setLoop(loop + 1)
        // setQuizState(false)
    }

    return (
        <>
            {
                gameState.questionState &&
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
                                >
                                    {ans}
                                </button>
                            ))
                        }
                    </div>
                </div>
            }
        </>
    )
}