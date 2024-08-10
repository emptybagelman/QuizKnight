import { useGame } from "../../GameContext";
import styles from "@/styles/components/GameWindow/ScoreCounter/styles.module.scss"

export default function ScoreCounter(){

    const {score} = useGame()

    return (
        <div className={styles.score_counter}>
            {score}
        </div>
    )
}