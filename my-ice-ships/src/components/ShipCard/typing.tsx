export interface IShipCardProps {
    id: number;
    ship_name: string;
    ice_class?: string;
    length?: number | null;
    engine?: string;
    logoFilePath?: string;
    updateCatalogPageFunc: () => void;
}