import {useEffect, useState} from "react";
import {selectApp} from "../../core/store/slices/selectors.ts";
import {useDispatch, useSelector} from "../../core/store/index.ts";
import {api} from "../../core/api/index.ts";

import {shipList as SOFTWARE_LIST_MOCK} from "../../core/mock/shipList.ts";
import {OIcebreaker as INSTALL_ICEBREAKER_MOCK} from "../../core/mock/Icebreaker.ts";

import {ChangeEvent} from "../../App.typing.tsx";
import {saveSearchShipTitle} from "../../core/store/slices/appSlice.ts";
import {Ship} from "../../core/api/Api.ts";


export const useShipsListPage = () => {
    const [shipList, setShipList] = useState<Ship[]>([]);
    const [itemsInCart, setItemsInCart] = useState<number>(0);
    const [isPageActive, setIsPageActive] = useState(false);
    const [ISRId, setISRId] = useState(1);
    const {searchShipTitle} = useSelector(selectApp);
    const dispatch = useDispatch();

    const handleSearchShipClick = () => {
        setIsPageActive(false)
        api.ships.shipsList({ship_name: searchShipTitle})
            .then((data) => {
                setShipList(data.data.ship);
                // dispatch(saveISRId(data.data.install_ship_request_id || 0))
                setISRId(data.data.install_ship_request_id || 0)
                setItemsInCart(data.data?.items_in_cart || 0)
                setIsPageActive(true)
            })
            .catch(() => {
                const filteredShip = SOFTWARE_LIST_MOCK.filter((ship) =>
                    ship.ship_name.toLowerCase().startsWith(searchShipTitle.toLowerCase())
                );
                setShipList(filteredShip);
                setISRId(1)
                setItemsInCart(INSTALL_ICEBREAKER_MOCK.ship_list?.length || 0)
                setIsPageActive(true)
            });
    };

    const handleSearchNameChange = (e: ChangeEvent) => {
        dispatch(saveSearchShipTitle(e.target.value))
    };

    useEffect(handleSearchShipClick,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []);

    return {
        shipList,
        ISRId,
        itemsInCart,
        searchShipTitle,
        isPageActive,
        updateCatalogPageFunc: handleSearchShipClick,
        handleSearchShipClick,
        handleSearchNameChange,
    };
};