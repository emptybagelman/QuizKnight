import { useGame } from "../../../GameContext";
import styles from "./styles.module.scss"

export default function ScoreCounter(){

    const {gameState} = useGame()

    return (
        <div className={styles.score_counter}>
            {gameState.score}
        </div>
    )
}