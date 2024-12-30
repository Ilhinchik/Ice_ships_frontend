import {FC} from "react";
import {ITableProps} from "./typing.tsx";
import {Card, Col, Row} from "react-bootstrap";
import {ITableItem} from "../ITableItem";
import {ITableItemProps} from "../ITableItem/typing.tsx";
import {useSelector} from "../../core/store";
import {selectUser} from "../../core/store/slices/selectors.ts";


export const ITable: FC<ITableProps> = (tableProps: ITableProps) => {
    const {isManager} = useSelector(selectUser);

    return (
        <div>
            <Card className="mb-2">
                <Card.Body className="py-2 px-3">
                    <Row className="d-flex align-items-center">
                        <Col>
                            <Card.Text><strong>№</strong></Card.Text>
                        </Col>
                        {isManager ?
                            <>
                                <Col>
                                    <Card.Text><strong>Автор</strong></Card.Text>
                                </Col>
                            </> :
                            <>
                            </>
                        }
                        <Col>
                            <Card.Text><strong>Статус</strong></Card.Text>
                        </Col>
                        <Col>
                            <Card.Text><strong>Дата</strong></Card.Text>
                        </Col>
                        <Col>
                            <Card.Text><strong>Начальная точка</strong></Card.Text>
                        </Col>
                        <Col>
                            <Card.Text><strong>Конечная точка</strong></Card.Text>
                        </Col>
                        
                        <Col>
                            <Card.Text><strong>Дата оформления</strong></Card.Text>
                        </Col>
                        <Col>
                            <Card.Text><strong>Результат проводки</strong></Card.Text>
                        </Col>
                        

                        {isManager ?
                            <>
                                <Col>
                                    <Card.Text><strong>Завершить</strong></Card.Text>
                                </Col>
                                <Col>
                                    <Card.Text><strong>Отклонить</strong></Card.Text>
                                </Col>
                            </> :
                            <>
                            </>}
                    </Row>
                </Card.Body>
            </Card>
            <>
                {tableProps.rows.map((row, index) => {
                    const props: ITableItemProps = {
                        id: row.number,
                        status: row.status,
                        creationDate: row.creationDate,
                        registrationDate: row.registrationDate,
                        completionDate: row.completionDate,
                        owner: row.owner,
                        date: row.date,
                        start_point: row.start_point,
                        finish_point: row.finish_point,
                        result: row.result,
                        updateListPageFunc: tableProps.updateListPageFunc,
                    };
                    return (
                        <ITableItem key={index} {...props}/>
                    );
                })}
            </>
        </div>
    );
};