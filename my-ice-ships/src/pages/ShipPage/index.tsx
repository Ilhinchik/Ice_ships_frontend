import "./index.css";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Container} from "react-bootstrap";

import {shipList as SOFTWARE_LIST_MOCK} from "../../core/mock/shipList.ts";
import unknownImage from "/images/unknown.png"
import {Breadcrumbs} from "../../components/Breadcrumbs";
import {Ship} from "../../core/api/Api.ts";
import {api} from "../../core/api";
import { useLocation } from "react-router-dom";


export const ShipPage = () => {
    const {id} = useParams();
    const [shipData, setShipData] = useState<Ship | null>(null);

    const location = useLocation();
    const isFromShipList = location.pathname.includes("/ships_list");
    const isFromApplications = location.pathname.includes("/ship_list");


    useEffect(() => {
        if (id) {
            api.ships.shipsRead(id)
                .then((data) => {
                    setShipData(data.data);
                })
                .catch(() => {
                    const ship = SOFTWARE_LIST_MOCK.find(
                        (ship) => ship.id === Number(id)
                    );
                    setShipData(ship || null);
                });
        }
    }, [id]);

    if (!shipData || !shipData.ship_name) {
        return (
            <>
            </>
        );
    }

    return (
        <Container className="div">
            <Breadcrumbs
                middleItems={[
                    {
                        name: isFromShipList ? "Каталог" : isFromApplications ? "Список кораблей" : "Главная", 
                        link: isFromShipList ? "/ships_list" : isFromApplications ? "/ship_list" : "/"
                    }
                ]}
                endItem={shipData?.ship_name}
            />
            <div className=" row d-flex flex-row-reverse mt-4">
                <div className="col-md-5">   
                        <img src={shipData?.image ? (shipData?.image) : (unknownImage)}
                             alt={shipData?.ship_name}
                             width="300px"/>
                        
                    </div>
                    <div className="col-md-7 mt-4 mt-md-0">
                        <h2>{shipData?.ship_name}</h2>
                        <p className=""><strong>Год создания: </strong> {shipData?.year}</p>
                        <p className=""><strong>Ледовый класс:</strong> {shipData?.ice_class}
                        </p>
                        <p className=""><strong>Длина:</strong> {shipData?.length} м </p>
                        <p className=""><strong>Двигатель:</strong> {shipData?.engine} </p>
                        <p className=""><strong>Описание:</strong> {shipData?.description}</p>
                    </div>               
                
                    </div>
        </Container>
    );
};