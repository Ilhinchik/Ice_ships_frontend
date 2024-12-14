import "./ShipEditPage.css";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Col, Form, Row} from "react-bootstrap";

import {Ship} from "../../core/api/Api.ts";
import {api} from "../../core/api";
import {store} from "../../core/store";
import {addNotification} from "../../core/store/slices/appSlice.ts";
import unknownImage from "/images/unknown.png"
import axios from "axios";


export const ShipEditPage = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const [ship, setShip] = useState<Ship>({
        ship_name: '',
        length: 0,
        year: 0,
        ice_class: '',
        engine: '',
        description: '',
        image: ''
    });

    useEffect(() => {
        if (id) {
            api.ships.shipsRead(id)
                .then((data) => {
                    setShip(data.data);
                })
                .catch(() => {
                    store.dispatch(
                        addNotification({
                            message: "Ошибка получения данных ПО",
                            isError: true,
                        })
                    );
                });
            setIsEdit(true);
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setShip({
            ...ship,
            [name]: value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setLogoFile(file);
    };

    const createShip = async () => {
        try {
            const data = await api.ships.shipsCreateCreate(ship)
            if (logoFile != null) {
                api.ships.shipsUpdateImageCreate(data.data.id?.toString() || "", {image: logoFile})
                    .then(() => {
                        store.dispatch(
                            addNotification({
                                message: "ПО успешно добавлено",
                                isError: false,
                            })
                        );
                        navigate('/ship/' + data.data.id?.toString() || "");
                    })
                    .catch(() => {
                            store.dispatch(
                                addNotification({
                                    message: "Ошибка загрузки файла",
                                    isError: true,
                                })
                            );
                        }
                    )
            } else {
                store.dispatch(
                    addNotification({
                        message: "ПО успешно добавлено",
                        isError: false,
                    })
                );
                navigate('/ship/' + data.data.id?.toString() || "");
            }
            return
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status == 400) {
                store.dispatch(
                    addNotification({
                        message: "Заполнены не все обязательные поля",
                        isError: true,
                    })
                );
            } else {
                store.dispatch(
                    addNotification({
                        message: "Ошибка сервера",
                        isError: true,
                    })
                );
            }
            return
        }
    }

    const handleSubmit = () => {
        if (isEdit) {
            api.ships.shipsUpdateUpdate(ship.id?.toString() || "", ship)
                .then(() => {
                    store.dispatch(
                        addNotification({
                            message: "Данные ПО обновлены",
                            isError: false,
                        })
                    );
                    navigate('/ship/' + ship.id?.toString() || "");
                })
                .catch(() => {
                        store.dispatch(
                            addNotification({
                                message: "Ошибка обновления данных ПО",
                                isError: true,
                            })
                        );
                    }
                )
            if (logoFile != null) {
                api.ships.shipsUpdateImageCreate(ship.id?.toString() || "", {image: logoFile})
                    .then(() => {
                    })
                    .catch(() => {
                            store.dispatch(
                                addNotification({
                                    message: "Ошибка загрузки файла",
                                    isError: true,
                                })
                            );
                        }
                    )
            }
            return
        }
        createShip()
            .then(() => {
            })
            .catch(() => {
            })
    };

    return (
        <div className="container">
            <h2 className="mb-3 mt-4">{isEdit ? "Редактирование ПО" : "Добавление ПО"}</h2>
            <Row>
                <Col md={6}>
                    <Form.Group controlId="formTitle" className="mb-3">
                        <Form.Label>Название <sup className="text-danger">*</sup></Form.Label>
                        <Form.Control
                            type="text"
                            name="ship_name"
                            value={ship.ship_name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formSummary" className="mb-3">
                        <Form.Label>Длина корабля (в метрах) <sup className="text-danger">*</sup></Form.Label>
                        <Form.Control
                            type="number"
                            name="length"
                            value={ship.length || ""}
                            onChange={handleChange}
                            min={-2147483648}
                            max={2147483647}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formPrice" className="mb-3">
                        <Form.Label>Год постройки корабля <sup className="text-danger">*</sup></Form.Label>
                        <Form.Control
                            type="number"
                            name="year"
                            value={ship.year || ""}
                            onChange={handleChange}
                            min={-2147483648}
                            max={2147483647}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formInstallingTime" className="mb-3">
                        <Form.Label>Ледовый класс корабля <sup className="text-danger">*</sup></Form.Label>
                        <Form.Control
                            type="textarea"
                            name="ice_class"
                            value={ship.ice_class}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formSize" className="mb-3">
                        <Form.Label>Тип двигателя корабля <sup className="text-danger">*</sup></Form.Label>
                        <Form.Control
                            type="textarea"
                            name="engine"
                            value={ship.engine}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formFile">
                        <Form.Label>Картинка корабля</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </Form.Group>
                </Col>

                <Col md={6} className="">
                    <img
                        src={ship.image ? (ship.image) : (unknownImage)}
                        alt="Logo"
                        className="img-fluid p-2"
                        style={{maxWidth: '300px', maxHeight: '300px', objectFit: 'contain'}}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group controlId="formDescription" className="mb-3">
                        <Form.Label>Полное описание корабля<sup className="text-danger">*</sup></Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={ship.description}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>
            <div>
                <sup className="text-danger">*</sup> — обязательные поля
            </div>
            <Button
                type="button"
                className="mt-3 mb-3 dark-blue-btn"
                onClick={handleSubmit}
            >
                {isEdit ? "Сохранить изменения" : "Добавить ПО"}
            </Button>
        </div>
    );

};