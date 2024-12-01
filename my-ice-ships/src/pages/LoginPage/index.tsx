import "./LoginPage.css";
import {Container} from "react-bootstrap";
import {LoginForm} from "../../components/LoginForm";

export const LoginPage = () => {
    return (
        <Container className="d-flex justify-content-center align-items-center mt-5">
            <LoginForm></LoginForm>
        </Container>
    );
};