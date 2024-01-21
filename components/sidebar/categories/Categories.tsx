'use client'

import React, {useState} from "react";
import "../../../styles/category.scss";
import {Category} from "../../../interfaces/category";
import {useRouter} from 'next/navigation';
import Icon from '@mdi/react';
import {mdiMenuDown, mdiMenuUp} from '@mdi/js';

interface CategoryProp {
    groupName: string,
    categories: Category[],
}

const toCamelCase = (value) => {
    return value
        .replace(/\s(.)/g, function (a) {
            return a.toUpperCase();
        })
        .replace(/\s/g, '')
        .replace(/^(.)/, function (b) {
            return b.toLowerCase();
        });
}

const Categories: React.FC<CategoryProp> = ({groupName, categories}) => {
    const router = useRouter();

    const [isExpand, setIsExpand] = useState(true);

    function toggleExpansion() {
        setIsExpand(!isExpand);
    }

    return (
        <div className="categories-container">
            <div
                className="category-group"
                onClick={() => toggleExpansion()}
            >
                <strong>{groupName}</strong>

                <Icon path={isExpand ? mdiMenuUp : mdiMenuDown} size={1}/>
            </div>

            {isExpand && categories.map((category) => buildCategories(category, router, groupName))}
        </div>
    );
}

const buildCategories = (category, router, groupName) => {
    const lobbyUrlName = groupName === "Lobby" ? "lobby" : "live-lobby";

    return (
        <div
            key={category.id}
            onClick={() => router.push(`/${lobbyUrlName}/${toCamelCase(category.name)}`)}
            className="category"
        >
            {category.image && category.image.original && <img
              src={category.image.original.src}
              alt={category.image.alt}
              style={{width: '20px', height: '20px'}}
            />}
            <div style={{padding: '0 10px'}}>
                <span>{category.name}</span>
            </div>
        </div>
    )
}

export default Categories;
