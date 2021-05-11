import { Form, Button } from "react-bootstrap";


const LoginComponent = (props) => {
    return (
        <div>
            <div>
                <h3>Login</h3>
                <Form noValidate validated={props.login.isValidate}>
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
                    <Button onClick={props.onClickLogin} variant="primary">
                        Login
                    </Button>
                    <p className="forgot-password text-right">
                        New user <a href="/Register">Register</a>
                    </p>
                </Form>
            </div>
        </div>

    );
}

export default LoginComponent;