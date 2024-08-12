"use client"

import { createContext, useContext, useState } from "react"
import { useGame } from "../GameContext"
import { type DialogueProps, type Enemy } from "@/app/_types/types"
import generateEnemies from "@/app/_functions/game_functions"

export type CombatType = {
    playerAttack: boolean,
    setPlayerAttack: React.Dispatch<React.SetStateAction<boolean>>,
    enemyAttack: boolean,
    setEnemyAttack: React.Dispatch<React.SetStateAction<boolean>>,
    enemyData: Enemy[],
    setEnemyData: React.Dispatch<React.SetStateAction<Enemy[]>>,
    currentDialogue: DialogueProps | undefined,
    setCurrentDialogue: React.Dispatch<React.SetStateAction<DialogueProps>>,
    buttonState: boolean,
    setButtonState: React.Dispatch<React.SetStateAction<boolean>>
}

const CombatContext = createContext<CombatType>(
    {
        playerAttack: false,
        setPlayerAttack: () => {},
        enemyAttack: false,
        setEnemyAttack: () => {},
        enemyData: [],
        setEnemyData: () => {},
        currentDialogue: undefined,
        setCurrentDialogue: () => {},
        buttonState: false,
        setButtonState: () => {},
    }
)

export default function CombatStateProvider({children}: {children: React.ReactNode}) {

    const { gameState } = useGame()
    

    const [playerAttack, setPlayerAttack] = useState<boolean>(false)
    const [enemyAttack, setEnemyAttack] = useState<boolean>(false)
    const [enemyData, setEnemyData] = useState<Enemy[]>(generateEnemies(gameState.loop))
    const [currentDialogue, setCurrentDialogue] = useState<DialogueProps>({
        enemy: enemyData[0]!,
        active: false,
        index: 0,
        extra: ""
    })
    const [buttonState, setButtonState] = useState<boolean>(false)



    return (
        <CombatContext.Provider value={{
            playerAttack,
            setPlayerAttack,
            enemyAttack,
            setEnemyAttack,
            enemyData,
            setEnemyData,
            currentDialogue,
            setCurrentDialogue,
            buttonState,
            setButtonState,
        }}>
            {children}
        </CombatContext.Provider>
    )
}

export const useCombat = () => useContext(CombatContext)