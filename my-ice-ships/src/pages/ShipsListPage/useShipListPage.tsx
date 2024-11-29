import {useEffect, useState} from "react";
import {IShip} from "../../core/api/ship/typing.tsx";
import {getShipList} from "../../core/api/ship";
import {selectApp} from "../../core/store/slices/selectors";
import {useSelector, useDispatch} from "../../core/store";

import {shipList as SHIP_LIST_MOCK} from "../../core/mock/shipList.ts";

import {ChangeEvent} from "../../App.typing.tsx";
import {saveSearchShipTitle} from "../../core/store/slices/appSlice.ts";

export const useShipCatalogPage = () => {
    const [shipList, setShipList] = useState<IShip[]>([]);
    const installShipIcebreakerId = 0;
    const itemsInCart = 0;

    const {searchShipTitle} = useSelector(selectApp);
    const dispatch = useDispatch();

    const handleSearchShipClick = () => {
        getShipList(searchShipTitle)
            .then((data) => {
                setShipList(data.ships);
            })
            .catch(() => {
                const filteredShip = SHIP_LIST_MOCK.filter((ship) =>
                    ship.ship_name.toLowerCase().startsWith(searchShipTitle.toLowerCase())
                );
                setShipList(filteredShip);
            });
    };

    const handleSearchNameChange = (e: ChangeEvent) => {
        dispatch(saveSearchShipTitle(e.target.value));
    };

    useEffect(() => {
        getShipList()
            .then((data) => {
                setShipList(data.ships);
            })
            .catch(() => {
                const filteredShip = SHIP_LIST_MOCK.filter((ship) =>
                    ship.ship_name.toLowerCase().startsWith(searchShipTitle.toLowerCase())
                );
                setShipList(filteredShip);
            });
    }, []);

    return {
        shipList,
        installShipIcebreakerId,
        itemsInCart,
        searchShipTitle,
        handleSearchShipClick,
        handleSearchNameChange,
    };
};