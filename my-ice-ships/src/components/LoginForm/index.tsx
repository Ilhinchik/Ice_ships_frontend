import {useState} from "react";
import {IUserLoginData} from "./typing.tsx";
import {ChangeEvent} from "../../App.typing.tsx";
import {api} from "../../core/api";
import {store, useDispatch} from "../../core/store";
import {saveUser} from "../../core/store/slices/userSlice.ts";
import {useNavigate} from 'react-router-dom';
import {addNotification} from "../../core/store/slices/appSlice.ts";
import {USER_NAME} from "../../env.tsx";

export const LoginForm = () => {
    const navigate = useNavigate();

    const [loginFormData, setLoginFormData] = useState<IUserLoginData>({
        username: "",
        password: "",
    });

    const handleChange = (event: ChangeEvent) => {
        const {id, value} = event.target;
        setLoginFormData((prevState) => ({...prevState, [id]: value}));
    }

    const dispatch = useDispatch();

    const clickLogIn = () => {
        if (loginFormData.username && loginFormData.password) {
            api.users.usersLoginCreate(loginFormData)
                .then(() => {
                    dispatch(saveUser({username: loginFormData.username, isAuth: true}))
                    localStorage.setItem(USER_NAME, loginFormData.username);
                    store.dispatch(
                        addNotification({
                            message: "Добро пожаловать!",
                            isError: false,
                        })
                    );
                    navigate('/');
                })
                .catch((data) => {
                    if (data.status == 400) {
                        store.dispatch(
                            addNotification({
                                message: "Неверный логин или пароль",
                                isError: true,
                            })
                        );
                    } else {
                        store.dispatch(
                            addNotification({
                                message: "Ошибка сервера",
                                isError: true,
                            })
                        );
                    }
                });
        }
    }

    return (
        <div className="card" style={{width: '100%', maxWidth: '350px'}}>
            <div className="card-body">
                <h5 className="card-title text-center mb-4">Вход</h5>
                <form>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Логин
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            placeholder="Введите логин"
                            value={loginFormData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Пароль
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Введите пароль"
                            value={loginFormData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="button" className="btn dark-blue-btn w-100" onClick={clickLogIn}>
                        Войти
                    </button>
                </form>
            </div>
        </div>
    );
};