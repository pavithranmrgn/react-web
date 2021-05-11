import React, { Component } from "react";
import RegisterComponent from "./register.Component";
import { withRouter } from "react-router-dom";
import { ApiUrl } from "../../services/apiUrl";
import Api from "../../services/serviceCall";
import { MessageBox } from "../shared/messageBox";
import * as utils from '../../utils/utils';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail: '',
            password: '',
            rePassword: '',
            isValidate: false,
            user: utils.getItem("user")
        }
    }

    onChangeInput = (e, inputName) => {
        let { userEmail, password, rePassword } = this.state;
        switch (inputName) {
            case 'email':
                userEmail = e.target.value;
                break;
            case 'password':
                password = e.target.value;
                break;
            case 'repassword':
                rePassword = e.target.value;
                break;
        }

        this.setState({ userEmail, password, rePassword });
    }

    onClickRegister() {
        let { userEmail, password, rePassword, isValidate } = this.state;
        if (!userEmail || !password || !rePassword) {
            isValidate = true;
            this.setState({ isValidate });
            return;
        }
        var requestData = {
            userEmail: userEmail,
            password: rePassword
        }
        let url = `${ApiUrl.AUTH_CONTROLLER}${ApiUrl.REGISTER_M}`;
        Api.Post(url, requestData, this).then(responseData => {
            MessageBox(responseData.message, 'info');
            this.props.history.push("Login");
        });
    }

    render() {
        let { userEmail, password, rePassword, isValidate } = this.state;
        return (
            <RegisterComponent
                {...{
                    register: {
                        userEmail,
                        password,
                        rePassword,
                        isValidate
                    }
                }}
                onChangeInput={this.onChangeInput.bind(this)}
                onClickRegister={this.onClickRegister.bind(this)}
            />
        )
    }
}

export default withRouter(Register);

Register.DisplyName = "Register";