import {useEffect, useState} from "react";
import {selectApp} from "../../core/store/slices/selectors";
import {useDispatch, useSelector} from "../../core/store";
import {api} from "../../core/api";

import {shipList as SOFTWARE_LIST_MOCK} from "../../core/mock/shipList.ts";

import {ChangeEvent} from "../../App.typing.tsx";
import {saveSearchInListShipTitle} from "../../core/store/slices/appSlice.ts";
import {Ship} from "../../core/api/Api.ts";


export const useShipListPage = () => {
    const [shipList, setShipList] = useState<Ship[]>([]);
    const [isPageActive, setIsPageActive] = useState(false);
    const {searchInListShipTitle} = useSelector(selectApp);
    const dispatch = useDispatch();

    const handleSearchShipClick = () => {
        setIsPageActive(false)
        api.ships.shipsList({ship_name: searchInListShipTitle})
            .then((data) => {
                setShipList(data.data.ship);
                setIsPageActive(true)
            })
            .catch(() => {
                const filteredShip = SOFTWARE_LIST_MOCK.filter((ship) =>
                    ship.ship_name.toLowerCase().startsWith(searchInListShipTitle.toLowerCase())
                );
                setShipList(filteredShip);
                setIsPageActive(true)
            });
    };

    const handleSearchNameChange = (e: ChangeEvent) => {
        dispatch(saveSearchInListShipTitle(e.target.value))
    };

    useEffect(handleSearchShipClick,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []);

    return {
        shipList,
        searchInListShipTitle,
        isPageActive,
        updateCatalogPageFunc: handleSearchShipClick,
        handleSearchShipClick,
        handleSearchNameChange,
    };
};