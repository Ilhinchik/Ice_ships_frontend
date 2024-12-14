import {FC} from "react";
import {IISRTableItemProps} from "./typing.tsx";
import {Button, Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {store, useSelector} from "../../core/store";
import {selectUser} from "../../core/store/slices/selectors.ts";
import {api} from "../../core/api";
import {addNotification} from "../../core/store/slices/appSlice.ts";

export const ISRTableItem: FC<IISRTableItemProps> = (isr: IISRTableItemProps) => {
    const {isManager} = useSelector(selectUser);

    const handleCompleteClick = () => {
        api.installSoftwareRequests.installSoftwareRequestsResolveUpdate(
            isr.pk.toString(),
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
        api.installSoftwareRequests.installSoftwareRequestsResolveUpdate(
            isr.pk.toString(),
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
        <Card key={isr.pk} className="mb-2">
            <Card.Body className="py-2 px-3">
                <Row className="d-flex align-items-center">
                    <Col>
                        <Card.Text>
                            <Link to={"/install_software_request/" + isr.pk} className="text-black">
                                {isr.pk}
                            </Link>
                        </Card.Text>
                    </Col>
                    {isManager ?
                        <>
                            <Col>
                                <Card.Text>
                                    {isr.client}
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
                            {isr.creationDate}
                        </Card.Text>
                    </Col>
                    <Col>
                        <Card.Text>
                            {isr.registrationDate}
                        </Card.Text>
                    </Col>
                    <Col>
                        <Card.Text>
                            {isr.completionDate}
                        </Card.Text>
                    </Col>
                    {isManager?
                        <>
                            <Col>
                                <Button
                                    onClick={handleCompleteClick}
                                    className="dark-blue-btn"
                                    disabled={isr.status != "В работе"}
                                >
                                    Завершить
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    onClick={handleRejectClick}
                                    className="white-bg dark-blue-border"
                                    disabled={isr.status != "В работе"}

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