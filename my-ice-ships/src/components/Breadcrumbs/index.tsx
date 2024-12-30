import "./index.css";
import {FC} from "react";
import {IBreadcrumbs} from "./typing.tsx";
import {Link} from "react-router-dom";

import TrafficLight1 from "../TrafficLight1";

export const Breadcrumbs: FC<IBreadcrumbs> = (props) => {
    const {
        endItem,
    } = props;

    return ( 
        <nav aria-label="breadcrumb" className="mt-4">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to={"/"} className="text-black">Главная</Link></li>
                {props.middleItems && !!props.middleItems.length ? (
                    <>
                        {props.middleItems.map((item) => {
                            return (
                                <li className="breadcrumb-item"><Link to={item.link} className="text-black">{item.name}</Link></li>
                            );
                        })
                        }
                    </>
                ) : (<></>)}
                <li className="breadcrumb-item active" aria-current="page">{endItem}</li>
            </ol>
            
        </nav>
        
    );
};