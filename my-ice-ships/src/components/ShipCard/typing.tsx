export interface IShipCardProps {
    id: number;
    year: number;
    ship_name: string;
    ice_class?: string;
    length?: number | null ;
    engine?: string;
    image?: string | null;
    updateCatalogPageFunc: () => void;
}