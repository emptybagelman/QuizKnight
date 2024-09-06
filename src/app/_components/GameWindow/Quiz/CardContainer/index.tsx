"use client"

import styles from "./styles.module.scss"
import { getRandomThreeCards } from "@/server/actions/categoryActions"
import { useQuery } from "@tanstack/react-query"
import { LoadingSpinner } from "@/app/_components/Icons/index"
import CardComponent from "./Card"
import { type GameStateProps, type Card } from "@/app/_types/types"
import { useGame } from "@/app/_components/GameContext"
import { useEffect } from "react"
import { useLoop } from "../QuizLoopContext"
import usePlayer from "@/app/_hooks/usePlayer"

export default function CardContainer(){

    const {data, error, isLoading, refetch} = useQuery({
        queryFn: getRandomThreeCards,
        queryKey: ["categories"],
    })

    const { gameState, setGameState } = useGame()
    const { setMaxHp } = usePlayer()
    const { questionsAnswered, setQuestionsAnswered } = useLoop()

    useEffect(() => {
        if(questionsAnswered == 3){
            setMaxHp()

            setQuestionsAnswered(0)
            setGameState((prev: GameStateProps) => ({
                ...prev,
                loop: prev.loop + 1,
                quizState: false,
            }))
        }
    },[questionsAnswered])

    if(error) return <p>{error.message}</p>
    if(isLoading) return <LoadingSpinner />
    
    if(data){
        return (
            <div className={styles.card_container} style={gameState.questionState ? {display: "none"} : {}}>
                {
                    data
                    ? data.map((card: Card, idx: number) => (
                        <CardComponent key={idx} card={card} refetch={refetch}/>
                    ))
                    : ""
                }
            </div>
        )
    }
}