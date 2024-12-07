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
                            message: "ПО удалено из заявки",
                            isError: false,
                        })
                    );
                    ship.handleClickDelete(ship?.id || 0)
                }
            )
            .catch(() => {
                    store.dispatch(
                        addNotification({
                            message: "Ошибка удаления ПО из заявки",
                            isError: true,
                        })
                    );
                }
            )
    };

    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-2 card-body">
                    <img
                        src={ship.logoFilePath ? (ship.logoFilePath) : (unknownImage)}
                        className="img-fluid rounded-start"
                        alt={ship.ship_name}
                        width="100px"
                    />
                </div>
                <div className="col-md-6 card-body">
                    <h5 className="card-title">
                        <Link
                            to={"/ship/" + ship.id}
                            id={ship.ship_name}
                            className="text-black text-decoration-none"
                            state={{from: ship.ship_name}}
                        >
                            {ship.ship_name}
                        </Link>
                    </h5>
                </div>
                <div className="col-md-2 card-body">
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Версия</span>
                        {/* {
                            ship.isEditable ?
                                <input
                                    type="text"
                                    className="input form-control"
                                    aria-label={ship.id?.toString()}
                                    value={version}
                                    onChange={handleChangeVersion}
                                />
                                :
                                <input
                                    type="text"
                                    className="input form-control"
                                    aria-label="host"
                                    value={version}
                                    readOnly
                                />
                        } */}
                    </div>
                </div>
                <div className="col-md-1 card-body">
                    <p className="card-text"><strong>{ship.length} руб.</strong></p>
                </div>


                <div className="col-md-1 card-body close-col">
                    {/* {
                        ship.isEditable ?
                            <button
                                type="button"
                                className="btn-close mt-1"
                                aria-label="Close"
                                onClick={handleDeleteClick}
                            ></button>
                            :
                            <></>
                    } */}
                </div>
            </div>
        </div>
    );
};