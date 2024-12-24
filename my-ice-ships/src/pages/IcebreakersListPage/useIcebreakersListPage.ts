import React, {useEffect, useState} from "react";
import {IFiltersProps} from "../../components/IFilters/typing.tsx";
import {ITableProps, ITableRow} from "../../components/ITable/typing.tsx";
import {api} from "../../core/api";
import {Icebreaker} from "../../core/api/Api.ts";
import {useDispatch, useSelector} from "../../core/store";
import {selectApp} from "../../core/store/slices/selectors.ts";
import {
    saveFilterISRAuthor,
    saveFilterIEndDate,
    saveFilterIStartDate,
    saveFilterIStatus
} from "../../core/store/slices/appSlice.ts";
import {useNavigate} from "react-router-dom";
import {store} from "../../core/store";
import {addNotification} from "../../core/store/slices/appSlice.ts";

export const useIcebreakersListPage = () => {
    const [tableProps, setTableProps] = useState<ITableProps>({
        rows: [], updateListPageFunc: () => {
        }
    });

    const {filterISRAuthor, filterIStatus, filterIStartDate, filterIEndDate} = useSelector(selectApp);
    const dispatch = useDispatch();

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(saveFilterIStatus(event.target.value))
    };

    const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(saveFilterISRAuthor(event.target.value))
    };

    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(saveFilterIStartDate(event.target.value))
    };

    const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(saveFilterIEndDate(event.target.value))
    };

    const navigate = useNavigate();

    const handleFilterIClick = () => {
        api.icebreakers.icebreakersList(
            {
                status: mapStringToOptQueryParam(filterIStatus),
                formation_start: mapStringToOptQueryParam(filterIStartDate),
                formation_end: mapStringToOptQueryParam(filterIEndDate),
            })
            .then((data) => {
                setTableProps(
                    {
                        rows: filterAndConvertData(data.data, filterISRAuthor),
                        updateListPageFunc: handleFilterIClick,
                    })
            })
            .catch((data) => {
                    if (data.status == 403) {
                      navigate("/forbidden")
                    } else {
                        store.dispatch(
                            addNotification({
                                message: "Ошибка сервера",
                                isError: true,
                            })
                        );
                    }
                }
            )
    };

    useEffect(() => {
        let id = setTimeout(handleFilterIClick, 2000);
        return () => clearTimeout(id);
    });

    useEffect(handleFilterIClick,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []);

    const filtersProps: IFiltersProps = {
        selectedStatus: filterIStatus,
        selectedStartDate: filterIStartDate,
        selectedEndDate: filterIEndDate,
        selectedAuthor: filterISRAuthor,
        handleAuthorChange: handleAuthorChange,
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

export function filterAndConvertData(requests: Icebreaker[], clientFilter: string | undefined): ITableRow[] {
    const filteredRequests = clientFilter
        ? requests.filter((request) => request.owner === clientFilter)
        : requests;

    return filteredRequests.map((request) => {
        return {
            number: request.id || 0,
            owner: request.owner || "",
            status: mapStatusToTable(request.status),
            creationDate: convertDatetimeToDDMMYYYY(request.date_created),
            registrationDate: convertDatetimeToDDMMYYYY(request.date_formation),
            completionDate: convertDatetimeToDDMMYYYY(request.date_complete),
            date: request.date,
            start_point: request.start_point,
            finish_point: request.finish_point,
            result: request.result
        };
    });
}

export function filterMockData(
    icebreakersList: Icebreaker[],
    filterStatus?: string,
    filterStartDate?: string,
    filterEndDate?: string
): Icebreaker[] {
    return icebreakersList.filter((row) => {
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
