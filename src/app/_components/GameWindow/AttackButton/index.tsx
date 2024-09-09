import useAudio from "@/app/_hooks/useVolume";
import styles from "./styles.module.scss";
import { useGame } from "../../GameContext";
import { PauseIcon } from "../../Icons";

export default function AttackButton(
    {
        handleClick,
        buttonState,
    }:{
        handleClick:React.MouseEventHandler<HTMLAnchorElement>,
        buttonState: boolean
    }) {

    const { playHoverSound } = useAudio()
    const { gameState } = useGame()

    return (
        <a
            onClick={handleClick}
            onMouseEnter={() => playHoverSound()}
            className={styles.attack_button}
            style={ buttonState || gameState.autoPlay ? {pointerEvents:"none"} : {} }
            >
                { gameState.autoPlay ? <PauseIcon /> : "Attack" }
        </a>
    )
}