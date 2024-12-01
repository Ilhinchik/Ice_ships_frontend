import "./RegistrationPage.css";
import {Container} from "react-bootstrap";
import {RegistrationForm} from "../../components/RegistrationForm";

export const RegistrationPage = () => {
    return (
        <Container className="d-flex justify-content-center align-items-center mt-5">
            <RegistrationForm></RegistrationForm>
        </Container>
    );
};