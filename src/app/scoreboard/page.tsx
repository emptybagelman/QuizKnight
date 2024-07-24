import { getScoreboard } from "@/server/actions/categoryActions"
import styles from "@/styles/root/scoreboard/styles.module.scss"
import { type Score } from "../_types/types"

export default async function ScoreBoardPage(){

    const scoreboardData = await getScoreboard()

    return (
        <>
            <h1>scoreboard</h1>
            {
                scoreboardData &&
                <div className={styles.table_wrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr id={styles.table_header_group}>
                                <th>Name</th>
                                <th>Score</th>
                                <th>Highest Loop</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                scoreboardData.map((score: Score, index: number) => (
                                    <tr key={index}>
                                        <td>{score.name}</td>
                                        <td>{score.score}</td>
                                        <td>{score.highest_loop}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            }
        </>
    )
}