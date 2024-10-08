import GameAssets from "../_components/GameAssets";
import GameStateProvider from "../_components/GameContext";
import styles from "@/styles/root/play/play.module.scss"

export default function PlayLayout({children}:{children: React.ReactNode}){

    return (
        <main className={styles.game_main}>
            <GameStateProvider>
                <GameAssets />

                {children}
            </GameStateProvider>
        </main>
    )
}