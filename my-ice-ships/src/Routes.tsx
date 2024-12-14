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
import {NotFoundPage} from "./pages/NotFoundPage";
import {ForbiddenPage} from "./pages/ForbiddenPage";
import {ManagerPageFirewall} from "./components/ManagerPageFirewall";
import {ShipEditPage} from "./pages/ShipEditPage";
import {ShipListPage} from "./pages/ShipListPage";


export const AppRoutes = () => {
    const routes: RouteObject[] = [
        {
            element: <MainLayout/>,
            children: [
                

                        {
                            path: "/icebreaker/:id",
                            element: <IcebreakerPage/>,
                        },
                        {
                            path: "/icebreakers_list",
                            element: <IcebreakersListPage/>,
                        },
                        {
                            element: <ManagerPageFirewall/>,
                            children: [
                                {
                                    path: "/edit_ship/:id",
                                    element: <ShipEditPage/>,
                                },
                                {
                                    path: "/add_ship",
                                    element: <ShipEditPage/>,
                                },
                                {
                                    path: "/ship_list",
                                    element: <ShipListPage/>,
                                },
                            ],
                        },
                    
                
                {
                    path: "/",
                    element: <HomePage/>,
                },
                {
                    path: "/ships_list",
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
                {
                    path: "/forbidden",
                    element: <ForbiddenPage/>,
                },
                {
                    path: "*",
                    element: <NotFoundPage/>,
                },
            ],
        },


    ];

    const routeResult = useRoutes(routes);

    return <>{routeResult}</>;
};