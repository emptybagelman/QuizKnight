/* eslint-disable @typescript-eslint/no-explicit-any */

import dynamic from "next/dynamic";

const TypeWriterEffect: any = dynamic(
    () => import("react-typewriter-effect"),
    {ssr: false}
)

export default function Typewriter({text}:{text:string | undefined}){
    if(typeof window !== undefined){
        return (
            <TypeWriterEffect 
                textStyle={{
                    fontFamily: "__MedievalSharp_ba6bb8', '__MedievalSharp_Fallback_ba6bb8",
                    fontSize: "1rem",
                    fontWeight: "normal",
                    textAlign: "center" 
                }}
                startDelay={0}
                text={text }
                typeSpeed={50}
            />
        )
    }
}