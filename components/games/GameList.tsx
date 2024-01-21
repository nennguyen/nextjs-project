import React from "react";
import {Game} from "../../interfaces/game";
import "../../styles/game-list.scss";

interface GameListProp {
    games: Game[],
}

const GameList: React.FC<GameListProp> = ({games}) => {
    return (
        <div className="game-list">
            {games.map((game) => (
                <div
                    key={game.id}
                    className="game-container"
                >
                    <img
                        src={game.image.original.src}
                        alt={game.gameText}
                    />
                    <div style={{padding: '0 10px'}}>
                        <strong>{game.gameText}</strong>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GameList;
