import styles from "./styles.module.scss"
import Link from "next/link"

type RedirectProps = {
    route?: string
    text: string
}

export default function RedirectButton({route, text}: RedirectProps){
    return (
        <>
        {
            route &&
            <Link className={styles.redirect_button} href={route.toLowerCase()}>
                {text}
            </Link>
        }
        </>
    )
}