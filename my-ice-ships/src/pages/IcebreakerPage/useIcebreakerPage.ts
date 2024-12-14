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

    const [date, setDate] = useState<string>('');  // Добавили состояние для даты
    const [start_point, setstart_point] = useState<string>('');  // Добавили состояние для начальной точки
    const [finish_point, setfinish_point] = useState<string>('');  // Добавили состояние для конечной точки

    const moveCard = (shipId: number, direction: "up" | "down") => {
        setIcebreakerData((prevState) => {
            if (!prevState) return prevState;
    
            const updatedShipList = [...prevState.ship_list];
            const index = updatedShipList.findIndex((ship) => ship.ship.id === shipId);
    
            if (index === -1) return prevState; // Если элемент не найден, возвращаем текущее состояние
    
            // Вычисляем новый индекс на основе направления
            const newIndex = direction === "up" ? index - 1 : index + 1;
    
            // Проверяем, что новый индекс в пределах массива
            if (newIndex < 0 || newIndex >= updatedShipList.length) return prevState;
    
            // Меняем элементы местами
            [updatedShipList[index], updatedShipList[newIndex]] = [updatedShipList[newIndex], updatedShipList[index]];
    
            // Обновляем порядок
            updatedShipList.forEach((ship, idx) => {
                ship.order = idx + 1;
            });
    
            return {
                ...prevState,
                ship_list: updatedShipList,
            };
        });
    };

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
            // Обновление даты, начальной и конечной точки
            await api.icebreakers.icebreakersUpdateUpdate(id || "", {
                date,
                start_point,
                finish_point,
            });

            // Обновление статуса заявки
            await api.icebreakers.icebreakersUpdateStatusUserUpdate(id || "");

            store.dispatch(
                addNotification({
                    message: "Заявка успешно оформлена",
                    isError: false,
                })
            );
            navigate("/icebreakers_list");
        } catch (error) {
            store.dispatch(
                addNotification({
                    message: "Ошибка оформления заявки. Заполните все поля",
                    isError: true,
                })
            );
        }
    };
    

    const handleFormClick = () => {
        formISR();
    };

    return {
        IcebreakerData,
        isEditable,
        date,
        setDate,
        start_point,
        setstart_point,
        finish_point,
        setfinish_point,
        id,
        updVersion,
        handleClickDelete,
        handleClearClick,
        formISR,
        moveCard,
        handleFormClick
        
    };
};
