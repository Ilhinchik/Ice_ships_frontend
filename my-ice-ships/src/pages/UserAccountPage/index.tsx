import "./UserAccountPage.css";
import {Container} from "react-bootstrap";
import {UserAccountForm} from "../../components/UserAccountForm";

export const UserAccountPage = () => {
    return (
        <Container className="d-flex justify-content-center align-items-center mt-5">
            <UserAccountForm></UserAccountForm>
        </Container>
    );
};