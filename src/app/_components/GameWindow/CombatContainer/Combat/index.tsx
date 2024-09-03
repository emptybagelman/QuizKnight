"use client"

import { useEffect, useMemo, useState } from "react";
import CombatDialogue from "../CombatDialogue";
import { type PlayerType, type Enemy, type GameStateProps, Background } from "@/app/_types/types"
import { useGame } from "../../../GameContext";
import ScoreCounter from "../ScoreCounter";
import { useRouter } from "next/navigation";
import { postScore } from "@/server/actions/categoryActions";
import StartScreen from "../StartScreen";
import AttackButton from "../../AttackButton";
import EnemySprite from "../../Characters/Enemy";
import { useCombat } from "../../../CombatContext";
import CombatContainer from "..";
import Player from "../../Characters/Player";
import SpriteContainer from "../SpriteContainer";
import useAudio from "@/app/_hooks/useVolume";
import SettingsWidget from "@/app/_components/Settings/GameSettings";
import ConsumableContainer from "../../Consumables";
import { randomItem } from "@/app/_functions/game_functions";
import HealthBar from "../../Characters/HealthBar";
import Hit from "../../Characters/Hit";
import Skills from "../../Characters/Player/Skills";
import PowerButton from "../../Characters/Player/Skills/PowerButton";
import usePlayer from "@/app/_hooks/usePlayer";
import sprites from "./sprites.module.scss"

