import "./InstallSoftwareRequestsListPage.css";
import {Container} from 'react-bootstrap';
import {IFilters} from "../../components/IFilters/index.tsx";
import {useIcebreakersListPage} from "./useIcebreakersListPage.ts";
import {ITable} from "../../components/ITable/index.tsx";


export const IcebreakersListPage = () => {
    const {tableProps, filtersProps} =
        useIcebreakersListPage();

    return (
        <Container>
            <h1 className="m-3">Заявки</h1>
            <IFilters {...filtersProps}></IFilters>
            <div className="m-3">
                <ITable {...tableProps}></ITable>
            </div>
        </Container>
    );
};