import {FC} from "react";
import {ITableProps} from "./typing.tsx";
import {Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";


export const ITable: FC<ITableProps> = (props: ITableProps) => {
    return (
        <div>
            <Card className="mb-2">
                <Card.Body className="py-1 px-1">
                    <Row className="d-flex align-items-center">
                        <Col xs={12} sm={1}>
                            <Card.Text><strong>№</strong></Card.Text>
                        </Col>
                        <Col xs={12} sm={1}>
                            <Card.Text><strong>Статус</strong></Card.Text>
                        </Col>
                        <Col xs={12} sm={1}>
                            <Card.Text><strong>Дата</strong></Card.Text>
                        </Col>
                        <Col xs={12} sm={2}>
                            <Card.Text><strong>Начальная точка</strong></Card.Text>
                        </Col>
                        <Col xs={12} sm={2}>
                            <Card.Text><strong>Конечная точка</strong></Card.Text>
                        </Col>
                        <Col xs={12} sm={1}>
                            <Card.Text><strong>Дата создания</strong></Card.Text>
                        </Col>
                        <Col xs={12} sm={1}>
                            <Card.Text><strong>Дата оформления</strong></Card.Text>
                        </Col>
                        <Col xs={12} sm={1}>
                            <Card.Text><strong>Дата завершения</strong></Card.Text>
                        </Col>
                        <Col xs={12} sm={2}>
                            <Card.Text><strong>Результат проводки</strong></Card.Text>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            
            {props.rows.map((row) => (
                <Card key={row.number} className="mb-2">
                    <Card.Body className="py-1 px-1">
                        <Row className="d-flex align-items-center">
                            <Col xs={12} sm={1}>
                                <Card.Text>
                                    <Link to={"/icebreaker/" + row.number} className="text-black">
                                        {row.number}
                                    </Link>
                                </Card.Text>
                            </Col>
                            <Col xs={12} sm={1}>
                                <Card.Text>
                                    {row.status}
                                </Card.Text>
                            </Col>
                            <Col xs={12} sm={1}>
                                <Card.Text>
                                    {row.date}
                                </Card.Text>
                            </Col>
                            <Col xs={12} sm={2}>
                                <Card.Text>
                                    {row.start_point}
                                </Card.Text>
                            </Col>
                            <Col xs={12} sm={2}>
                                <Card.Text>
                                    {row.finish_point}
                                </Card.Text>
                            </Col>
                            <Col xs={12} sm={1}>
                                <Card.Text>
                                    {row.creationDate}
                                </Card.Text>
                            </Col>
                            <Col xs={12} sm={1}>
                                <Card.Text>
                                    {row.registrationDate}
                                </Card.Text>
                            </Col>
                            <Col xs={12} sm={1}>
                                <Card.Text>
                                    {row.completionDate}
                                </Card.Text>
                            </Col>
                            <Col xs={12} sm={2}>
                                <Card.Text>
                                    {row.result === true ? "Успех" : row.result === false ? "Неудача" : "Неизвестно"}
                                </Card.Text>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};