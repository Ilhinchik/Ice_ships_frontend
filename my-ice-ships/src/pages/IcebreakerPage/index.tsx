import "./IcebreakerPage.css";
import { Container } from "react-bootstrap";
import { ShipInIcebreakerCard } from "../../components/ShipInIcebreakerCard";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { useIcebreakerPage } from "./useIcebreakerPage";



export const IcebreakerPage = () => {
    const {
        IcebreakerData,
        isEditable,
        id,
        handleClickDelete,
        handleClearClick,
        handleFormClick,
        moveCard,
        date,
        setDate,
        start_point,
        setstart_point,
        finish_point,
        setfinish_point
    } = useIcebreakerPage();

    return (
        <Container className="mb-4">
            <Breadcrumbs
                middleItems={[
                    {
                        name: isEditable ? "Каталог" : "Все заявки",
                        link: isEditable ? "/ships_list" : "/icebreakers_list",
                    },
                ]}
                endItem={`Заявка на проводку № ${IcebreakerData?.id}`}
            />
            <h2 className="mb-4">ЗАЯВКА № {IcebreakerData?.id}</h2>
            
            
            <div className="column justify-content-center mb-3">
            {!isEditable && (
                <>
                <div className="col-12 col-md-4 offset-md-4">
                <h5 id="date" className="form-control-plaintext">Дата проводки: {IcebreakerData?.date ? new Date(IcebreakerData.date).toLocaleDateString("ru-RU") : "Дата не указана"}</h5>
            </div>
            <div className="col-12 col-md-4 offset-md-4">
                <h5 id="start_point" className="form-control-plaintext">Начальная точка проводки: {IcebreakerData?.start_point}</h5>
            </div>
            <div className="col-12 col-md-4 offset-md-4">
                <h5 id="finish_point" className="form-control-plaintext">Конечная точка проводки: {IcebreakerData?.finish_point}</h5>
            </div>
                </>
            )}
            {isEditable && (
                <>
    <div className="col-12 col-md-4 offset-md-4">
        <label htmlFor="date" className="form-label">Дата:</label>
        <input
            type="date"
            id="date"
            className="form-control form-control-sm"
            value={date}
            onChange={(e) => setDate(e.target.value)}
        />
    </div>
    <div className="col-12 col-md-4 offset-md-4">
        <label htmlFor="start_point" className="form-label">Начальная точка:</label>
        <input
            type="text"
            id="start_point"
            className="form-control form-control-sm"
            value={start_point}
            onChange={(e) => setstart_point(e.target.value)}
        />
    </div>
    <div className="col-12 col-md-4 offset-md-4">
        <label htmlFor="finish_point" className="form-label">Конечная точка:</label>
        <input
            type="text"
            id="finish_point"
            className="form-control form-control-sm"
            value={finish_point}
            onChange={(e) => setfinish_point(e.target.value)}
        />
    </div>
    </>
    )}
</div>


<h4>Корабли в заявке</h4>

            {IcebreakerData?.ship_list?.length ? (
                IcebreakerData.ship_list.map((ship, index) => (
                    <ShipInIcebreakerCard
                        key={index}
                        id={ship.ship.id}
                        ship_name={ship.ship.ship_name}
                        ice_class={ship.ship.ice_class}
                        logoFilePath={ship.ship.image}
                        length={ship.ship.length}
                        isEditable={isEditable}
                        isrID={id || ""}
                        order={ship.order}
                        handleClickDelete={handleClickDelete}
                        handleUpdateOrder={moveCard}
                    />
                ))
            ) : (
                <p>Нет данных для отображения.</p>
            )}
            
            {isEditable && (
                <div className="d-flex justify-content-center">
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
