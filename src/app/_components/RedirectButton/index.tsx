"use client"
import useAudio from "@/app/_hooks/useVolume"
import styles from "./styles.module.scss"
import Link from "next/link"

type RedirectProps = {
    route: string,
    text: string,
}

export default function RedirectButton({route, text}: RedirectProps){

    const { playHoverSound } = useAudio()

    return (
        <>
        {
            route &&
            <Link
            onMouseEnter={() => playHoverSound()}
            className={styles.redirect_button} href={route.toLowerCase()}
            >
                {text}
            </Link>
        }
        </>
    )
}