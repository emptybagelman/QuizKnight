"use client"

import {  type Player, type GameStateProps } from "@/app/_types/types"
import { createContext, useContext, useState } from "react"

type GameState = {
    player: Player,
    setPlayer: React.Dispatch<React.SetStateAction<Player>>,
    gameState: GameStateProps,
    setGameState: React.Dispatch<React.SetStateAction<GameStateProps>>
}

const defaultPlayerState: Player = {
    name: "Player",
    hp: 10,
    maxhp: 10,
    dmg: 3,
    armour: 5,
    resistance: 0,
    critical: 2,
    parry: 5,
    consumables: [{
        id: 1,
        name: "health pot",
        value: 2,
        description: "top up"
    },{
        id: 2,
        name: "bomb",
        value: 1,
        description: "boom"
    }]
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

    const [player, setPlayer] = useState<Player>(defaultPlayerState)
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