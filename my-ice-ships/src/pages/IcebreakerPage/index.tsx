import "./IcebreakerPage.css";
import { Container } from "react-bootstrap";
import { ShipInIcebreakerCard } from "../../components/ShipInIcebreakerCard";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { useIcebreakerPage } from "./useIcebreakerPage";

function calculateTotalPrice(shipItems?: any[]): number {
    return shipItems?.reduce((total, item) => {
        return total + (item.ship?.price || 0);
    }, 0) || 0;
}

export const IcebreakerPage = () => {
    const {
        IcebreakerData,
        isEditable,
        id,
        updVersion,
        handleClickDelete,
        handleClearClick,
        handleFormClick,
    } = useIcebreakerPage();

    return (
        <Container className="mb-4">
            <Breadcrumbs
                middleItems={[
                    {
                        name: "Каталог",
                        link: "/ship_catalog",
                    },
                ]}
                endItem={`Заказ на установку ПО № ${IcebreakerData?.id}`}
            />
            {IcebreakerData?.ship_list?.length ? (
                IcebreakerData.ship_list.map((ship, index) => (
                    <ShipInIcebreakerCard
                        key={index}
                        id={ship.ship.id}
                        ship_name={ship.ship.ship_name}
                        year={ship.ship.year}
                        ice_class={ship.ship.ice_class}
                        logoFilePath={ship.ship.image}
                        length={ship.ship.length}
                        engine={ship.ship.engine}
                        isEditable={isEditable}
                        isrID={id || ""}
                        handleClickDelete={handleClickDelete}
                        handleUpdateVersion={updVersion}
                    />
                ))
            ) : (
                <p>Нет данных для отображения.</p>
            )}
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-10">
                        <div className="card-body">
                            <h5 className="card-title">ИТОГО:</h5>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="card-body">
                            <strong>{calculateTotalPrice(IcebreakerData?.ship_list)} руб.</strong>
                        </div>
                    </div>
                </div>
            </div>
            {isEditable && (
                <div className="d-flex justify-content-end">
                    <button type="button" className="btn dark-blue-border me-3" onClick={handleClearClick}>
                        Очистить
                    </button>
                    <button type="button" className="btn dark-blue-btn" onClick={handleFormClick}>
                        Оформить
                    </button>
                </div>
            )}
        </Container>
    );
};
