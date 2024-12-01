import {FC} from "react";
import {IShipCardProps} from "./typing.tsx";
import unknownImage from "/unknown.jpg"
import {Link} from "react-router-dom";
import {store, useSelector} from "../../core/store";
import {selectUser} from "../../core/store/slices/selectors.ts";
import {api} from "../../core/api";
import {addNotification} from "../../core/store/slices/appSlice.ts";

export const ShipCard: FC<IShipCardProps> = (ship: IShipCardProps) => {
    const {isAuth} = useSelector(selectUser);

    const clickAddItem = () => {
        api.ships.shipAddCreate(ship.id.toString())
            .then(() => {
                ship.updateCatalogPageFunc();
                store.dispatch(
                    addNotification({
                        message: "ПО добавлено в заявку на установку",
                        isError: false,
                    })
                );
            })
            .catch((data) => {
                    if (data.status == 400) {
                        store.dispatch(
                            addNotification({
                                message: "ПО уже добавлено в заявку",
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
                }
            )
    };

    return (
        <div className="card h-100">
            <img
                src={ship.logoFilePath ? (ship.logoFilePath) : (unknownImage)}
                className="card-img-top ship-card-img"
                alt={ship.title}
            />
            <div className="card-body">
                <h5 className="card-title">{ship.title}</h5>
                <p className="card-text">{ship.summary}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    Цена: <strong>{ship.price} руб.</strong>
                </li>
            </ul>
            <div className="card-footer d-flex justify-content-between">
                <Link
                    to={"/ship/" + ship.id}
                    id={ship.title}
                    className="btn dark-blue-btn"
                    state={{from: ship.title}}
                >
                    Узнать подробнее
                </Link>

                {
                    isAuth ?
                        <button
                            className="btn dark-blue-border"
                            onClick={clickAddItem}
                        >
                            Добавить
                        </button>
                        :
                        <></>
                }
            </div>
        </div>
    );
};