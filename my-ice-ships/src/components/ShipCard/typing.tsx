export interface IShipCardProps {
    id: number;
    title: string;
    summary: string;
    price: number;
    logoFilePath: string;
    updateCatalogPageFunc: () => void;
}