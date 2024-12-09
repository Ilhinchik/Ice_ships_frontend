import {useState} from "react";
import {IUserSignUpData} from "./typing.tsx";
import {ChangeEvent} from "../../App.typing.tsx";
import {api} from "../../core/api";
import {useNavigate} from "react-router-dom";
import {store} from "../../core/store";
import {addNotification} from "../../core/store/slices/appSlice.ts";

export const RegistrationForm = () => {
    const navigate = useNavigate();

    const [loginFormData, setLoginFormData] = useState<IUserSignUpData>({
        username: "",
        password: "",
    });

    const handleChange = (event: ChangeEvent) => {
        const {id, value} = event.target;
        setLoginFormData((prevState) => ({...prevState, [id]: value}));
    }

    const clickSignUp = () => {
        if (loginFormData.username && loginFormData.password) {
            api.users.usersRegisterCreate(loginFormData)
                .then(() => {
                    store.dispatch(
                        addNotification({
                            message: "Вы успешно зарегистрировались. Войдите",
                            isError: false,
                        })
                    );
                    navigate('/login');
                })
                .catch((data) => {
                    if (data.status == 400) {
                        store.dispatch(
                            addNotification({
                                message: "Пользователь с указанным логином уже существует",
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
                <h5 className="card-title text-center mb-4">Регистрация</h5>
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
                    <button type="button" className="btn dark-blue-btn w-100" onClick={clickSignUp}>
                        Зарегистрироваться
                    </button>
                </form>
            </div>
        </div>
    );
};