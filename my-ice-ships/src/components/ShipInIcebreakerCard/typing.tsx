export interface ISoftwareInRequestCardProps {
    id?: number;
    title: string;
    summary: string;
    price: number;
    logoFilePath?: string;
    version: string;
    isEditable: boolean;
    isrID: string;
    handleClickDelete: (key: number) => void;
    handleUpdateVersion: (key: number, value: string) => void;
}