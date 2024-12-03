import "./index.css";
import {FC} from "react";
import {IShipCatalogPageProps} from "./typing";
// import {Link} from "react-router-dom";

import {Navbar} from "../../components/Navbar";
import {Button, Container} from "react-bootstrap";
import {ShipCard} from "../../components/ShipCard";
import {useShipCatalogPage} from "./useShipListPage.tsx";
import {IShipCardProps} from "../../components/ShipCard/typing.tsx";
// import cartImage from "/images/folder.png"
import {Breadcrumbs} from "../../components/Breadcrumbs";

export const ShipCatalogPage: FC<IShipCatalogPageProps> = () => {
    const {
        shipList,
        // installShipIcebreakerId,
        // itemsInCart,
        searchShipTitle,
        handleSearchShipClick,
        handleSearchNameChange,
    } = useShipCatalogPage();

    return (
        <>
            <Navbar/>
            <Container>
                <Breadcrumbs
                    endItem="Каталог"
                />
                <Container className="d-flex mt-4 mb-4 p-0">
                    <div className="flex-grow-1">
                        <input
                            type="text"
                            className="input form-control"
                            onChange={handleSearchNameChange}
                            placeholder="Найти"
                            aria-label="Найти"
                            value={searchShipTitle}
                        />

                    </div>
                    <div className="px-3">
                        <Button
                            onClick={handleSearchShipClick}
                            className="dark-blue-btn ml-3 mr-3"
                        >
                            Найти
                        </Button>
                    </div>

                    {/* <Link
                        to={"/icebreakers/" + installShipIcebreakerId}
                        className={installShipIcebreakerId !== undefined && installShipIcebreakerId !== null && installShipIcebreakerId !== 0 ? "btn dark-blue-border cart-button" : "btn dark-blue-border cart-button non-clickable"}
                        state={{from: installShipIcebreakerId}}
                    >
                        {itemsInCart}
                        <img src={cartImage} width="25" alt="cart"/>
                    </Link> */}
                </Container>

                {shipList && !!shipList.length ? (
                    <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2 g-4">
                        {shipList.map((ship, index) => {
                            const props: IShipCardProps = {
                                id: ship.id,
                                ship_name: ship.ship_name,
                                ice_class: ship.ice_class,
                                length: ship.length,
                                image: ship.image,
                                engine: ship.engine
                            };

                            return (
                                <div className="col">
                                    <ShipCard key={index} {...props} />
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <Container className="d-flex justify-content-center mt-4 mb-5">
                        <h2>Ничего не найдено</h2>
                    </Container>
                )}
            </Container>
        </>
    );
};