import styles from "@/styles/root/scoreboard/scoreboard.module.scss"

export default function ScoreboardLayout({children}: {children: React.ReactNode}){
    return (
        <main>
            {children}
        </main>
    )
}