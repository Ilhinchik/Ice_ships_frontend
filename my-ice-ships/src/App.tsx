import "./App.css";
import {AppRoutes} from "./Routes";
import {useDispatch} from "./core/store";
import {USER_NAME} from "./env.tsx";
import {saveUser} from "./core/store/slices/userSlice.ts";


function App() {
    const dispatch = useDispatch();
    const username = localStorage.getItem(USER_NAME);
    const isAuth = !!username;
    dispatch(
        saveUser({
            username: username || "",
            isAuth: isAuth,
        })
    );

    return (
        <AppRoutes/>
    );
}

export default App;