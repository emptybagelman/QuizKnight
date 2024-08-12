import styles from "./styles.module.scss"
import CardContainer from "./CardContainer"
import Loading from "@/app/play/loading"
import { Suspense } from "react"
import QuizDisplay from "./QuizDisplay"
import LoopStateProvider from "./QuizLoopContext"
import ScoreCounter from "../CombatContainer/ScoreCounter"

export default function Quiz(){

    return (
        <div className={styles.quiz_window}>
            <LoopStateProvider>
                <Suspense fallback={ <Loading /> }>
                    <CardContainer />
                </Suspense>
                <QuizDisplay />
                <ScoreCounter />
            </LoopStateProvider>
        </div>
    )
}