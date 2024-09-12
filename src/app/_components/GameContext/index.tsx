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
    hp: 20,
    maxhp: 20,
    dmg: 3,
    armour: 5,
    maxarmour: 5,
    resistance: 0,
    critical: 5,
    parry: 5,
    looting: 5,
    agility: 0,
    skills: [{
        id: 0,
        name: "Piercing Blade",
        type: "damage",
        charge: 0,
        active: false,
        description: "Hit multiple enemies at once."
    }],
    consumables: [
        {
            id: 0,
            name: "Health Potion",
            value: 1,
            description: "Fills your HP to full."
        },
        // {
        //     id: 3,
        //     name: "Firebomb",
        //     value: 1,
        //     description: "Fills your HP to full.",
        //     charge: 10,
        // },
    ]
}

const defaultGameState: GameStateProps = {
    loop: 0,
    score: 0,
    quizState: false,
    questionState: false,
    statsState: false,
    powerState: false,
    currentUpgrade: undefined,
    currentCard: undefined,
    autoPlay: false,
    statToken: 0,
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