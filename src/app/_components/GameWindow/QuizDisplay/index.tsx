"use client"

import styles from "@/styles/components/GameWindow/QuizDisplay/styles.module.scss"
import { useGame } from "../../GameContext"
import { useState } from "react"
import { type Player } from "@/app/_types/types"
import { useLoop } from "../QuizLoopContext"
import correct from "@/sounds/correct.mp3"
import wrong from "@/sounds/wrong.mp3"
import hover from "@/sounds/hover.mp3"
import useSound from "use-sound"

export default function QuizDisplay(){

    const {
        player,
        setPlayer,
        currentCard,
        currentUpgrade,
        displayQuestionState,
        setDisplayQuestionState,
        loop,
        setLoop,
        setQuizState} = useGame()

    const { questionsAnswered, setQuestionsAnswered } = useLoop()

    const [ corrState, setCorrState ] = useState<boolean | null>(null)

    const [playCorrectSound] = useSound(correct)
    const [playWrongSound] = useSound(wrong)
    const [playHoverSound] = useSound(hover)


    function handleAnswer(ans: string){
        if(!currentCard || !currentUpgrade) return new Error ("No card or upgrade provided.")

        const question = currentCard.question
        const ansIndex = question.answers.findIndex(x => x === ans)

        if(ansIndex === question.correct_index){

            playCorrectSound()

            const stat = currentUpgrade.affected_stat

            if(!(stat in player)) return new Error(`Stat ${stat} doesn't exist! (yet)`)

            let bonus: number = currentUpgrade.default_value;
            if(question.difficulty === "medium") bonus += 1;
            else if(question.difficulty === "hard") bonus += 2;
            
            setCorrState(true)
            if(stat === "hp"){
                setPlayer((prev: Player) => ({
                    ...prev,
                    hp: prev.maxhp + bonus,
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
            
            setDisplayQuestionState(false)
            setCorrState(null)
            setQuestionsAnswered((prev: number) => prev + 1)

        }, 1000);
    }

    if(questionsAnswered == 3){
        setQuestionsAnswered(0)
        setLoop(loop + 1)
        setQuizState(false)
    }

    return (
        <>
            {
                displayQuestionState &&
                <div className={styles.quiz_display_wrapper}>
                    <h2>{currentCard?.category?.category}</h2>
                    <h3>{currentCard?.question.question}</h3>

                    <div className={styles.answers}>
                        {
                            currentCard &&
                            currentCard.question.answers.map((ans, idx) => (
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