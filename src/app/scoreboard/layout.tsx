import styles from "@/styles/root/scoreboard/styles.module.scss"
import SettingsWidget from "../_components/Settings/GameSettings"
import RedirectButton from "../_components/RedirectButton"
export default function ScoreboardLayout({children}: {children: React.ReactNode}){
    return (
        <main className={styles.scoreboard_main}>
            <div className={styles.redirect_wrapper}>
                <RedirectButton route={"/"} text={"Home"} />
                <RedirectButton route={"/play"} text={"Play"} />
            </div>
            {children}
        </main>
    )
}