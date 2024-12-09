import {FC, useEffect, useState} from "react";
import {IShipInIcebreakerCardProps} from "./typing.tsx";
import unknownImage from "/images/unknown.png"
import {Link} from "react-router-dom";
import {ChangeEvent} from "../../App.typing.tsx";
import {api} from "../../core/api";
import {store} from "../../core/store";
import {addNotification} from "../../core/store/slices/appSlice.ts";

export const ShipInIcebreakerCard: FC<IShipInIcebreakerCardProps> = (ship: IShipInIcebreakerCardProps) => {
    const [order, setOrder] = useState<number>();

    const handleOrderChange = (direction: "up" | "down") => {
        api.icebreakers.icebreakersUpdateShipUpdate(ship.isrID, ship.id?.toString() || "", {
            direction: direction,
        })
        .then(() => {
            store.dispatch(
                addNotification({
                    message: `Корабль перемещён ${direction === "up" ? "вверх" : "вниз"}.`,
                    isError: false,
                })
            );
            // Обновляем данные после изменения порядка
            ship.handleUpdateOrder(ship.id!, "up");
        })
        .catch(() => {
            store.dispatch(
                addNotification({
                    message: `Ошибка перемещения корабля ${direction === "up" ? "вверх" : "вниз"}.`,
                    isError: true,
                })
            );
        });
    };

    // const handleChangeVersion = (e: ChangeEvent) => {
    //     setOrder(e.target.value)
    //     ship.handleUpdateVersion(ship.id || 0, e.target.value)
    // };

    // useEffect(() => {
    //     setVersion(ship.version)
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    const handleDeleteClick = () => {
        api.icebreakers.icebreakersDeleteShipDelete(ship.isrID, ship.id?.toString() || "")
            .then(() => {
                    store.dispatch(
                        addNotification({
                            message: "Корабль удален из заявки",
                            isError: false,
                        })
                    );
                    ship.handleClickDelete(ship?.id || 0)
                }
            )
            .catch(() => {
                    store.dispatch(
                        addNotification({
                            message: "Ошибка удаления корабля из заявки",
                            isError: true,
                        })
                    );
                }
            )
    };

    return (
        <div className="row justify-content-center mb-3">
            <div className="card col-md-8">
                <div className="row g-0">
                    <div className="col-md-4 card-body">
                        <img
                            src={ship.logoFilePath ? ship.logoFilePath : unknownImage}
                            className="img-fluid rounded-start"
                            alt={ship.ship_name}
                            width="200px"
                        />
                    </div>
                    <div className="col-md-4 card-body">
                        <h5 className="card-title">
                            <Link
                                to={`/ship/${ship.id}`}
                                id={ship.ship_name}
                                className="text-black text-decoration-none"
                                state={{ from: ship.ship_name }}
                            >
                                {ship.ship_name}
                            </Link>
                        </h5>
                        <p className="card-text"><strong>Ледовый класс: </strong>{ship.ice_class}</p>
                        <p className="card-text"><strong>Длина: </strong>{ship.length} м</p>
                        
                    </div>
                    <div className="col-md-2 card-body d-flex flex-column align-items-center justify-content-around">
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleOrderChange("up")}
                            disabled={ship.order === 1} // Блокируем кнопку, если это первый корабль
                        >
                            ⬆ Вверх
                        </button>
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleOrderChange("down")}
                        >
                            ⬇ Вниз
                        </button>
                    </div>
                    <div className="col-md-1 card-body close-col">
                        <button
                            type="button"
                            className="btn-close mt-1"
                            aria-label="Close"
                            onClick={handleDeleteClick}
                        ></button>
                    </div>
                </div>
            </div>
        </div>
    );
};