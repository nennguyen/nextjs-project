import React from 'react';
import "../../styles/heaeder.scss";

interface HeaderProps {
    searchKey: string,
    updateSearchKey: (searchKey: string) => void,
}

const SearchHeader: React.FC<HeaderProps> = ({searchKey, updateSearchKey}) => {
    return (
        <div className="search-header">
            <input
                className="search-input"
                placeholder={"Search your games"}
                onChange={(event) => {
                    updateSearchKey(event.target.value);
                }}
                defaultValue={searchKey}
            />
        </div>
    );
};

export default SearchHeader;
