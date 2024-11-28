import "./index.css"
import {FC} from "react";
import {IShipCardProps} from "./typing.tsx";
import unknownImage from "/images/unknown.png"
import {Link} from "react-router-dom";

export const ShipCard: FC<IShipCardProps> = (ship: IShipCardProps) => {
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
                    <h5 className="card-title">{ship.ship_name}</h5>

                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <strong>Длина:</strong> {ship.length} м
                            
                        </li>
                        <li className="list-group-item">
                            <strong>Ледовый класс:</strong> {ship.ice_class}
                        </li>
                        <li className="list-group-item">
                            <strong>Двигатель:</strong> {ship.engine}
                        </li>
                    </ul>
                    <Link
                        to={"/ships/" + ship.id}
                        id={ship.ship_name} 
                        className="btn dark-blue-btn"
                        state={{from: ship.ship_name}}
                    >
                        Подробнее
                    </Link>
                </div>
            </div>
        </div>
        </div>
        </div>
        </div>
    );
};