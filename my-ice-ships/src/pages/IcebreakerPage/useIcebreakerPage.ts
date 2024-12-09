import "./IcebreakerPage.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../core/api";
import { FullIcebreaker, Icebreaker } from "../../core/api/Api.ts";
import { OIcebreaker as ICEBREAKER_MOCK } from "../../core/mock/Icebreaker.ts";
import { store } from "../../core/store";
import { addNotification } from "../../core/store/slices/appSlice.ts";
import axios from "axios";

export const useIcebreakerPage = () => {
    const [IcebreakerData, setIcebreakerData] = useState<FullIcebreaker | null>(null);
    const [isEditable, setIsEditable] = useState<boolean>(true);
    const [order, setOrder] = useState<number>();
    const [versions, setVersions] = useState<{ [key: number]: string }>({});
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const handleClickDelete = (key: number) => {
        setVersions(prevVersions => {
            const newVersions = { ...prevVersions };
            delete newVersions[key];
            return newVersions;
        });
        updPage();
    };

    const updVersion = (key: number, version: string) => {
        setVersions(prevVersions => ({
            ...prevVersions,
            [key]: version,
        }));
    };

    const updPage = () => {
        if (id) {
            api.icebreakers.icebreakersRead(id)
                .then((data) => {
                    setIcebreakerData(data.data);
                    setIsEditable(data.data?.status === "DRAFT");
                    setOrder(data.data?.id);
                    if (data.data.ship_list) {
                        data.data.ship_list.forEach((ship: any) => {
                            updVersion(ship.ship.pk, ship.version);
                        });
                    }
                })
                .catch(() => {
                    setIcebreakerData(ICEBREAKER_MOCK);
                });
        }
    };

    useEffect(updPage, [id]);

    const handleClearClick = () => {
        api.icebreakers.icebreakersDeleteDelete(id || "")
            .then(() => {
                store.dispatch(
                    addNotification({
                        message: "Заявка очищена",
                        isError: false,
                    })
                );
                navigate("/ships_list");
            })
            .catch(() => {
                store.dispatch(
                    addNotification({
                        message: "Ошибка удаления заявки",
                        isError: true,
                    })
                );
            });
    };

    const formISR = async () => {
        try {
            for (const [shipId, version] of Object.entries(versions)) {
                // Преобразуем строку в число, если version является строкой
                const order = Number(version);  // Преобразуем в число
                if (!isNaN(order)) {  // Проверяем, что это действительно число
                    await api.icebreakers.icebreakersUpdateShipUpdate(id || "", shipId, { order });
                } else {
                    throw new Error(`Invalid version value for shipId ${shipId}`);
                }
            }
            await api.icebreakers.icebreakersUpdateUpdate(id || "", { status: "FORMED" }); // Пример с данными для обновления статуса
            store.dispatch(
                addNotification({
                    message: "Заявка успешно оформлена",
                    isError: false,
                })
            );
            navigate("/install_ship_requests_list");
        } catch (error) {
            store.dispatch(
                addNotification({
                    message: "Ошибка оформления заявки",
                    isError: true,
                })
            );
        }
    };
    
    // const formISR = async () => {
    //     try {
    //         for (const [shipId, value] of Object.entries(versions)) {
    //             await api.icebreakers.icebreakersUpdateShipUpdate(id || "", shipId, { order: value });
    //         }
    //         await api.icebreakers.icebreakersUpdateUpdate(id || "", { status: 2 });
    //         store.dispatch(
    //             addNotification({
    //                 message: "Заявка успешно оформлена",
    //                 isError: false,
    //             })
    //         );
    //         navigate("/install_ship_requests_list");
    //     } catch (error) {
    //         store.dispatch(
    //             addNotification({
    //                 message: "Ошибка оформления заявки",
    //                 isError: true,
    //             })
    //         );
    //     }
    // };

    const handleFormClick = () => {
        formISR();
    };

    return {
        IcebreakerData,
        isEditable,
        order,
        id,
        updVersion,
        handleClickDelete,
        handleClearClick,
        handleFormClick,
    };
};
