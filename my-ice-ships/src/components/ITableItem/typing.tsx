export interface ITableItemProps {
    id: number;
    owner: string;
    status: string;
    creationDate: string;
    registrationDate: string;
    completionDate: string;
    date: string;
    start_point: string;
    finish_point: string;
    result: boolean;
    updateListPageFunc: () => void;
}