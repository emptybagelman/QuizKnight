import Head from "next/head";

export default function GameAssets() {
    return (
        <Head>
            <link rel="preload" href="#/knight_idle.png" as="image"/>
            <link rel="preload" href="#/knight_attack.png" as="image"/>
            <link rel="preload" href="#/knight_death.png" as="image"/>
            <link rel="preload" href="#/knight_hit.png" as="image"/>

            <link rel="preload" href="#/goblin_idle.png" as="image"/>
            <link rel="preload" href="#/goblin_attack.png" as="image"/>
            <link rel="preload" href="#/goblin_death.png" as="image"/>
            <link rel="preload" href="#/goblin_hit.png" as="image"/>

            <link rel="preload" href="#/mushroom_idle.png" as="image"/>
            <link rel="preload" href="#/mushroom_attack.png" as="image"/>
            <link rel="preload" href="#/mushroom_death.png" as="image"/>
            <link rel="preload" href="#/mushroom_hit.png" as="image"/>

            <link rel="preload" href="#/skeleton_idle.png" as="image"/>
            <link rel="preload" href="#/skeleton_attack.png" as="image"/>
            <link rel="preload" href="#/skeleton_death.png" as="image"/>
            <link rel="preload" href="#/skeleton_hit.png" as="image"/>

            <link rel="preload" href="#/eye_idle.png" as="image"/>
            <link rel="preload" href="#/eye_attack.png" as="image"/>
            <link rel="preload" href="#/eye_death.png" as="image"/>
            <link rel="preload" href="#/eye_hit.png" as="image"/>

            <link rel="preload" href="#/health_potion.png" as="image"/>
            <link rel="preload" href="#/mana_potion.png" as="image"/>
            <link rel="preload" href="#/agility_crystal.png" as="image"/>
            <link rel="preload" href="#/shield.png" as="image"/>

        </Head>
    )
}