export interface ITableProps {
    rows: ITableRow[];
    updateListPageFunc: () => void;
}

export interface ITableRow {
    number: number;
    date: string | null | undefined;  // Измените на string | null | undefined
    start_point: string | null | undefined;
    finish_point: string | null | undefined;
    result: boolean | null | undefined;
    status: string;
    creationDate: string;
    registrationDate: string;
    completionDate: string;
    owner: string;
}