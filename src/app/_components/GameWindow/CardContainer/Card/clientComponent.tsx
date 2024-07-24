"use client"

import { type Card, type Upgrade } from "@/app/_types/types"
import styles from "@/styles/components/GameWindow/CardContainer/Card/styles.module.scss"
import { useGame } from "@/app/_components/GameContext"
import { type QueryObserverResult, type RefetchOptions } from "@tanstack/react-query"

export default function CardClientComponent(
    {card, data, refetch}
    :
    {card: Card, data: Upgrade, refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<Card[], Error>>}){

    const { setDisplayQuestionState, setCurrentCard, setCurrentUpgrade } = useGame()

    async function handleCardClick(){
        setCurrentUpgrade(data)
        setCurrentCard(card)
        setDisplayQuestionState(true)
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
            onClick={handleCardClick}
        >

            <div className={styles.difficulty}>
                {card.question.difficulty}
            </div>

            <h2>{card.category?.category}</h2>

            <div className={styles.card_info}>
                <p className={styles.buff}>{data?.name} +{data?.default_value + increaseBonus()}</p>
                <p className={styles.buff_desc}>{data?.description}</p>
            </div>
        </div>
        </>
    )
}