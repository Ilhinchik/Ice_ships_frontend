import "./index.css"
import {FC} from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavbarComp from "react-bootstrap/Navbar";
import {Link, NavLink} from "react-router-dom";
import {selectUser} from "../../core/store/slices/selectors.ts";
import {store, useDispatch, useSelector} from "../../core/store";
import {api} from "../../core/api";
import {refreshUser} from "../../core/store/slices/userSlice.ts";
import {addNotification} from "../../core/store/slices/appSlice.ts";
import {USER_NAME} from "../../env.tsx";

export const Navbar: FC = () => {
    const {isAuth, username} = useSelector(selectUser);

    const dispatch = useDispatch();

    const logout = () => {
        api.users.usersLogoutCreate()
            .then(() => {
            })
            .catch(() => {
            });
        localStorage.removeItem(USER_NAME)
        store.dispatch(
            addNotification({
                message: "Вы вышли из аккаунта",
                isError: false,
            })
        );
        dispatch(refreshUser())
    }
    return (
        <>
            <NavbarComp expand="lg"
                        data-bs-theme="dark"
                        className="dark-blue-back"
            >
                <Container>
                    <NavbarComp.Brand>
                        <Link to="/" className="text-white text-decoration-none">
                            Установка ПО
                        </Link>
                    </NavbarComp.Brand>
                    <NavbarComp.Toggle
                        aria-controls="basic-navbar-nav"
                        className="outline-none"
                    />
                    <NavbarComp.Collapse id="basic-navbar-nav">
                        <Nav className="me-3">
                            <NavLink to="/ships_list" className="text-white text-decoration-none">
                                Каталог
                            </NavLink>
                        </Nav>

                        {isAuth ? (
                            <Nav className="me-3">
                                <NavLink to="/ships_list"
                                         className="text-white text-decoration-none">
                                    Заявки
                                </NavLink>
                            </Nav>
                        ) : (
                            <></>
                        )}
                    </NavbarComp.Collapse>

                    <NavbarComp.Collapse className="justify-content-end">
                        {isAuth ? (
                            <>
                                <Nav className="me-3">
                                    <NavLink to="/user_account" className="text-white text-decoration-none">
                                        {username}
                                    </NavLink>
                                </Nav>
                                <Nav className="me-3">
                                    <NavLink to="/" onClick={logout} className="text-white text-decoration-none">
                                        Выход
                                    </NavLink>
                                </Nav>
                            </>
                        ) : (
                            <>
                                <Nav className="me-3">
                                    <NavLink to="/registration" className="text-white text-decoration-none">
                                        Регистрация
                                    </NavLink>
                                </Nav>
                                <Nav className="me-3">
                                    <NavLink to="/login" className="text-white text-decoration-none">
                                        Вход
                                    </NavLink>
                                </Nav>
                            </>
                        )}
                    </NavbarComp.Collapse>
                </Container>
            </NavbarComp>
        </>
    );
};