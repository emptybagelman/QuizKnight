"use client"

import { useRouter } from "next/navigation"
import { Return } from "../Icons"
import styles from "./styles.module.scss"

type BackProps = {
    route?: string
}

export default function BackButton({route}: BackProps) {
    const router = useRouter()

    return (
        <>
            {
                route
                ? <button className={styles.back_button} onClick={() => router.push(`/${route}`)}>Back<Return /> </button>
                : <button className={styles.back_button}  onClick={() => router.push("/")}>Home <Return /> </button>
            }
        </>
    )
}