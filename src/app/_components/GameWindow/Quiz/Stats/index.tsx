"use client"

import { type GameStateProps, type StatType, type PlayerType } from "@/app/_types/types";
import { useGame } from "../../../GameContext";
import styles from "./styles.module.scss";
import { useState } from "react";
import useAudio from "@/app/_hooks/useVolume";

const statsArray: StatType[] = [
    {string: "Max Health",name:"maxhp"},
    {string:"Armour",name:"armour"},
    {string:"Damage",name:"dmg"},
    {string:"Critical",name:"critical"},
    {string:"Looting",name:"looting"},
    {string:"Parry",name:"parry"},
]

export default function Stats(){

    const { gameState, player, setPlayer, setGameState } = useGame()
    const [tempPlayer, setTempPlayer] = useState<PlayerType>(player)
    const [ tempTokens, setTempTokens ] = useState<number>(gameState.statToken)
    const { playSelectSound } = useAudio()

    function handleClick(){
        playSelectSound()
        setPlayer(() => ({
            ...tempPlayer,
            hp: tempPlayer.maxhp,
            maxhp: tempPlayer.maxhp,
            armour: tempPlayer.armour,
            maxarmour: tempPlayer.armour + tempPlayer.maxarmour
        }))

        setGameState((prev: GameStateProps) => ({
            ...prev,
            statsState: false,
            questionState: false,
            quizState: false,
            statToken: tempTokens,
            loop: prev.loop + 1
        }))
    }

    return (
        <div className={styles.stats_container_wrapper}>
            <h1>Upgrade</h1>
            <StatTokens token={tempTokens}/>
            <div className={styles.stats_container}>
                {
                    statsArray &&
                    statsArray.map((stat, idx: number) => {

                        const value = tempPlayer[stat.name as keyof PlayerType]
                        if(typeof value === "number") {
                            return <StatRow key={idx} stat={stat} value={value} tempPlayer={tempPlayer} setTempPlayer={setTempPlayer} tempTokens={tempTokens} setTempTokens={setTempTokens}/>
                        }
                    })
                }
                <a className={styles.confirm} onClick={handleClick}>
                    CONFIRM
                </a>
            </div>
        </div>
    )
}

function StatTokens({token}:{token: number}){

    return (
        <div className={styles.token_wrapper}>
            <p>Points:</p>
            <p className={styles.tokens}>{token}</p>
        </div>
    )
}

function StatRow(
    {
        stat,
        value,
        setTempPlayer,
        tempTokens,
        setTempTokens
    }:{
        stat: StatType,
        value: number,
        tempPlayer: PlayerType,
        setTempPlayer: React.Dispatch<React.SetStateAction<PlayerType>>,
        tempTokens: number,
        setTempTokens: React.Dispatch<React.SetStateAction<number>>
    }){

        const { player } = useGame()
        const { playWrongSound, playSelectSound } = useAudio()

        function handleClick(inc: 1 | -1){
            const key = stat.name
            const statValue = player[key as keyof PlayerType]


            if(!(typeof value == "number")) return ;
            if(!(typeof statValue == "number")) return;

            const newTokenVal = tempTokens + (inc * -1)

            if((newTokenVal <= 0 && inc == -1) || (newTokenVal < 0) || (value + inc < statValue)){
                playWrongSound()
                return;
            }

            playSelectSound()
            setTempTokens(newTokenVal)
            setTempPlayer((prev: PlayerType) => ({
                ...prev,
                [key]: value + inc 
            }))
        }

    return (
        <div className={styles.stat}>
            <p className={styles.name}>{stat.string}</p>

            <div className={styles.stat_incdec_wrapper}>
                <a className={styles.inc} onClick={() => handleClick(1)}>+</a>

                <p className={styles.value}>{value}</p>

                <a className={styles.dec} onClick={() => handleClick(-1)}>-</a>
            </div>
        </div>
    )
}