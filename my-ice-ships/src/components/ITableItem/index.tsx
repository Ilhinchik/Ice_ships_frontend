import {FC} from "react";
import {ITableItemProps} from "./typing.tsx";
import {Button, Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {store, useSelector} from "../../core/store";
import {selectUser} from "../../core/store/slices/selectors.ts";
import {api} from "../../core/api";
import {addNotification} from "../../core/store/slices/appSlice.ts";

export const ITableItem: FC<ITableItemProps> = (isr: ITableItemProps) => {
    const {isManager} = useSelector(selectUser);

    const handleCompleteClick = () => {
        api.icebreakers.icebreakersUpdateStatusAdminUpdate(
            isr.id.toString(),
            {
                status: "COMPLETED"
            })
            .then(() => {
                store.dispatch(
                    addNotification({
                        message: "Заявка на установку согласована",
                        isError: false,
                    })
                );
                isr.updateListPageFunc()
            })
            .catch(() => {
                    store.dispatch(
                        addNotification({
                            message: "Ошибка согласования заявки",
                            isError: true,
                        })
                    );
                }
            )
    }

    const handleRejectClick = () => {
        api.icebreakers.icebreakersUpdateStatusAdminUpdate(
            isr.id.toString(),
            {
                status: "REJECTED"
            })
            .then(() => {
                store.dispatch(
                    addNotification({
                        message: "Заявка на установку отклонена",
                        isError: false,
                    })
                );
                isr.updateListPageFunc()
            })
            .catch(() => {
                    store.dispatch(
                        addNotification({
                            message: "Ошибка отклонения заявки",
                            isError: true,
                        })
                    );
                }
            )
    }

    return (
        <Card key={isr.id} className="mb-2">
            <Card.Body className="py-1 px-1">
                <Row className="d-flex align-items-center">
                    <Col>
                        <Card.Text>
                            <Link to={"/icebreaker/" + isr.id} className="text-black">
                                {isr.id}
                            </Link>
                        </Card.Text>
                    </Col>
                    {isManager ?
                        <>
                            <Col>
                                <Card.Text>
                                    {isr.owner}
                                </Card.Text>
                            </Col>
                        </> :
                        <>
                        </>
                    }
                    <Col>
                        <Card.Text>
                            {isr.status}
                        </Card.Text>
                    </Col>
                    <Col>
                        <Card.Text>
                            {isr.date}
                        </Card.Text>
                    </Col>
                    <Col>
                        <Card.Text>
                            {isr.start_point}
                        </Card.Text>
                    </Col>
                    <Col>
                        <Card.Text>
                            {isr.finish_point}
                        </Card.Text>
                    </Col>
                    
                    <Col>
                        <Card.Text>
                            {isr.registrationDate}
                        </Card.Text>
                    </Col>
                    <Col>
                    {isr.result !== null ? (
        <Card.Text>
            {isr.result ? "Успешно" : "Неуспешно"}
        </Card.Text>
    ) : (
        <Card.Text>Результат отсутствует</Card.Text>
    )}
                    </Col>
                    
                    {isManager?
                        <>
                            <Col>
                                <Button
                                    onClick={handleCompleteClick}
                                    className={`dark-blue-btn ${isr.status != "В работе" ? "hidden" : ""}`}
                                >
                                    Завершить
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    onClick={handleRejectClick}
                                    className={`otm-button ${isr.status != "В работе" ? "hidden" : ""}`}

                                >
                                    Отклонить
                                </Button>
                            </Col>
                        </> :
                        <>
                        </>
                    }
                </Row>
            </Card.Body>
        </Card>
    );
};