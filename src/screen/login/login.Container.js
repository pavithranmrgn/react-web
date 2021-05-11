import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import LoginComponent from "./login.Component";
import { ApiUrl } from "../../services/apiUrl";
import Api from "../../services/serviceCall";
import { MessageBox } from "../shared/messageBox";
import * as utils from '../../utils/utils';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isValidate: false,
            email: '',
            password: '',
            user: utils.getItem("user")
        }
    }

    componentWillMount() {
        this.checkAndNavigatToAnotherPage();
    }

    checkAndNavigatToAnotherPage() {
        var { user } = this.state;
        if (user && user.token) {
            this.props.history.push("/Chat");
        }
    }

    onChangeInput = (e, inputName) => {
        let { email, password } = this.state;
        switch (inputName) {
            case 'email':
                email = e.target.value;
                break;
            case 'password':
                password = e.target.value;
                break;
        }

        this.setState({ email, password });
    }

    onClickLogin() {
        let { email, password, isValidate } = this.state;
        if (!email || !password) {
            isValidate = true;
            this.setState({ isValidate });
            return;
        }
        let url = `${ApiUrl.AUTH_CONTROLLER}${ApiUrl.LOGIN_M}/${email}&&${password}`;
        Api.Get(url, this).then(responseData => {
            if (responseData.message) {
                MessageBox(responseData.message, 'info');
            }
            if (responseData.data) {
                utils.setItem("user", responseData.data);
                this.props.history.push("Chat");
            }
        });
    }

    render() {
        let { isValidate, email, password } = this.state;
        return (
            <LoginComponent
                {...{
                    login: {
                        isValidate,
                        email, password
                    }
                }}
                onChangeInput={this.onChangeInput.bind(this)}
                onClickLogin={this.onClickLogin.bind(this)}
            />
        )
    }
}

export default withRouter(Login);

Login.DisplyName = "Login";