"use client"

import {  type PlayerType, type GameStateProps } from "@/app/_types/types"
import { createContext, useContext, useState } from "react"

type GameState = {
    player: PlayerType,
    setPlayer: React.Dispatch<React.SetStateAction<PlayerType>>,
    gameState: GameStateProps,
    setGameState: React.Dispatch<React.SetStateAction<GameStateProps>>
}

const defaultPlayerState: PlayerType = {
    name: "Player",
    hp: 10,
    maxhp: 10,
    dmg: 3,
    armour: 5,
    resistance: 0,
    critical: 2,
    parry: 5,
    looting: 10,
    consumables: [{
        id: 0,
        name: "Health Potion",
        value: 1,
        description: "top up"
    },
    {
        id: 1,
        name: "Mana Potion",
        value: 0,
        description: "power!"
    },
    // {
    //     id: 2,
    //     name: "Bomb",
    //     value: 0,
    //     description: "boom"
    // },
]
}

const defaultGameState: GameStateProps = {
    loop: 0,
    score: 0,
    quizState: false,
    questionState: false,
    currentUpgrade: undefined,
    currentCard: undefined,
}

const GameContext = createContext<GameState>(
        {
            player: defaultPlayerState,
            setPlayer: () => {},
            gameState: defaultGameState,
            setGameState: () => {}
        }
)

export default function GameStateProvider({ children }: {children: React.ReactNode} ){

    const [player, setPlayer] = useState<PlayerType>(defaultPlayerState)
    const [gameState, setGameState] = useState<GameStateProps>(defaultGameState)

    return (
        <GameContext.Provider value={
            {
                player,
                setPlayer,
                gameState,
                setGameState
            }}>
            {children}
        </GameContext.Provider>
    )
}

export const useGame = () => useContext(GameContext)