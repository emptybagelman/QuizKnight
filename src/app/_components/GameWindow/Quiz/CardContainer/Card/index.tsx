import { type Card } from "@/app/_types/types";
import {  getRandomUpgrade } from "@/server/actions/categoryActions";
import { type QueryObserverResult, type RefetchOptions, useQuery } from "@tanstack/react-query";
import CardClientComponent from "./clientComponent";

        
export default function CardComponent(
    {card, refetch}
    :
    {card: Card, refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<Card[], Error>>}){

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