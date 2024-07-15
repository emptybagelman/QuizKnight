// import { getAllCategories, getRandomThreeCategories } from "@/server/actions/categoryActions"
import styles from "@/styles/components/GameWindow/CardContainer/styles.module.scss"
import { getRandomThreeCards } from "@/server/actions/categoryActions"
import { useQuery } from "@tanstack/react-query"
import { LoadingSpinner } from "../../Icons"
import CardComponent from "./Card"
import { Card } from "@/app/_types/types"

export default function CardContainer(){

    const {data, error, isLoading, refetch} = useQuery({
        queryFn: getRandomThreeCards,
        queryKey: ["categories"],
        
    })

    if(error) return <p>{error.message}</p>
    if(isLoading) return <LoadingSpinner />
    
    if(data){
        return (
            <div className={styles.card_container}>
                {
                    data &&
                    data.map((card: Card, idx: number) => (
                        <CardComponent key={idx} card={card} refetch={refetch}/>
                    ))
                }
            </div>
        )
    }
}