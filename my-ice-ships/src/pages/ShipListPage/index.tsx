import "./ShipListPage.css";
import {Link} from "react-router-dom";

import {Button, Container} from "react-bootstrap";
import {useShipListPage} from "./useShipListPage.tsx";
import {IShipCardProps} from "../../components/ShipCard/typing.tsx";
import {Breadcrumbs} from "../../components/Breadcrumbs";
import {LoadingAnimation} from "../../components/LoadingAnimation";
import {ShipManagerCard} from "../../components/ShipManagerCard";

export const ShipListPage = () => {
    const {
        shipList,
        searchInListShipTitle,
        isPageActive,
        updateCatalogPageFunc,
        handleSearchShipClick,
        handleSearchNameChange,
    } = useShipListPage();


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
                        value={searchInListShipTitle}
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
            </div>

            {
                isPageActive ?
                    <>

                        {shipList && !!shipList.length ? (
                            <div>
                                {shipList.map((ship, index) => {
                                    const props: IShipCardProps = {
                                        id: ship.id || 0,
                                        ship_name: ship.ship_name,
                                        ice_class: ship.ice_class,
                                        length: ship.length,
                                        engine: ship.engine,
                                        image: ship.image || "",
                                        updateCatalogPageFunc: updateCatalogPageFunc,
                                    };

                                    return (
                                        <ShipManagerCard key={index} {...props} />
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

            <div className="d-flex justify-content-end">
                <Link
                    to={"/add_ship/"}
                    className="btn dark-blue-btn"
                >
                    Добавить ПО
                </Link>
            </div>
        </Container>
    );
};