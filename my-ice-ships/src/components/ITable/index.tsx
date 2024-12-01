import {FC} from "react";
import {ITableProps} from "./typing.tsx";
import {Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";


export const ITable: FC<ITableProps> = (props: ITableProps) => {
    return (
        <div>
            <Card className="mb-2">
                <Card.Body className="py-2 px-3">
                    <Row className="d-flex align-items-center">
                        <Col xs={12} sm={3}>
                            <Card.Text><strong>№</strong></Card.Text>
                        </Col>
                        <Col xs={12} sm={3}>
                            <Card.Text><strong>Статус</strong></Card.Text>
                        </Col>
                        <Col xs={12} sm={2}>
                            <Card.Text><strong>Дата создания</strong></Card.Text>
                        </Col>
                        <Col xs={12} sm={2}>
                            <Card.Text><strong>Дата оформления</strong></Card.Text>
                        </Col>
                        <Col xs={12} sm={2}>
                            <Card.Text><strong>Дата завершения</strong></Card.Text>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {props.rows.map((row) => (
                <Card key={row.number} className="mb-2">
                    <Card.Body className="py-2 px-3">
                        <Row className="d-flex align-items-center">
                            <Col xs={12} sm={3}>
                                <Card.Text>
                                    <Link to={"/install_software_request/" + row.number} className="text-black">
                                        {row.number}
                                    </Link>
                                </Card.Text>
                            </Col>
                            <Col xs={12} sm={3}>
                                <Card.Text>
                                    {row.status}
                                </Card.Text>
                            </Col>
                            <Col xs={12} sm={2}>
                                <Card.Text>
                                    {row.creationDate}
                                </Card.Text>
                            </Col>
                            <Col xs={12} sm={2}>
                                <Card.Text>
                                    {row.registrationDate}
                                </Card.Text>
                            </Col>
                            <Col xs={12} sm={2}>
                                <Card.Text>
                                    {row.completionDate}
                                </Card.Text>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};