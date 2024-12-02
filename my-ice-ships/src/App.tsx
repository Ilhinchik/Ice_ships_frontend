import "./App.css";
import {  BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./Routes";
import { useGlobalProps } from "./hooks/useGlobalProps";

function App() {

    const globalProps = useGlobalProps();

    return (
        <BrowserRouter basename="/Ice_ships_frontend">
            <AppRoutes {...globalProps} />
        </BrowserRouter>
    );
}

export default App;