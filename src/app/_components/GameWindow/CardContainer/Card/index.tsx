import { Card } from "@/app/_types/types";
import {  getRandomUpgrade } from "@/server/actions/categoryActions";
import styles from "@/styles/components/GameWindow/CardContainer/Card/styles.module.scss"
import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import CardClientComponent from "./clientComponent";

        
export default function CardComponent(
    {card, refetch}
    :
    {card: Card, refetch: any}){

    const {data, error} = useQuery({
        queryFn: getRandomUpgrade,
        queryKey: ["randomUpgrade",card.category?.id],
    })

    if(error) return <p>{error.message}</p>;
    if(data)
    return (
        <CardClientComponent card={card} data={data} refetch={refetch}/>
    )
}