import {FC} from "react";
import {IShipCardProps} from "./typing.tsx";
import unknownImage from "/images/unknown.png"
import {Link} from "react-router-dom";
import {store, useSelector} from "../../core/store";
import {selectUser} from "../../core/store/slices/selectors.ts";
import {api} from "../../core/api";
import {addNotification} from "../../core/store/slices/appSlice.ts";
import "./index.css"

export const ShipCard: FC<IShipCardProps> = (ship: IShipCardProps) => {
    const {isAuth} = useSelector(selectUser);

    const clickAddItem = () => {
        api.ships.shipsAddToIcebreakerCreate(ship.id.toString())
            .then(() => {
                ship.updateCatalogPageFunc();
                store.dispatch(
                    addNotification({
                        message: "Корабль добавлен в заявку на установку",
                        isError: false,
                    })
                );
            })
            .catch((data) => {
                    if (data.status == 400) {
                        store.dispatch(
                            addNotification({
                                message: "Корабль уже добавлен в заявку",
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
        <div className="row">
        <div className="col-md-12 col-lg-12">
        <div className="card ship-card">
            <div className="row">
            <div className="col-md-5"> 
            <img
                src={ship.image ? (ship.image) : (unknownImage)}
                className="card-img-top ship-card-img"
                alt={ship.ship_name}
            />
            </div>
            <div className="col-md-7">
            <div className="card-body">
                <h4 className="card-title">{ship.ship_name}</h4>
            
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"></li>
                        <li className="list-group-item">
                            <strong>Ледовый класс:</strong> {ship.ice_class}
                        </li>
                        <li className="list-group-item">
                            <strong>Двигатель:</strong> {ship.engine}
                        </li>
                    </ul>
                <Link
                    to={"/ship/" + ship.id}
                    id={ship.ship_name}
                    className="btn dark-blue-btn me-2"
                    state={{from: ship.ship_name}}
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
            </div>
            </div>
        </div>
        </div>
        
    );
};