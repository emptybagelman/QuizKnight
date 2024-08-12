"use client"

import { useEffect, useState } from "react";
import CombatDialogue from "../CombatDialogue";
import { type Enemy, type GameStateProps } from "@/app/_types/types"
import { useGame } from "../../../GameContext";
import ScoreCounter from "../ScoreCounter";
import { useRouter } from "next/navigation";
import { postScore } from "@/server/actions/categoryActions";
import StartScreen from "../StartScreen";
import useSound from "use-sound";
import AttackButton from "../../AttackButton";
import EnemySprite from "../../Characters/Enemy";
import { audio } from "@/app/assets/sounds"
import { useCombat } from "../../../CombatContext";
import CombatContainer from "..";
import Player from "../../Characters/Player";
import SpriteContainer from "../SpriteContainer";

export default function Combat(){

    const ATTACK_TIMEOUT = 500;
    const DELAY = 3500;
    
    const {player, setPlayer, gameState, setGameState} = useGame()
    const {playerAttack,setPlayerAttack,enemyAttack,setEnemyAttack,enemyData,setEnemyData,currentDialogue,setCurrentDialogue, buttonState,setButtonState} = useCombat()

    const [playSwingSound] = useSound(audio.attack_sword,{ volume: 2 })
    const [playHitSound] = useSound(audio.impact_flesh,{ volume: 2 })
    const [playBlockSound] = useSound(audio.block,{volume:3})

    const critChance = chanceEval(player.critical)
    const parryChance = chanceEval(player.parry)

    const playerTotalDamage = critChance ? player.dmg*2 : player.dmg
    const parryBool = parryChance ? true : false
    const router = useRouter()

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
 
    function chanceEval(boolValue: number) {
        return Math.random() <= boolValue / 100 ? true : false
    }

    function handlePlayerAttack(){
        if(!enemyData[0]) throw new Error("No enemies to kill!");

        const firstEnemy = enemyData[0]

        let overflowDmg = 0;
        let enemyHp = firstEnemy.hp;

        if(firstEnemy.armour < playerTotalDamage){
            overflowDmg = Math.abs(firstEnemy.armour - playerTotalDamage)
            enemyHp = firstEnemy.hp - overflowDmg
            firstEnemy.hp = enemyHp
            firstEnemy.armour = 0
        }else{
            firstEnemy.armour = firstEnemy.armour - playerTotalDamage
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
            setGameState((prev: GameStateProps) => ({
                ...prev,
                score: prev.score + 100
            }))
        }
        else if(critChance){
            setCurrentDialogue({
                enemy:enemyData[0],
                active: true,
                index: 4
            })
        }

        else{
            setCurrentDialogue({ // PLAYER ATK DIALOGUE
                enemy: enemyData[0],
                active: true,
                index: 0
            })
        }

        // PLAYER ATTACK CYCLE
        playSwingSound()
        playHitSound()
        setTimeout(() => {
            setPlayerAttack(false)

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
                    setGameState((prev: GameStateProps) => ({
                        ...prev,
                        quizState: true 
                    }))
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

        const enemyDmg = enemyData[0].dmg
        const tempPlayer = player;

        let overflowDmg = 0;
        let playerHp = tempPlayer.hp;

        if(!(parryBool)){ // handles no parry
            if(tempPlayer.armour <= enemyDmg){
                overflowDmg = Math.abs(tempPlayer.armour - enemyDmg)
                playerHp = tempPlayer.hp - overflowDmg
                tempPlayer.hp = playerHp
                tempPlayer.armour = 0
            }else{
                tempPlayer.armour = tempPlayer.armour - enemyDmg
            }

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

            playHitSound()
        }
        else { // sets parry dialogue
            playBlockSound()
            setCurrentDialogue({ 
                enemy: enemyData[0],
                active: true,
                index: 5
            })
        }

        setEnemyAttack(true)  // RUNS ENEMY ATTACK
        playSwingSound()
        
        setTimeout(() => {
            setEnemyAttack(false)            

            setTimeout(() => {
                if(playerHp <= 0){
                    router.push("/scoreboard")
                    void postScore({ name: "balls", highest_loop: gameState.loop, score: gameState.score })
                }else{
                    setCurrentDialogue(emptyDialogue)
                    setButtonState(false) // ENABLE BUTTON
                }
            },DELAY)
        },ATTACK_TIMEOUT)

    }

    function handleClick(){
        if(!enemyData[0]) return;
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
        <CombatContainer>
            <StartScreen />
            <SpriteContainer>
                <Player parryBool={parryBool}/>
                {
                    enemyData &&
                    enemyData.map((enemy, idx) => (
                        <EnemySprite key={idx} id={idx} enemy={enemy} enemyData={enemyData} enemyAttack={enemyAttack} playerAttack={playerAttack} damage={playerTotalDamage}/>
                    ))
                }
            </SpriteContainer>

            <AttackButton handleClick={handleClick} buttonState={buttonState} />
            <CombatDialogue data={currentDialogue}/>
            <ScoreCounter />
        </CombatContainer>
    )
}
