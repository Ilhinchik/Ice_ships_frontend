export interface IShipInIcebreakerCardProps {
    id?: number;
    ship_name: string;
    year?: number | null;
    ice_class?: string | null;
    logoFilePath?: string;
    length?: number | null;
    isEditable: boolean;
    engine?: string | null;
    isrID: string;
    order: number;
    handleClickDelete: (key: number) => void;
    handleUpdateOrder: (shipId: number, direction: "up" | "down") => void;
}