/* eslint-disable @typescript-eslint/no-explicit-any */

import dynamic from "next/dynamic";

const TypeWriterEffect: any = dynamic(
    () => import("react-typewriter-effect"),
    {ssr: false}
)

export default function Typewriter({text,multiplier}:{text:string | undefined,multiplier: number}){
    if(typeof window !== undefined){
        return (
            <TypeWriterEffect 
                textStyle={{
                    letterSpacing: "1.6px",
                    fontSize: "1em",
                    textAlign: "center" 
                }}
                startDelay={0}
                text={text }
                typeSpeed={50 * multiplier}
            />
        )
    }
}