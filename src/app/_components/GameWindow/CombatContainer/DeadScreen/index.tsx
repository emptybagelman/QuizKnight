"use client"

import { useRouter } from "next/navigation"
import styles from "./styles.module.scss"
import { postScore } from "@/server/actions/categoryActions"
import { useGame } from "@/app/_components/GameContext"
import { useState } from "react"

export default function DeadScreen(){

    const router = useRouter()
    const { gameState } = useGame()
    const [ input, setInput ] = useState<string>("")

    async function handleSubmit(){
        router.push("/scoreboard")
        if(gameState.score > 0){
            postScore({ name: input, highest_loop: gameState.loop, score: gameState.score })
        }
    }

    function handleInput(e: React.ChangeEvent<HTMLInputElement>){
        setInput(e.target.value)
    }

    return (
        <div className={styles.deathscreen_wrapper}>
            <h1>You died.</h1>

            <h2>You scored {gameState.score}</h2>

            <div>
                <label htmlFor="name">Username</label>
                <input type="text" onChange={handleInput} defaultValue={""} maxLength={15}/>

                <a onClick={handleSubmit}>Submit</a>
            </div>
        </div>
    )
}