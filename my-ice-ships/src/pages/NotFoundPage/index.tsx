import "./NotFoundPage.css";
import {Button, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

export const NotFoundPage = () => {
    return (
        <Container className="text-center" style={{marginTop: '200px'}}>
            <Row>
                <Col>
                    <h1 className="display-3">404</h1>
                    <p className="lead">Страница не найдена</p>
                    <Link to="/">
                        <Button className="dark-blue-btn">На главную</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};