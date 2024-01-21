import React from 'react';
import { fetchGameList } from "../data/fetch-game-list.js";
import GamePage from "../components/games/GamePage";

export default async function Page() {
    const response = await fetchGameList(null, 12, 1, null);
    const defaultGames = response.items;
    const totalDefaultGames: number = response.count;

    return (
        <main>
            <GamePage defaultGames={defaultGames} totalDefaultGames={totalDefaultGames}/>
        </main>
    );
};
