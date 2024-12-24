import {ChangeEvent, ClickEvent} from "../../App.typing";

export interface IFiltersProps {
    selectedStatus?: string;
    selectedStartDate?: string;
    selectedEndDate?: string;
    selectedAuthor?: string;
    handleAuthorChange: (e: ChangeEvent) => void;
    handleStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleStartDateChange: (e: ChangeEvent) => void;
    handleEndDateChange: (e: ChangeEvent) => void;
    handleFilterIClick: (e: ClickEvent) => void;
}