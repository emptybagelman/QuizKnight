"use client"

import { useEffect, useMemo, useState } from "react";
import CombatDialogue from "../CombatDialogue";
import { type PlayerType, type Enemy, type GameStateProps, type Background, type ConsumableNames, type Consumable } from "@/app/_types/types"
import { useGame } from "../../../GameContext";
import ScoreCounter from "../ScoreCounter";
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
import generateEnemies, { getItemIndex, randomItem } from "@/app/_functions/game_functions";
import HealthBar from "../../Characters/HealthBar";
import Hit from "../../Characters/Hit";
import Skills from "../../Characters/Player/Skills";
import PowerButton from "../../Characters/Player/Skills/PowerButton";
import usePlayer from "@/app/_hooks/usePlayer";
import sprites from "./sprites.module.scss"
import Boss from "../../Characters/Enemy/Boss";
import { BossHealthBar } from "../../Characters/Enemy/Boss/BossHealthBar";
import Quiz from "../../Quiz";
import AutoPlay from "../../AutoPlay";
import useGameFunctions from "@/app/_hooks/useGameFunctions";
import Eneminis from "../Eneminis";
import { CONSTANTS } from "@/app/_functions/CONSTANTS"
import DropScreen from "../DropScreen";
import DeadScreen from "../DeadScreen";
import { useSettings } from "@/app/_components/SettingsContext";

