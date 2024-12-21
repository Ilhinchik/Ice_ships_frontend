import "./App.css";
import {AppRoutes} from "./Routes";
import {useDispatch} from "./core/store";
import {USER_NAME} from "./env.tsx";
import {saveUser} from "./core/store/slices/userSlice.ts";


function App() {
    const dispatch = useDispatch();
    const username = localStorage.getItem(USER_NAME);
    dispatch(
        saveUser({
            username: username || "",
            isManager: false,
        })
    );

    return (
        <AppRoutes/>
    );
}

export default App;