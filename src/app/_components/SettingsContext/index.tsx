"use client"

import { createContext, useContext, useState } from "react"

type SettingsState = {
    volume: number,
    setVolume: React.Dispatch<React.SetStateAction<number>>,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const SettingsContext = createContext<SettingsState>(
    {
        volume: 100,
        setVolume: () => {},
        open: false,
        setOpen: () => {}
    }
)

export default function SettingsStateProvider({children}:{children: React.ReactNode}){
    const [volume, setVolume] = useState<number>(100)
    const [open,setOpen] = useState<boolean>(false)

    return (
        <SettingsContext.Provider value={
            {
                open,
                setOpen,
                volume,
                setVolume,
            }
        }>
            {children}
        
        </SettingsContext.Provider>
    )
}

export const useSettings = () => useContext(SettingsContext)