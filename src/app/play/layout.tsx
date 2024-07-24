import GameStateProvider from "../_components/GameContext";

export default function PlayLayout({children}:{children: React.ReactNode}){

    return (
        <main>
            <GameStateProvider>
                {children}
            </GameStateProvider>
        </main>
    )
}