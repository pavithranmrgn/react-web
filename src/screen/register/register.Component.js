import { Form, Button } from "react-bootstrap";

const RegisterComponent = (props) => {
    return (
        <div>
            <div>
                <h3>Register</h3>
                <Form noValidate validated={props.register.isValidate}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required onChange={(e) => props.onChangeInput(e, 'email')} type="email" placeholder="Enter email" />
                        <Form.Control.Feedback type="invalid">
                            Please enter email id.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required onChange={(e) => props.onChangeInput(e, 'password')} type="password" placeholder="Password" />
                        <Form.Control.Feedback type="invalid">
                            Please enter password.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Re-Enter Password</Form.Label>
                        <Form.Control required onChange={(e) => props.onChangeInput(e, 'repassword')} type="password" placeholder="Password" />
                        <Form.Control.Feedback type="invalid">
                            Please re enter password.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button onClick={props.onClickRegister} variant="primary">
                        Register
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default RegisterComponent;

RegisterComponent.displayName = "RegisterComponent";