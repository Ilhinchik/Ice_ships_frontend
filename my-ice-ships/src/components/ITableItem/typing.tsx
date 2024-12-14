export interface IISRTableItemProps {
    pk: number;
    client: string;
    status: string;
    creationDate: string;
    registrationDate: string;
    completionDate: string;
    updateListPageFunc: () => void;
}