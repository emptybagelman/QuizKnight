"use client"

import { useEffect, useState } from "react";
import styles from "@/styles/components/GameWindow/styles.module.scss"
import CombatDialogue from "../CombatDialogue";
import { type Enemy, type DialogueProps } from "@/app/_types/types"
import { useGame } from "../../GameContext";
import ScoreCounter from "../ScoreCounter";
import { useRouter } from "next/navigation";
import HealthBar from "../HealthBar";
import { postScore } from "@/server/actions/categoryActions";
import StartScreen from "../../StartScreen";
import Hit from "../Hit";
import useSound from "use-sound";
import attack_sword from "#/sounds/attack_sword.mp3";
import impact_flesh from "#/sounds/impact_flesh.mp3";
import hover from "#/sounds/hover.mp3";

export default function Combat(){
    
    const {player, setPlayer, loop, score, setScore, setQuizState} = useGame()
    
    const [playerAttack, setPlayerAttack] = useState<boolean>(false)
    const [enemyAttack, setEnemyAttack] = useState<boolean>(false)
    const [buttonState, setButtonState] = useState<boolean>(false)

    const [playSwingSound] = useSound(attack_sword,{ volume: 2 })
    const [playHitSound] = useSound(impact_flesh,{ volume: 2 })
    const [playHoverSound] = useSound(hover)

    const router = useRouter()

    const enemyAmount = adjustDifficulty()

    const enemyArray: Enemy[] = [...Array.from({length:enemyAmount}).map((x, index) => {

        const hp = randomInt((2 + Math.floor(loop*1.06)),1)
        const dmg = randomInt((2 + Math.floor(loop*1.04)),1)
        const armour = randomInt((1 + Math.floor(loop*1.02)),1)

        const en = {
            id: index,
            name: "Goblin",
            hp: hp,
            maxhp: hp,
            armour: armour,
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

    const emptyDialogue = {
        enemy: enemyData[0]!,
        active: false,
        index: 0,
    }

    const activeEmptyDialogue = {
        enemy: enemyData[0]!,
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

        if(!enemyData[0]) throw new Error("No enemies to kill!");

        playSwingSound()
        const firstEnemy = enemyData[0]

        let overflowDmg = 0;
        let enemyHp = firstEnemy.hp;

        if(firstEnemy.armour < player.dmg){
            overflowDmg = Math.abs(firstEnemy.armour - player.dmg)
            enemyHp = firstEnemy.hp - overflowDmg
            firstEnemy.hp = enemyHp
            firstEnemy.armour = 0
        }else{
            firstEnemy.armour = firstEnemy.armour - player.dmg
        }

        setEnemyData(
            (prev: Enemy[]) => {
                const newEnemyData = [...prev]
                newEnemyData[0] = firstEnemy
                return newEnemyData
            })

        if(enemyHp <= 0){ // KILL ENEMY DIALOGUE
            setCurrentDialogue({
                enemy: enemyData[0],
                active: true,
                index: 3
            })
            setScore(prev => prev + 100)
        }

        else{
            setCurrentDialogue({ // PLAYER ATK DIALOGUE
                enemy: enemyData[0],
                active: true,
                index: 0
            })
        }

        // PLAYER ATTACK CYCLE
        setTimeout(() => {
            setPlayerAttack(false)

            playHitSound()

            // WAIT FOR DIALOGUE
            setTimeout(() => {

                if(enemyHp <= 0){
                    setEnemyData(
                        (prev: Enemy[]) => {
                            const newArray = [...prev]
                            newArray.shift()
                            return newArray
                        }
                    )
                }

                if(enemyData.length <= 1 && enemyHp <= 0){
                    setCurrentDialogue(emptyDialogue)
                    setButtonState(false)
                    setQuizState(true)
                }

                else{
                    setCurrentDialogue(activeEmptyDialogue)
                    setTimeout(() => {
                        if(enemyHp > 0) {
                            handleEnemyAttack()
                        }
                        else{
                            setButtonState(false)
                            setCurrentDialogue(emptyDialogue)
                        }
                    },500)
                }
                
                

            },DELAY)

        },ATTACK_TIMEOUT)
    }

    function handleEnemyAttack() {
        if(!enemyData[0]) throw new Error("Apparently the player is dead and is still being beaten into the ground...");

        playSwingSound()

        const enemyDmg = enemyData[0].dmg
        const tempPlayer = player;

        let overflowDmg = 0;
        let playerHp = tempPlayer.hp;

        if(tempPlayer.armour <= enemyDmg){
            overflowDmg = Math.abs(tempPlayer.armour - enemyDmg)
            playerHp = tempPlayer.hp - overflowDmg
            tempPlayer.hp = playerHp
            tempPlayer.armour = 0
        }else{
            tempPlayer.armour = tempPlayer.armour - enemyDmg
        }

        setEnemyAttack(true)  // RUNS ENEMY ATTACK
        setPlayer(tempPlayer)

        if(playerHp <= 0){
            setCurrentDialogue({
                enemy: enemyData[0],
                active: true,
                index: 2,
            })

        }

        else{
            setCurrentDialogue({
                enemy: enemyData[0],
                active: true,
                index: 1,
            })
        }

        setTimeout(() => {
            setEnemyAttack(false)

            playHitSound()

            setTimeout(() => {
                if(playerHp <= 0){
                    router.push("/scoreboard")
                    void postScore({ name: "balls", highest_loop: loop, score: score })
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

    const [mounted, setMounted] = useState<boolean>(false)

    useEffect(() => {
        setMounted(true)
    },[])

    if(mounted)
    return (
        <div className={styles.game_window}>
            {
                loop == 0
                ? <StartScreen />
                : ""
            }
            <div id={styles.sprite_layer}>
                <div className={playerAttack ? styles.playerAttackAnim : styles.player}>
                    {
                        enemyAttack && enemyData[0]
                        ? <Hit dmg_value={enemyData[0].dmg}/>
                        : ""
                    }
                    {/* <p>{player.hp} / {player.maxhp} {!(player.armour <= 0) && ` + ${player.armour}`}</p> */}
                    <HealthBar character={player} />
                </div>

                {
                    enemyData &&
                    enemyData.map((enemy, idx) => (
                        <div key={idx} className={
                            enemyAttack && enemy.id === enemyData[0]?.id
                            ? styles.enemyAttackAnim
                            : styles.enemy
                            }>
                            {
                                playerAttack && enemyData[0]?.id === enemy.id
                                ? <Hit dmg_value={player.dmg}/>
                                : ""
                            }
                            <HealthBar character={enemy} />
                        </div>
                    ))
                }
            </div>

            <button
            onClick={handleClick}
            onMouseEnter={() => playHoverSound()}
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