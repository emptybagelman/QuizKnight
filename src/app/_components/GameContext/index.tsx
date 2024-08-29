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
    agility: 0,
    skills: [{
        id: 0,
        name: "Power Move",
        type: "damage",
        charge: 0,
    }],
    consumables: [{
        id: 0,
        name: "Health Potion",
        value: 1,
        description: "Fills your HP to full."
    },
    {
        id: 1,
        name: "Mana Potion",
        value: 0,
        description: "Charge your power move to the max!"
    },
    {
        id: 2,
        name: "Agility Crystal",
        value: 0,
        description: "Dodge the enemy's next attack."
    },
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