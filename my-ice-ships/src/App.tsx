import "./App.css";
import {AppRoutes} from "./Routes";
import {useDispatch} from "./core/store";
import {USER_NAME} from "./env.tsx";
import {saveUser} from "./core/store/slices/userSlice.ts";


function App() {
    const dispatch = useDispatch();
    dispatch(
        saveUser({
            username: "",
            isManager: false,
        })
    );

    return (
        <AppRoutes/>
    );
}

export default App;