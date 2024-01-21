import React from "react";
import axios from "axios";
import Link from "next/link";
import "../../styles/sidebar.scss";
import Categories from "./categories/Categories";
import {Category} from "../../interfaces/category";
import Logo from "./Logo";

interface SidebarLink {
    text: string,
    pagePath: string,
}

function SidebarLinks({sidebarLinks}) {
    return (
        <div>
            {sidebarLinks.map((link, index) => (
                <div key={index}>
                    <Link
                        href={link.pagePath}
                        className="sidebar-link-container"
                    >
                        <span>{link.text}</span>
                    </Link>
                </div>
            ))}
        </div>
    );
}

const SideBar: React.FC = async () => {
    const fetchGameConfig = async () => {
        try {
            const apiUrl = 'https://casino.api.stg.kansino.nl/v1/kansino/en/config';
            const response = await axios.get(apiUrl);

            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const resp = await fetchGameConfig();

    const sidebarLinks:SidebarLink[] = resp.sidebarLinks;
    const logoUrl = resp.footerContent.logoUrl;
    const lobbyCategories: Category[] = resp.menu.lobby.items;
    const liveLobbyCategories: Category[] = resp.menu.liveLobby.items;

    return (
        <div className="sidebar-layout">
            <Logo logoUrl={logoUrl}/>

            <Categories groupName={"Lobby"} categories={lobbyCategories}/>

            <Categories groupName={"Live Lobby"} categories={liveLobbyCategories}/>

            <SidebarLinks sidebarLinks={sidebarLinks}/>
        </div>
    );
}

export default SideBar;
