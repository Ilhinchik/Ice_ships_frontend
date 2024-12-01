import {RouteObject, useRoutes} from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {ShipsListPage} from "./pages/ShipsListPage";
import {ShipPage} from "./pages/ShipPage";
import {IcebreakerPage} from "./pages/IcebreakerPage";
import {RegistrationPage} from "./pages/RegistrationPage";
import {LoginPage} from "./pages/LoginPage";
import {UserAccountPage} from "./pages/UserAccountPage";
import {IcebreakersListPage} from "./pages/IcebreakersListPage";
import {MainLayout} from "./components/MainLayout";
import {PrivatePageFirewall} from "./components/PrivatePageFirewall";

export const AppRoutes = () => {
    const routes: RouteObject[] = [
        {
            element: <MainLayout/>,
            children: [
                {
                    element: <PrivatePageFirewall/>,
                    children: [
                        {
                            path: "/icebreaker/:id",
                            element: <IcebreakerPage/>,
                        },
                        {
                            path: "/icebreakers_list",
                            element: <IcebreakersListPage/>,
                        },
                    ],
                },
                {
                    path: "/",
                    element: <HomePage/>,
                },
                {
                    path: "/ship_list",
                    element: <ShipsListPage/>,
                },
                {
                    path: "/ship/:id",
                    element: <ShipPage/>,
                },
                {
                    path: "/registration",
                    element: <RegistrationPage/>,
                },
                {
                    path: "/login",
                    element: <LoginPage/>,
                },
                {
                    path: "/user_account",
                    element: <UserAccountPage/>,
                },
            ],
        },


    ];

    const routeResult = useRoutes(routes);

    return <>{routeResult}</>;
};