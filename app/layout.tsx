import SideBar from "../components/sidebar/SideBar";
import "../styles/layout.scss";
import "../styles/styles.scss";
import React from "react";
import StoreProvider from "../components/store/StoreProvider";

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <StoreProvider>
                <body>
                    <div className="layout-container">
                        <div className="sidebar-container">
                            <SideBar/>
                        </div>

                        <div>{children}</div>
                    </div>
                </body>
            </StoreProvider>
        </html>
    );
}
