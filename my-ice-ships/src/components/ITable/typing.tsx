export interface ITableProps {
    rows: ITableRow[];
}

export interface ITableRow {
    number: number;
    date: string;
    start_point: string;
    finish_point: string;
    status: string;
    creationDate: string;
    registrationDate: string;
    completionDate: string;
    result: boolean;
}