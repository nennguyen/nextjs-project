import React from 'react';
import {Game} from "../../../interfaces/game";
import { fetchGameList } from "../../../data/fetch-game-list.js";
import GamePage from "../../../components/games/GamePage";
import {GameListResponse} from "../../../interfaces/game-list-response";

export default async function Page({ params }: { params: { lobbyType: string, category: string } }) {
    const response:GameListResponse = await fetchGameList(null, null, null, params.category);

    const defaultGames: Game[] = response.items;
    const totalDefaultGames: number = response.count;

    return (
        <main>
            <GamePage defaultGames={defaultGames} totalDefaultGames={totalDefaultGames} category={params.category}/>
        </main>
    );
}
