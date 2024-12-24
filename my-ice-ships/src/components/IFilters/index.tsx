import {FC} from "react";
import {IFiltersProps} from "./typing.tsx";
import {Button, Card, Form} from "react-bootstrap";
import {useSelector} from "../../core/store";
import {selectUser} from "../../core/store/slices/selectors.ts";

export const IFilters: FC<IFiltersProps> = (props: IFiltersProps) => {
    const {isManager} = useSelector(selectUser);

    return (
        <Card className="m-3">
            <Card.Body>
                <Form>
                    <div className="d-flex flex-column flex-md-row align-items-end justify-content-between">
                        {isManager && (
                            <div className="w-100 pe-0 pe-md-3 mb-3 mb-md-0">
                                <Form.Group controlId="author">
                                    <Form.Label>Автор</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={props.selectedAuthor}
                                        onChange={props.handleAuthorChange}
                                    />
                                </Form.Group>
                            </div>
                        )}

                        <div className="w-100 pe-0 pe-md-3 mb-3 mb-md-0">
                            <Form.Group controlId="status">
                                <Form.Label>Статус</Form.Label>
                                <Form.Select
                                    value={props.selectedStatus}
                                    onChange={props.handleStatusChange}
                                >
                                    <option value="">Любой статус</option>
                                    <option value="FORMED">В работе</option>
                                    <option value="COMPLETED">Завершена</option>
                                    <option value="REJECTED">Отклонена</option>
                                </Form.Select>
                            </Form.Group>
                        </div>

                        <div className="w-100 pe-0 pe-md-3 mb-3 mb-md-0">
                            <Form.Group controlId="startDate">
                                <Form.Label>Дата оформления c</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={props.selectedStartDate}
                                    onChange={props.handleStartDateChange}
                                />
                            </Form.Group>
                        </div>

                        <div className="w-100 pe-0 pe-md-3 mb-3 mb-md-0">
                            <Form.Group controlId="endDate">
                                <Form.Label>Дата оформления по</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={props.selectedEndDate}
                                    onChange={props.handleEndDateChange}
                                />
                            </Form.Group>
                        </div>

                        <div className="w-100 d-flex justify-content-end">
                            <Button
                                onClick={props.handleFilterIClick}
                                className="btn dark-blue-btn w-100 w-md-auto"
                            >
                                Показать
                            </Button>
                        </div>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};
