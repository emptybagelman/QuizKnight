import styles from "./styles.module.scss"
import { useGame } from "../../../GameContext"

export default function StartScreen(){

    const { gameState } = useGame()

    return (
        <>
        { gameState.loop === 0 &&
            <div className={styles.start_screen_wrapper}>
                <div className={styles.screen_container}>

                    {/* <h3>Prepare</h3> */}

                    <div className={styles.h1_titlecard}>
                        <h1>QuizKnight</h1>
                        <div className={styles.bigbar} ></div>
                        <div className={styles.h1_streak} id={styles.streak_l}></div>
                        <div className={styles.h1_streak} id={styles.streak_r}></div>
                        <div className={styles.h1_dot} id={styles.dot_l}></div>
                        <div className={styles.h1_dot} id={styles.dot_r}></div>
                    </div>
                </div>
            </div>
        }
        </>
    )
}