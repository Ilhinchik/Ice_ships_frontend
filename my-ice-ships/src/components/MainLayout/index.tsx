import React from "react";
import "./MainLayout.css";
import {Outlet} from "react-router-dom";
import {Navbar} from "../Navbar";
import {NotificationBar} from "../NotificationBar";
import {Container} from "react-bootstrap";

export const MainLayout: React.FC = () => {
    return (
        <>
            <Navbar/>
            {/* <Container>
                <NotificationBar/>
            </Container> */}
            <Outlet/>
        </>
    );
};