export default function Combat(){
    
    // CONTEXTS AND HOOKS
    const { player, setPlayer, gameState, setGameState} = useGame()
    const { getConsumable, addConsumable, getHitSound, getDeathSound } = useGameFunctions()
    const { setPlayerAttack, playerAttack, enemyAttack, setEnemyAttack, enemyData, setEnemyData, currentDialogue, setCurrentDialogue, buttonState, setButtonState} = useCombat()
    const { updateSkills, updateLootCharge } = usePlayer()
    const { playHitImpactSound, playSwingSound, playHitSound, playBlockSound, playEvadeSound, playFirebombSound } = useAudio()
    const { gameSpeedMultiplier } = useSettings()

    // CONSTANTS & VARIABLES
    const isBoss = gameState.loop % CONSTANTS.BOSS_ROUND === 0 && gameState.loop != 0


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

    const critChance = useMemo(() => chanceEval(player.critical), [playerAttack == true])
    const lootChance = useMemo(() => chanceEval(player.looting), [playerAttack == true])

    const playerTotalDamage = useMemo(() => critChance ? player.dmg * 1.5 : player.dmg , [critChance])

    // STATES
    const [mounted, setMounted] = useState<boolean>(false)
    const [ parry, setParry ] = useState<boolean>(false)
    const [extraDialogue, setExtraDialogue] = useState<string | undefined>(undefined)
    const [background, setBackground] = useState<Background>("default")
    const [powerState, setPowerState] = useState<boolean>(false)
    const [inCombat, setInCombat] = useState<boolean>(false)
    const [deadState, setDeadState] = useState<boolean>(false)

    const [ toggleOpen, setToggleOpen ] = useState<boolean>(false)
    const [ newItems, setNewItems ] = useState<Consumable[]>([])
    

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
        const playerDmgArmour =  Math.ceil(playerTotalDamage * (player.armour > 0 ? CONSTANTS.ARMOUR_REDUCTION_PERCENT : 1))

        if(firstEnemy.armour < playerDmgArmour){
            overflowDmg = Math.abs(firstEnemy.armour - playerDmgArmour)
            enemyHp = firstEnemy.hp - overflowDmg
            firstEnemy.hp = enemyHp
            firstEnemy.armour = 0
        }else{
            firstEnemy.armour = firstEnemy.armour - playerDmgArmour
        }

        setEnemyData(
            (prev: Enemy[]) => {
                const newEnemyData = [...prev]
                newEnemyData[0] = firstEnemy
                return newEnemyData
            })

        if(enemyHp <= 0){ // KILL ENEMY DIALOGUE
            getDeathSound(enemyData[0]?.name)

            // HANDLE IF ENEMY DROPS LOOT
            if(lootChance){
                const randItem: ConsumableNames = randomItem()
                setExtraDialogue(randItem)
                addConsumable(randItem)

                const consumable = getConsumable(randItem)
                const newItemsArr = newItems
                const isInItems = newItemsArr?.filter((item) => item.name === randItem)[0]  ? true : false
                if(!isInItems){

                    setToggleOpen(true)
                    newItemsArr.push(consumable)
                    console.log(newItemsArr);
                    setNewItems(newItemsArr)
                }
                else{
                    setCurrentDialogue({
                        enemy: enemyData[0],
                        active: true,
                        index: 7
                    })
                }
                
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
        getHitSound(firstEnemy.name)
        setTimeout(() => {
            setPlayerAttack(false)
            setBackground("default")

            // WAIT FOR DIALOGUE
            setTimeout(() => {
                setCurrentDialogue(activeEmptyDialogue)
                const firebomb = player.consumables.filter((x) => x.name == "Firebomb")[0]
                
                // HANDLE BURNING FROM FIREBOMB
                if(firebomb && firebomb.charge! > 0 && enemyHp > 0){
                    setTimeout(() => {
                        if(!firebomb) throw new Error("What did you do ?")
                        
    
                        enemyHp -= CONSTANTS.BURN_DMG
                        if(enemyHp <= 0){
                            setCurrentDialogue({
                                enemy: enemyData[0]!,
                                active: true,
                                index: 11
                            })
                        }else{
                            if(isBoss && firstEnemy.name === "Demon Slime"){
                                setCurrentDialogue({
                                    enemy: enemyData[0]!,
                                    active: true,
                                    index: 12
                                })
                            }
                            else{
                                setCurrentDialogue({
                                    enemy: enemyData[0]!,
                                    active: true,
                                    index: 10
                                })
                            }
                            
                        }
    
                        // ENEMY TAKE FIRE DMG
                        playFirebombSound()
                        if(firstEnemy.name != "Demon Slime"){
                            setEnemyData((prev: Enemy[]) => {
                                const newEnemyData = [...prev]
                                newEnemyData[0]!.hp = enemyHp
                                return newEnemyData
                            })
                        }
    
                        updateLootCharge(firebomb,-1)

                        if(player.skills[0]?.active && enemyHp <= 0){
                            updateSkills(0, 10, false)
                        }
                        
                        setTimeout(() => {
                            setCurrentDialogue(activeEmptyDialogue)
                            handleEnemyKill(firstEnemy)
                            moveToQuiz(enemyHp)
                        }, CONSTANTS.DELAY * gameSpeedMultiplier);

                    }, CONSTANTS.ATTACK_TIMEOUT * gameSpeedMultiplier);
                }else{
                    // CHECK IF ENEMY DEAD

                    // EMPTY DIALOGUE BETWEEN MESSAGES

                    // ADD +10 CHARGE ON KILL 
                    if(player.skills[0]?.active){
                        updateSkills(0, 10, false)
                    }
                    handleEnemyKill(firstEnemy)
                    moveToQuiz(enemyHp)
                }
                
            },CONSTANTS.DELAY * gameSpeedMultiplier)

        },CONSTANTS.ATTACK_TIMEOUT * gameSpeedMultiplier)
    }

    function moveToQuiz(enemyHp: number){
            setCurrentDialogue(activeEmptyDialogue)
            setTimeout(() => {
               
                if(enemyHp <= 0){
                    setButtonState(false)
                    setCurrentDialogue(emptyDialogue)
                    setInCombat(false)
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
        
        const enemyDmg = enemyData[0].dmg
        const enemyDmgArmour = Math.ceil(enemyDmg * (player.armour > 0 ? CONSTANTS.ARMOUR_REDUCTION_PERCENT : 1))
        const tempPlayer = player;

        let overflowDmg = 0;

        let newHp = player.hp;
        let newArmour = player.armour;


        if(isBoss) {
            setTimeout(() => {
                setBackground("power_shake")
                
            }, CONSTANTS.ATTACK_TIMEOUT * 1.4 * gameSpeedMultiplier);
        }
        else{
            setBackground("shake")
        }

        const parryChance = Math.random() < player.parry / 100 ? true : false
        setParry(parryChance)

        if(!(parryChance || player.agility == 1)){ // handles no parry
            if(player.armour <= enemyDmgArmour){
                overflowDmg = Math.abs(player.armour - enemyDmgArmour)
                newHp -= overflowDmg
                newArmour = 0
            }else{
                newArmour -= enemyDmgArmour
            }


            setTimeout(() => {
                setPlayer((prev: PlayerType) => ({
                    ...prev,
                    hp: newHp,
                    armour: newArmour
                }))

                if(newHp <= 0){
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

            }, isBoss ? CONSTANTS.ATTACK_TIMEOUT * 1.4 * gameSpeedMultiplier : 0 * gameSpeedMultiplier);
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

        // HIT SOUND
        if(isBoss){
            playHitImpactSound()
        }
        else{
            playHitSound()
        }

        setTimeout(() => {
            playSwingSound()
            getHitSound("Player")
        }, isBoss ? CONSTANTS.ATTACK_TIMEOUT * 1.2 * gameSpeedMultiplier : 0);
            
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
                    setInCombat(false)
                    setDeadState(true)
                }else{
                    setInCombat(false)
                    setCurrentDialogue(emptyDialogue)
                    setButtonState(false) // ENABLE BUTTON
                }
            }, CONSTANTS.DELAY * gameSpeedMultiplier)
        }, isBoss ? CONSTANTS.ATTACK_TIMEOUT * 3 * gameSpeedMultiplier : CONSTANTS.ATTACK_TIMEOUT * gameSpeedMultiplier)
    }

    function handleClick(){
        if(!enemyData[0]) return;
        setButtonState(true) // DISABLES BUTTON DURING COMBAT
        setPlayerAttack(true) // RUNS PLAYER ATTACK
        handlePlayerAttack()
        setInCombat(true)
        
    }

    // USE EFFECTS

    // WAITS FOR GAME TO LOAD
    useEffect(() => {
        setMounted(true)
    },[])

    useEffect(() => {

        function extinguishFire(){
            const firebomb = player.consumables.filter((x) => x.name == "Firebomb")[0]
            if(mounted && firebomb){

                const firebombIdx = getItemIndex(firebomb, player)
                setCurrentDialogue({
                    enemy: enemyData[0]!,
                    active: true,
                    index: 13
                })

                setTimeout(() => {
                    setPlayer((prev: PlayerType) => {
                        const updatedConsumables = [...prev.consumables]
                        updatedConsumables[firebombIdx] = {
                            ...firebomb,
                            charge: 0
                        }
    
                        return {
                            ...prev,
                            consumables: updatedConsumables
                        }
                    })

                    setCurrentDialogue(emptyDialogue)
                }, CONSTANTS.DELAY * gameSpeedMultiplier);
            }
        }

        extinguishFire()
    },[mounted])

    // UPDATE ENEMIES ON POWER MOVE USAGE
    useEffect(() => {
        if(powerState){
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
                setPowerState(false)
                setBackground("default")

                setEnemyData(newEnemyArray)
            }, CONSTANTS.DELAY * gameSpeedMultiplier);
        }
        
    },[ powerState ])

    // MOVE TO QUIZ MODE
    useEffect(() => {
        if(enemyData.length <=0){
            if(gameState.loop === CONSTANTS.BOSS_ROUND){
                setGameState((prev: GameStateProps) => ({
                    ...prev,
                    quizState: true,
                    powerState: true,
                }))
            }else{
                setGameState((prev: GameStateProps) => ({
                    ...prev,
                    quizState: true,
                }))
            }
            setCurrentDialogue(emptyDialogue)
            setButtonState(true)
            
        }
    },[ enemyData ])

    useEffect(() => {
        setEnemyData(generateEnemies(gameState.loop))
    }, [gameState.loop])


    useEffect(() => {
        if(gameState.autoPlay == true && !inCombat ){
            setTimeout(() => {
                handleClick()
            }, 500 * gameSpeedMultiplier);
        }
    },[gameState.autoPlay, inCombat, enemyData])

    if(mounted)
    return (
        <CombatContainer background={background}>
            <SettingsWidget />
            {
                isBoss && enemyData[0] && <BossHealthBar boss={enemyData[0]} />
            }
            <StartScreen />
            <ConsumableContainer buttonState={buttonState}/>
            {
                !isBoss && <Eneminis />
            }
            {
                toggleOpen && <DropScreen item={newItems.slice(-1).pop()} setToggleOpen={setToggleOpen}/>
            }
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
                    {
                        player.skills[0]?.active && <Skills />
                    }
                    <HealthBar character={player} />
                </Player>
                {
                    enemyData &&
                    enemyData.map((enemy, idx) => (
                        
                            gameState.loop % CONSTANTS.BOSS_ROUND != 0 || gameState.loop === 0
                            ? <EnemySprite key={idx} id={idx} enemy={enemy} />
                            : <Boss  key={idx} enemy={enemy}/>
                        
                    ))
                }
            </SpriteContainer>

            {
                !buttonState && <AttackButton handleClick={handleClick} buttonState={buttonState} />
            }
            <PowerButton buttonState={buttonState} setPowerState={setPowerState} />
            <CombatDialogue data={currentDialogue} extra={extraDialogue}/>
            <ScoreCounter />
            <AutoPlay />
            {
                deadState && <DeadScreen />
            }

            {
                gameState.quizState || gameState.questionState 
                ? <Quiz />
                : ""
            }
        </CombatContainer>
    )
}