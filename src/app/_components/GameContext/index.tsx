"use client"

import { Card, Upgrade, type Player } from "@/app/_types/types"
import { createContext, useContext, useState } from "react"

type GameState = {
    player: Player,
    setPlayer: React.Dispatch<React.SetStateAction<Player>>,
    loop: number,
    setLoop: React.Dispatch<React.SetStateAction<number>>,
    score: number,
    setScore: React.Dispatch<React.SetStateAction<number>>,
    quizState: boolean,
    setQuizState: React.Dispatch<React.SetStateAction<boolean>>,
    displayQuestionState: boolean,
    setDisplayQuestionState: React.Dispatch<React.SetStateAction<boolean>>,
    currentUpgrade: Upgrade | undefined,
    setCurrentUpgrade: React.Dispatch<React.SetStateAction<Upgrade | undefined>>,
    currentCard: Card | undefined,
    setCurrentCard: React.Dispatch<React.SetStateAction<Card | undefined>>
}

const defaultPlayerState: Player = {
    name: "Player",
    hp: 5,
    maxhp: 5,
    dmg: 5,
    armor: 3,
    resistance: 0,
}

const GameContext = createContext<GameState>(
        {
            player: defaultPlayerState,
            setPlayer: () => {},
            loop: 0,
            setLoop: () => {},
            score: 0,
            setScore: () => {},
            quizState: false,
            setQuizState: () => {},
            displayQuestionState: false,
            setDisplayQuestionState: () => {},
            currentUpgrade: undefined, 
            setCurrentUpgrade: () => {},
            currentCard: undefined,
            setCurrentCard: () => {}
        }
)

export default function GameStateProvider({ children }: {children: React.ReactNode} ){

    const [player, setPlayer] = useState<Player>(defaultPlayerState)
    const [loop, setLoop] = useState<number>(0)
    const [score, setScore] = useState<number>(0)
    const [quizState, setQuizState] = useState<boolean>(true)

    const [displayQuestionState, setDisplayQuestionState] = useState<boolean>(false)

    const [currentUpgrade, setCurrentUpgrade] = useState<Upgrade | undefined>(undefined)
    const [currentCard, setCurrentCard] = useState<Card | undefined>(undefined)

    return (
        <GameContext.Provider value={
            {
                player,
                setPlayer,
                loop,
                setLoop,
                score,
                setScore,
                quizState,
                setQuizState,
                displayQuestionState,
                setDisplayQuestionState,
                currentUpgrade,
                setCurrentUpgrade,
                currentCard,
                setCurrentCard
            }}>
            {children}
        </GameContext.Provider>
    )
}

export const useGame = () => useContext(GameContext)