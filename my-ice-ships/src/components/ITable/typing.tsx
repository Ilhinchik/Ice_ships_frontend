export interface ITableProps {
    rows: ITableRow[];
}

export interface ITableRow {
    number: number;
    status: string;
    creationDate: string;
    registrationDate: string;
    completionDate: string;
}