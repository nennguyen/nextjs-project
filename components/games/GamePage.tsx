'use client'

import React, {useEffect, useState} from "react";
import {Game} from "../../interfaces/game";
import { useDebounce } from "usehooks-ts";
import SearchHeader from "../header/SearchHeader";
import GameList from "./GameList";
import { fetchGameList } from "../../data/fetch-game-list.js";
import { useDispatch } from 'react-redux';
import { setLoading } from '../../store/actions.js';
import LoadingOverlay from "../loading-overlay/LoadingOverlay";
import Pagination from "./Pagination";

interface PageProp {
    defaultGames: Game[],
    totalDefaultGames: number,
    category: string,
}

interface GameListResponse {
    items: Game[];
    count: number;
}

const GamePage: React.FC<PageProp> = ({defaultGames, totalDefaultGames, category}) => {
    const [games, setGames] = useState<Game[]>(defaultGames);
    const [totalGames, setTotalGames] = useState(totalDefaultGames);
    const [searchKey, setSearchKey] = useState('');
    const [oldSearchKey, setOldSearchKey] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const debouncedSearchKey = useDebounce<string>(searchKey, 500);
    const dispatch = useDispatch();

    const handleSearch = async (searchKey: string, pageSize: number, pageNumber: number) => {
        dispatch(setLoading(true));
        const response: GameListResponse = await fetchGameList(searchKey, pageSize, pageNumber, category);
        setGames(response.items);
        setTotalGames(response.count);
        dispatch(setLoading(false));
    };

    useEffect(() => {
        if (oldSearchKey !== searchKey) {
            handleSearch(debouncedSearchKey, pageSize, pageNumber);
        }
    }, [debouncedSearchKey])

    const updateSearchKey = (value) => {
        setOldSearchKey(searchKey);
        setSearchKey(value);
        setPageNumber(1);
    };

    const updatePageNumber = (newPageNumber: number) => {
        setPageNumber(newPageNumber);

        handleSearch(debouncedSearchKey, pageSize, newPageNumber);
    };

    const updatePageSize = (newPageSize: number) => {
        setPageSize(newPageSize);
        setPageNumber(1);
        handleSearch(debouncedSearchKey, newPageSize, 1);
    };

    const totalPages = Math.ceil(totalGames / pageSize);

    if (totalGames == 0) {
        return (
            <div>
                <SearchHeader searchKey={searchKey} updateSearchKey={updateSearchKey}/>

                <div className="no-data-found">
                    <strong>No game found</strong>
                </div>
            </div>
        );
    }

    return (
        <div>
            <SearchHeader searchKey={searchKey} updateSearchKey={updateSearchKey}/>

            <GameList games={games}></GameList>

            <Pagination
                pageNumber={pageNumber}
                pageSize={pageSize}
                totalPages={totalPages}
                updatePageNumber={updatePageNumber}
                updatePageSize={updatePageSize}
            />

            <LoadingOverlay/>
        </div>
    );
};

export default GamePage;
