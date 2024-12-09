import React, {useEffect, useState} from "react";
import {IFiltersProps} from "../../components/IFilters/typing.tsx";
import {ITableProps, ITableRow} from "../../components/ITable/typing.tsx";
import {api} from "../../core/api/index.ts";
import {Icebreaker} from "../../core/api/Api.ts";
import {
    IcebreakersList as ICEBREAKERS_LIST_MOCK
} from "../../core/mock/IcebreakersList.ts";
import {useDispatch, useSelector} from "../../core/store/index.ts";
import {selectApp} from "../../core/store/slices/selectors.ts";
import {
    saveFilterIEndDate,
    saveFilterIStartDate,
    saveFilterIStatus
} from "../../core/store/slices/appSlice.ts";

export const useIcebreakersListPage = () => {
    const [tableProps, setTableProps] = useState<ITableProps>({rows: []});

    const {filterIStatus, filterIStartDate, filterIEndDate} = useSelector(selectApp);
    const dispatch = useDispatch();

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(saveFilterIStatus(event.target.value))
    };

    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(saveFilterIStartDate(event.target.value))
    };

    const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(saveFilterIEndDate(event.target.value))
    };

    const handleFilterIClick = () => {
        api.icebreakers.icebreakersList(
            {
                status: mapStringToOptQueryParam(filterIStatus),
                formation_start: mapStringToOptQueryParam(filterIStartDate),
                formation_end: mapStringToOptQueryParam(filterIEndDate),
            })
            .then((data) => {
                setTableProps(mapBackendResultToTableData(data.data))
            })
            .catch(() => {
                setTableProps(
                    mapBackendResultToTableData(
                        filterDataOnFront(ICEBREAKERS_LIST_MOCK,
                            mapStringToOptQueryParam(filterIStatus),
                            mapStringToOptQueryParam(filterIStartDate),
                            mapStringToOptQueryParam(filterIEndDate))
                    )
                );
            })
    };

    useEffect(handleFilterIClick,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []);

    const filtersProps: IFiltersProps = {
        selectedStatus: filterIStatus,
        selectedStartDate: filterIStartDate,
        selectedEndDate: filterIEndDate,

        handleStatusChange: handleStatusChange,
        handleStartDateChange: handleStartDateChange,
        handleEndDateChange: handleEndDateChange,
        handleFilterIClick: handleFilterIClick,
    };

    const b: boolean = false;

    return {tableProps, filtersProps, b};
};

function mapStringToOptQueryParam(str?: string): string | undefined {
    if (str == "") {
        return undefined;
    }
    return str;
}

function mapStatusToTable(status?: string): string {
    switch (status) {
        case "FORMED":
            return "В работе";
        case "COMPLETED":
            return "Завершена";
        case "REJECTED":
            return "Отклонена";
        default:
            return "Неизвестный";
    }
}

function convertDatetimeToDDMMYYYY(dateString: string | null | undefined): string {
    if (!dateString) return "";

    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
}

export function mapBackendResultToTableData(requests: Icebreaker[]): ITableProps {
    const rows: ITableRow[] = requests.map((request) => {
        return {
            number: request.id || 0,
            status: mapStatusToTable(request.status),
            creationDate: convertDatetimeToDDMMYYYY(request.date_created),
            registrationDate: convertDatetimeToDDMMYYYY(request.date_formation),
            completionDate: convertDatetimeToDDMMYYYY(request.date_complete),
        };
    });

    return {rows};
}

export function filterDataOnFront(
    installSoftwareRequestsList: Icebreaker[],
    filterStatus?: string,
    filterStartDate?: string,
    filterEndDate?: string
): Icebreaker[] {
    return installSoftwareRequestsList.filter((row) => {
        let matchesStatus = true;
        let matchesStartDate = true;
        let matchesEndDate = true;

        if (filterStatus) {
            matchesStatus = row.status === filterStatus;
        }

        if (filterStartDate && row.date_formation) {
            matchesStartDate = new Date(row.date_formation) >= new Date(filterStartDate);
        }

        if (filterEndDate && row.date_formation) {
            matchesEndDate = new Date(row.date_formation) <= new Date(filterEndDate);
        }

        return matchesStatus && matchesStartDate && matchesEndDate;
    })
}