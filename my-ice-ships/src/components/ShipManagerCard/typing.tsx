export interface IShipManagerCardProps {
    id: number;
    ship_name?: string | undefined;
    length?: number | null;
    ice_class?: string | undefined;
    image?: string | null;
    year: number;
    updateCatalogPageFunc: () => void;
}