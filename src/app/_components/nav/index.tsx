import styles from "./styles.module.scss"
import Image from "next/image"
import logo from "@/app/assets/logo.png"
import Link from "next/link"

export default function Nav(){

    return (
        <nav className={styles.nav_wrapper}>
            <Link href="/">
                <Image id={styles.logo_image} src={logo} alt="GeoKnight" />
            </Link>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                    <Link href="/play">Play</Link>
                    <Link href="/scoreboard">Scoreboard</Link>
                </li>
            </ul>
        </nav>
    )
}