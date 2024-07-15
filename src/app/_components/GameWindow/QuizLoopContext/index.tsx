"use client"

import { createContext, useContext, useState } from "react"

type LoopType = {
    questionsAnswered: number,
    setQuestionsAnswered: React.Dispatch<React.SetStateAction<number>>
}

const LoopContext = createContext<LoopType>({
    questionsAnswered: 0,
    setQuestionsAnswered: () => {}
})

export default function LoopStateProvider({ children }: {children: React.ReactNode}) {
    const [questionsAnswered, setQuestionsAnswered] = useState<number>(0)

    return (
        <LoopContext.Provider value={{questionsAnswered,setQuestionsAnswered}}>
            {children}
        </LoopContext.Provider>
    )
}

export const useLoop = () => useContext(LoopContext)