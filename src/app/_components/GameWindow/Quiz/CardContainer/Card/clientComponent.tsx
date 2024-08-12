"use client"

import { type GameStateProps, type Card, type Upgrade } from "@/app/_types/types"
import styles from "./styles.module.scss"
import { useGame } from "@/app/_components/GameContext"
import { type QueryObserverResult, type RefetchOptions } from "@tanstack/react-query"
import useSound from "use-sound"
import { audio } from "@/app/assets/sounds"

export default function CardClientComponent(
    {card, data, refetch}
    :
    {card: Card, data: Upgrade, refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<Card[], Error>>}){

    const { setGameState } = useGame();

    const [playHoverSound] = useSound(audio.hover)
    const [playSelectSound] = useSound(audio.select)

    async function handleCardClick(){

        setGameState((prev: GameStateProps) => ({
            ...prev,
            currentUpgrade: data,
            currentCard: card,
            questionState: true
        }))

        await refetch()
    }

    function increaseBonus(){
        switch (card.question.difficulty) {
            case "easy":
                return 0
            case "medium":
                return 1
            case "hard":
                return 2
            default:
                return 0;
        }
    }

    return (
        <>
        <div
            className={styles.card_wrapper}
            content={card.category?.category}
            onClick={() => {
                handleCardClick()
                    .then(() => "")
                    .catch(() => new Error("fiddlesticks!"))
                playSelectSound()
            }}
            onMouseEnter={() => playHoverSound()}
        >

            <div className={styles.difficulty}>
                {card.question.difficulty}
            </div>

            <h2>{card.category?.category}</h2>

            <div className={styles.card_info}>
                <p className={styles.buff}>{data?.name} +{data?.default_value + increaseBonus()}{data.name === "Critical Chance" || data.name === "Parry" ? "%" : ""}</p>
                <p className={styles.buff_desc}>{data?.description}</p>
            </div>
        </div>
        </>
    )
}