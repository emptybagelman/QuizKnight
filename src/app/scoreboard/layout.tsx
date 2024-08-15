import styles from "@/styles/root/scoreboard/styles.module.scss"
import SettingsWidget from "../_components/Settings/GameSettings"
export default function ScoreboardLayout({children}: {children: React.ReactNode}){
    return (
        <main className={styles.scoreboard_main}>
            <SettingsWidget />
            {children}
        </main>
    )
}