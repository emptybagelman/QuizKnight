"use client"

import { useState } from "react";
import styles from "@/styles/components/GameWindow/styles.module.scss"
import CombatDialogue from "../CombatDialogue";
import { Player, Enemy, DialogueProps } from "@/app/_types/types"
import { useGame } from "../../GameContext";
import ScoreCounter from "../ScoreCounter";
import { useRouter } from "next/navigation";

export default function Combat(){
    
    const {player, setPlayer, loop, setScore, setQuizState} = useGame()
    
    const [playerAttack, setPlayerAttack] = useState<boolean>(false)
    const [enemyAttack, setEnemyAttack] = useState<boolean>(false)
    const [buttonState, setButtonState] = useState<boolean>(false)

    const router = useRouter()

    const enemyAmount = adjustDifficulty()

    const enemyArray: Enemy[] = [...Array.from({length:enemyAmount}).map((x, index) => {

        const hp = randomInt((3 + Math.floor(loop*1.2)),2)
        const dmg = randomInt((20 + Math.floor(loop*1.1)),2)

        const en = {
            id: index,
            name: "Goblin",
            hp: hp,
            maxhp: hp,
            dmg: dmg,
        }

        return en;
        })
    ]

    const [enemyData, setEnemyData] = useState<Enemy[]>(enemyArray)

    const [currentDialogue, setCurrentDialogue] = useState<DialogueProps>({
        enemy: enemyData[0]!,
        active: false,
        index: 0,
    })

    const ATTACK_TIMEOUT = 200;
    const DELAY = 3500;
    const BUTTON_TIMEOUT = 2000;

    const emptyDialogue = {
        enemy: enemyData[0],
        active: false,
        index: 0,
    }

    const activeEmptyDialogue = {
        enemy: enemyData[0],
        active: true,
        index: -1,
    }

    function adjustDifficulty(){
        return 1 + Math.floor(loop * 0.5)
    }

    function randomInt(hp: number, range: number){
        const min = hp - range
        const max = hp + range
        return Math.floor(Math.random() * (max-min+1)) + min
      }

    function handlePlayerAttack(){

        const newEnemyHp = enemyData[0]?.hp! - player.dmg

        setEnemyData(
            (prev: Enemy[]) => {
                const newData = [...prev]

                newData[0] = {
                    ...newData[0],
                    hp: newEnemyHp
                }

                return newData
            }
        )

        if(newEnemyHp <= 0){ // KILL ENEMY DIALOGUE
            setCurrentDialogue({
                enemy: enemyData[0]!,
                active: true,
                index: 3
            })
            setScore(prev => prev + 100)
        }

        else{
            setCurrentDialogue({ // PLAYER ATK DIALOGUE
                enemy: enemyData[0]!,
                active: true,
                index: 0
            })
        }

        // PLAYER ATTACK CYCLE
        setTimeout(() => {
            setPlayerAttack(false)

            // WAIT FOR DIALOGUE
            setTimeout(() => {

                if(newEnemyHp <= 0){
                    setEnemyData(
                        (prev: Enemy[]) => {
                            const newArray = [...prev]
                            newArray.shift()
                            return newArray
                        }
                    )
                }

                if(enemyData.length <= 1 && newEnemyHp){
                    setCurrentDialogue(emptyDialogue)
                    setButtonState(false)
                    setQuizState(true)
                }

                else{
                    setCurrentDialogue(activeEmptyDialogue)
                    setTimeout(() => {
                        handleEnemyAttack()
                    },500)
                }
                
                

            },DELAY)

        },ATTACK_TIMEOUT)
    }

    function handleEnemyAttack() {
        const enemyDmg = enemyData[0]?.dmg!
        setEnemyAttack(true)  // RUNS ENEMY ATTACK
        setPlayer((prev: Player) => (
            {
                ...prev,
                hp: prev.hp - enemyDmg
            }
        ))

        if(player.hp - enemyDmg <= 0){
            setCurrentDialogue({
                enemy: enemyData[0]!,
                active: true,
                index: 2,
            })

        }

        else{
            setCurrentDialogue({
                enemy: enemyData[0]!,
                active: true,
                index: 1,
            })
        }

        setTimeout(() => {
            setEnemyAttack(false)

            setTimeout(() => {
                if(player.hp - enemyDmg <= 0){
                    router.push("/scoreboard")
                }else{
                    setCurrentDialogue(emptyDialogue)
                    setButtonState(false) // ENABLE BUTTON
                }

            },DELAY)
        },ATTACK_TIMEOUT)

    }

    function handleClick(){
        setButtonState(true) // DISABLES BUTTON DURING COMBAT
        setPlayerAttack(true) // RUNS PLAYER ATTACK

        handlePlayerAttack()
    }

    return (
        <div className={styles.game_window}>
            <div id={styles.sprite_layer}>
                <div className={playerAttack ? styles.playerAttackAnim : styles.player}>
                    <p>{player.hp} / {player.maxhp}</p>
                </div>

                {
                    enemyData &&
                    enemyData.map((enemy, idx) => (
                        <div key={idx} className={
                            enemyAttack && enemy.id === enemyData[0]?.id
                            ? styles.enemyAttackAnim
                            : styles.enemy
                            }>
                            <p>{enemy.hp} / {enemy.maxhp}</p>
                        </div>
                    ))
                }
            </div>

            <button
            onClick={handleClick}
            className={styles.attack_button}
            disabled={buttonState}
            >
                Attack
            </button>

            <CombatDialogue data={currentDialogue}/>
            <ScoreCounter />
        </div>
    )
}