"use client"

import styles from "./styles.module.scss"
import CardContainer from "./CardContainer"
import Loading from "@/app/play/loading"
import { Suspense } from "react"
import QuizDisplay from "./QuizDisplay"
import LoopStateProvider from "./QuizLoopContext"
import { useGame } from "../../GameContext"
import Stats from "./Stats"
import PowerGift from "./PowerGift"

export default function Quiz(){

    const { gameState } = useGame()

    return (
        <div className={styles.quiz_window}>
            <LoopStateProvider>
                {/* <SettingsWidget /> */}
                {
                    gameState.statsState &&
                    <Stats />
                }
                {
                    gameState.questionState &&
                    <QuizDisplay />
                }
                {
                    (gameState.powerState && gameState.loop == 15) &&
                    <PowerGift />
                }
                {
                    (gameState.quizState && !(gameState.loop == 15))  &&
                    <Suspense fallback={ <Loading /> }>
                        <CardContainer />
                    </Suspense>
                }
                
                {/* <ScoreCounter /> */}
            </LoopStateProvider>
        </div>
    )
}