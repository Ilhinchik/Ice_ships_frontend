import "./index.css";
import {Link} from "react-router-dom";

import {Button, Container} from "react-bootstrap";
import {ShipCard} from "../../components/ShipCard";
import {useShipsListPage} from "./useShipsListPage.tsx";
import {IShipCardProps} from "../../components/ShipCard/typing.tsx";
import cartImage from "/images/cart.png"
import {Breadcrumbs} from "../../components/Breadcrumbs";
import {LoadingAnimation} from "../../components/LoadingAnimation";

export const ShipsListPage = () => {
    const {
        shipList,
        ISRId,
        itemsInCart,
        searchShipTitle,
        isPageActive,
        updateCatalogPageFunc,
        handleSearchShipClick,
        handleSearchNameChange,
    } = useShipsListPage();

    return (
        <Container className="mb-4">
            <Breadcrumbs
                endItem="Каталог"
            />
            <div className="d-flex mt-4 mb-4 p-0">
                <div className="flex-grow-1">
                    <input
                        type="text"
                        className="input form-control"
                        onChange={handleSearchNameChange}
                        placeholder="Поиск"
                        aria-label="Поиск"
                        value={searchShipTitle}
                    />
                </div>
                <div className="px-3">
                    <Button
                        onClick={handleSearchShipClick}
                        className="dark-blue-btn ml-3 mr-3"
                    >
                        Поиск
                    </Button>
                </div>

                <Link
                    to={"/icebreaker/" + ISRId}
                    className={ISRId !== undefined && ISRId !== null && ISRId !== 0 ? "btn dark-blue-border cart-button" : "btn cart-button non-clickable"}
                    state={{from: ISRId}}
                >
                    {itemsInCart}
                    <img src={cartImage} width="25" alt="cart"/>
                </Link>
            </div>

            {
                isPageActive ?
                    <>
                        {shipList && !!shipList.length ? (
                            <div className="row row-cols-1 row-cols-md-2
                    row-cols-lg-4 g-4">
                                {shipList.map((ship, index) => {
                                    const props: IShipCardProps = {
                                        id: ship.id || 0,
                                        ship_name: ship.ship_name,
                                        ice_class: ship.ice_class,
                                        length: ship.length,
                                        logoFilePath: ship.image,
                                        engine: ship.engine,
                                        updateCatalogPageFunc: updateCatalogPageFunc,
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
                    </>
                    :
                    <>
                        <LoadingAnimation></LoadingAnimation>
                    </>
            }

        </Container>
    );
};