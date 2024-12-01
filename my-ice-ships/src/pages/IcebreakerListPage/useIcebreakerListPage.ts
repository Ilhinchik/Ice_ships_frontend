import React, {useEffect, useState} from "react";
import {IISRFiltersProps} from "../../components/ISRFilters/typing.tsx";
import {IISRTableProps, IISRTableRow} from "../../components/ISRTable/typing.tsx";
import {api} from "../../core/api";
import {InstallSoftwareRequest} from "../../core/api/Api.ts";
import {
    installSoftwareRequestsList as INSTALL_SOFTWARE_REQUESTS_LIST_MOCK
} from "../../core/mock/installSoftwareRequestsList.ts";
import {useDispatch, useSelector} from "../../core/store";
import {selectApp} from "../../core/store/slices/selectors.ts";
import {
    saveFilterISREndDate,
    saveFilterISRStartDate,
    saveFilterISRStatus
} from "../../core/store/slices/appSlice.ts";

export const useInstallSoftwareRequestsListPage = () => {
    const [tableProps, setTableProps] = useState<IISRTableProps>({rows: []});

    const {filterISRStatus, filterISRStartDate, filterISREndDate} = useSelector(selectApp);
    const dispatch = useDispatch();

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(saveFilterISRStatus(event.target.value))
    };

    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(saveFilterISRStartDate(event.target.value))
    };

    const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(saveFilterISREndDate(event.target.value))
    };

    const handleFilterISRClick = () => {
        api.installSoftwareRequests.installSoftwareRequestsList(
            {
                status: mapStringToOptQueryParam(filterISRStatus),
                formation_start: mapStringToOptQueryParam(filterISRStartDate),
                formation_end: mapStringToOptQueryParam(filterISREndDate),
            })
            .then((data) => {
                setTableProps(mapBackendResultToTableData(data.data))
            })
            .catch(() => {
                setTableProps(
                    mapBackendResultToTableData(
                        filterDataOnFront(INSTALL_SOFTWARE_REQUESTS_LIST_MOCK,
                            mapStringToOptQueryParam(filterISRStatus),
                            mapStringToOptQueryParam(filterISRStartDate),
                            mapStringToOptQueryParam(filterISREndDate))
                    )
                );
            })
    };

    useEffect(handleFilterISRClick,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []);

    const filtersProps: IISRFiltersProps = {
        selectedStatus: filterISRStatus,
        selectedStartDate: filterISRStartDate,
        selectedEndDate: filterISREndDate,

        handleStatusChange: handleStatusChange,
        handleStartDateChange: handleStartDateChange,
        handleEndDateChange: handleEndDateChange,
        handleFilterISRClick: handleFilterISRClick,
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

export function mapBackendResultToTableData(requests: InstallSoftwareRequest[]): IISRTableProps {
    const rows: IISRTableRow[] = requests.map((request) => {
        return {
            number: request.pk || 0,
            status: mapStatusToTable(request.status),
            creationDate: convertDatetimeToDDMMYYYY(request.creation_datetime),
            registrationDate: convertDatetimeToDDMMYYYY(request.formation_datetime),
            completionDate: convertDatetimeToDDMMYYYY(request.completion_datetime),
        };
    });

    return {rows};
}

export function filterDataOnFront(
    installSoftwareRequestsList: InstallSoftwareRequest[],
    filterStatus?: string,
    filterStartDate?: string,
    filterEndDate?: string
): InstallSoftwareRequest[] {
    return installSoftwareRequestsList.filter((row) => {
        let matchesStatus = true;
        let matchesStartDate = true;
        let matchesEndDate = true;

        if (filterStatus) {
            matchesStatus = row.status === filterStatus;
        }

        if (filterStartDate && row.formation_datetime) {
            matchesStartDate = new Date(row.formation_datetime) >= new Date(filterStartDate);
        }

        if (filterEndDate && row.formation_datetime) {
            matchesEndDate = new Date(row.formation_datetime) <= new Date(filterEndDate);
        }

        return matchesStatus && matchesStartDate && matchesEndDate;
    })
}