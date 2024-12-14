import {FC} from "react";
import {IShipManagerCardProps} from "./typing.tsx";
import unknownImage from "/images/unknown.png"
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {api} from "../../core/api";
import {store} from "../../core/store";
import {addNotification} from "../../core/store/slices/appSlice.ts";

export const ShipManagerCard: FC<IShipManagerCardProps> = (ship: IShipManagerCardProps) => {
    const handleClickDelete = () => {
        api.ships.shipsDeleteDelete(ship.id.toString())
            .then(() => {
                store.dispatch(
                    addNotification({
                        message: "ПО удалено",
                        isError: false,
                    })
                );
                ship.updateCatalogPageFunc()
            })
            .catch(() => {
                    store.dispatch(
                        addNotification({
                            message: "Ошибка удаления ПО",
                            isError: true,
                        })
                    );
                }
            )
    }

    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-2 card-body">
                    <img
                        src={ship.image ? (ship.image) : (unknownImage)}
                        className="img-fluid rounded-start"
                        alt={ship.ship_name}
                        width="100px"
                    />
                </div>
                <div className="col-md-4 card-body">
                    <h5 className="card-title">
                        <Link
                            to={"/ship/" + ship.id}
                            id={ship.ship_name}
                            className="text-black"
                            state={{from: ship.ship_name}}
                        >
                            {ship.ship_name}
                        </Link>
                    </h5>
                </div>
                <div className="col-md-1 card-body">
                    <p className="card-text"><strong>Ледовый класс: {ship.ice_class}</strong></p>
                </div>
                <div className="col-md-1 card-body">

                    <Link
                        to={"/edit_ship/" + ship.id}
                        className="btn dark-blue-btn"
                    >
                        Редактировать
                    </Link>
                </div>
                <div className="col-md-1 card-body">
                    <Button
                        className="white-bg dark-blue-border"
                        onClick={handleClickDelete}
                    >
                        Удалить
                    </Button></div>
            </div>
        </div>

    );
};