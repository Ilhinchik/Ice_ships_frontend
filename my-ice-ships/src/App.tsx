import "./App.css";
import {  BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./Routes";
import { useGlobalProps } from "./hooks/useGlobalProps";
import {Provider} from "react-redux";
import {store} from "./core/store";

import {useEffect} from "react";

const {invoke} = (window as any).__TAURI__.tauri;

function App() {

    useEffect(() => {
        invoke('tauri', {cmd: 'create'})
            .then((response: any) => console.log(response))
            .catch((error: any) => console.log(error));
        return () => {
            invoke('tauri', {cmd: 'close'})
                .then((response: any) => console.log(response))
                .catch((error: any) => console.log(error));
        }
    }, []);
    

    const globalProps = useGlobalProps();

    return (
        <BrowserRouter basename="/Ice_ships_frontend">
            <Provider store={store}>
                <AppRoutes {...globalProps} />
            </Provider>
        </BrowserRouter>
    );
}

export default App;