export default function Combat(){
    
    // CONTEXTS AND HOOKS
    const { player, setPlayer, gameState, setGameState} = useGame()
    const { setPlayerAttack, playerAttack, enemyAttack, setEnemyAttack, enemyData, setEnemyData, currentDialogue, setCurrentDialogue, buttonState, setButtonState} = useCombat()
    const { updateSkills, updateLoot, updateLootCharge } = usePlayer()
    const { playSwingSound, playHitSound, playBlockSound, playEvadeSound, playFirebombSound } = useAudio()
    const router = useRouter()

    // CONSTANTS & VARIABLES
    const ATTACK_TIMEOUT = 500;
    const DELAY = 3500;
    const BURN_DMG = 2;

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

    const chargeIsZero = player.skills[0]?.charge === 0

    const critChance = useMemo(() => chanceEval(player.critical), [playerAttack == true])
    const lootChance = useMemo(() => chanceEval(player.looting), [playerAttack == true])

    const playerTotalDamage = useMemo(() => critChance ? player.dmg * 1.5 : player.dmg , [critChance])

    // STATES
    const [mounted, setMounted] = useState<boolean>(false)
    const [ parry, setParry ] = useState<boolean>(false)
    const [extraDialogue, setExtraDialogue] = useState<string | undefined>(undefined)
    const [background, setBackground] = useState<Background>("default")

 

    // FUNCTIONS

    function chanceEval(boolValue: number) {
        return Math.random() <= boolValue / 100 ? true : false
    }

    function handlePlayerAttack(){
        if(!enemyData[0]) throw new Error("No enemies to kill!");

        setBackground("shake")

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

            // HANDLE IF ENEMY DROPS LOOT
            if(lootChance){
                const randItem = randomItem()
                setExtraDialogue(randItem)
                updateLoot(randItem, 1)

                setCurrentDialogue({
                    enemy: enemyData[0],
                    active: true,
                    index: 7
                })
            }
            else{
                // DEFAULT KILL DIALOGUE
                setCurrentDialogue({
                    enemy: enemyData[0],
                    active: true,
                    index: 3
                })
            }
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
            setBackground("default")

            // WAIT FOR DIALOGUE
            setTimeout(() => {
                setCurrentDialogue(activeEmptyDialogue)
                const firebomb = player.consumables[3]
                if(firebomb?.charge === 0){
                    // CHECK IF ENEMY DEAD

                    // EMPTY DIALOGUE BETWEEN MESSAGES

                    // ADD +10 CHARGE ON KILL 
                    updateSkills(0, 10, false)
                    handleEnemyKill(firstEnemy)
                    moveToQuiz(enemyHp)
                }
                // HANDLE BURNING FROM FIREBOMB
                else if(firebomb && firebomb.charge! > 0){
                    setTimeout(() => {
                        if(!firebomb) throw new Error("What did you do ?")
                        setCurrentDialogue({
                            enemy: enemyData[0]!,
                            active: true,
                            index: 10
                        })
    
                        enemyHp -= BURN_DMG
    
                        // ENEMY TAKE FIRE DMG
                        playFirebombSound()
                        setEnemyData((prev: Enemy[]) => {
                            const newEnemyData = [...prev]
                            newEnemyData[0]!.hp = enemyHp
                            return newEnemyData
                        })
    
                        updateLootCharge(firebomb.name,-1)
                        if(firebomb.charge! - 1 == 0){
                            updateLoot(firebomb.name, -1)
                        } 

                        setTimeout(() => {
                            setCurrentDialogue(activeEmptyDialogue)
                            handleEnemyKill(firstEnemy)
                            moveToQuiz(enemyHp)
                        }, DELAY);

                    }, ATTACK_TIMEOUT);

                }
            },DELAY)

        },ATTACK_TIMEOUT)
    }

    function moveToQuiz(enemyHp: number){
            setCurrentDialogue(activeEmptyDialogue)
            setTimeout(() => {
               
                if(enemyHp <= 0){
                    setButtonState(false)
                    setCurrentDialogue(emptyDialogue)
                }
                else {
                    handleEnemyAttack()
                }
            },500)
        
    }

    function handleEnemyKill(enemy: Enemy){
        if(enemy.hp <= 0){
            // SHIFT ENEMYS FORWARD
            setEnemyData(
                (prev: Enemy[]) => {

                    const id = prev.indexOf(enemy)

                    const newArray = [...prev]
                    newArray.splice(id,1)
                    return newArray
                }
            )
        }
    }

    function handleEnemyAttack() {
        if(!enemyData[0]) throw new Error("Apparently the player is dead and is still being beaten into the ground...");
        
        setBackground("shake")

        const enemyDmg = enemyData[0].dmg
        const tempPlayer = player;

        let overflowDmg = 0;

        let newHp = player.hp;
        let newArmour = player.armour;

        const parryChance = Math.random() < player.parry / 100 ? true : false
        setParry(parryChance)

        if(!(parryChance || player.agility == 1)){ // handles no parry
            if(player.armour <= enemyDmg){
                overflowDmg = Math.abs(player.armour - enemyDmg)
                newHp -= overflowDmg
                newArmour = 0
            }else{
                newArmour -= enemyDmg
            }

            setPlayer((prev: PlayerType) => ({
                ...prev,
                hp: newHp,
                armour: newArmour
            }))

            if(newHp <= 0){
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

        else if(tempPlayer.agility == 1){
            playEvadeSound()
            setCurrentDialogue({
                enemy: enemyData[0],
                active: true,
                index: 8
            })
        }

        else if(parryChance){ // sets parry dialogue
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
            setParry(false)
            setBackground("default")

            if(player.agility == 1){
                setPlayer((prev: PlayerType) => ({
                    ...prev,
                    agility: 0
                }))
            }

            setTimeout(() => {
                if(newHp <= 0){
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

    // USE EFFECTS

    // WAITS FOR GAME TO LOAD
    useEffect(() => {
        setMounted(true)
    },[])

    // UPDATE ENEMIES ON POWER MOVE USAGE
    useEffect(() => {
        if(mounted){
            setBackground("power_shake")

            setTimeout(() => {

                const newEnemyArray = [...enemyData]
                for(const enemy of enemyData){
                    const index = newEnemyArray.indexOf(enemy)
                    if(enemy.hp <= 0){
                        newEnemyArray.splice(index,1)
                    }
                }

                if(newEnemyArray.length <= 0){
                    setGameState((prev: GameStateProps) => ({
                        ...prev,
                        quizState: true 
                    }))
                }

                setEnemyData(newEnemyArray)
            }, DELAY);
        }
        
    },[ chargeIsZero ])

    // MOVE TO QUIZ MODE
    useEffect(() => {
        if(enemyData.length <=0){
            setCurrentDialogue(emptyDialogue)
            setButtonState(true)
            setGameState((prev: GameStateProps) => ({
                ...prev,
                quizState: true 
            }))
        }
    },[ enemyData ])



    if(mounted)
    return (
        <CombatContainer background={background}>
            <SettingsWidget />

            <StartScreen />
            <ConsumableContainer buttonState={buttonState}/>
            <SpriteContainer>
                <Player>
                {
                    enemyAttack && !parry
                    ? <Hit dmg={enemyData[0]!.dmg}/>
                    : ""
                }
                {
                    parry
                    ? <div id={sprites.shield}></div>
                    : ""
                }
                    <Skills />
                    <HealthBar character={player} />
                </Player>
                {
                    enemyData &&
                    enemyData.map((enemy, idx) => (
                        <EnemySprite key={idx} id={idx} enemy={enemy} />
                    ))
                }
            </SpriteContainer>

            {
                !buttonState ? 
                <AttackButton handleClick={handleClick} buttonState={buttonState} />
                : ""
            }
            <PowerButton buttonState={buttonState}/>
            <CombatDialogue data={currentDialogue} extra={extraDialogue}/>
            <ScoreCounter />
        </CombatContainer>
    )
}
