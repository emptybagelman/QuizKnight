"use client"

import { createContext, useContext, useState } from "react"

type SettingsState = {
    volume: number,
    setVolume: React.Dispatch<React.SetStateAction<number>>,
    mute: boolean,
    setMute: React.Dispatch<React.SetStateAction<boolean>>,
    damageNumbers: boolean,
    setDamageNumbers: React.Dispatch<React.SetStateAction<boolean>>,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    gameSpeedMultiplier: number,
    setGameSpeedMultiplier: React.Dispatch<React.SetStateAction<number>>,
}

const SettingsContext = createContext<SettingsState>(
    {
        volume: 100,
        setVolume: () => {},
        mute: false,
        setMute: () => {},
        damageNumbers: true,
        setDamageNumbers: () => {},
        open: false,
        setOpen: () => {},
        gameSpeedMultiplier: 1,
        setGameSpeedMultiplier: () => {}
    }
)

export default function SettingsStateProvider({children}:{children: React.ReactNode}){
    const [volume, setVolume] = useState<number>(100)
    const [mute, setMute] = useState<boolean>(false)
    const [damageNumbers, setDamageNumbers] = useState<boolean>(true)
    const [open,setOpen] = useState<boolean>(false)
    const [gameSpeedMultiplier,setGameSpeedMultiplier] = useState<number>(1)

    return (
        <SettingsContext.Provider value={
            {
                open,
                setOpen,
                volume,
                setVolume,
                damageNumbers,
                setDamageNumbers,
                mute,
                setMute,
                gameSpeedMultiplier,
                setGameSpeedMultiplier
            }
        }>
            {children}
        
        </SettingsContext.Provider>
    )
}

export const useSettings = () => useContext(SettingsContext)