import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ChatComponent from "./chat.Component";
import * as utils from '../../utils/utils';
import { ApiUrl } from "../../services/apiUrl";
import Api from "../../services/serviceCall";
import { apiUrl } from "../../config/configSettings";
import io from 'socket.io-client';

const socket = io(apiUrl, { forceNew: true, reconnect: true, transports: ["websocket"] });

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: utils.getItem("user"),
            usersList: [],
            userMessage: [],
            recieverId: '',
            inputChange: ''
        };
        this.eventSource = null;
        //new EventSource(`${apiUrl}${ApiUrl.CHAT_CONTROLLER}${ApiUrl.GET_MESSAGE_M}/${user.id}&&${userId}`);

    }

    componentWillMount() {
        let { user } = this.state;
        if (!user && !user.token) {
            this.props.history.push('Login');
        }
        this.getAllUsers();
    }

    getAllUsers() {
        let { user } = this.state;
        let url = `${ApiUrl.USER_CONTROLLER}${ApiUrl.GETUSERS_M}/${user.id}`;
        Api.Get(url, this).then(responseData => {
            if (responseData.data && responseData.data.length > 0) {
                this.onClickUser(responseData.data[0].id);
                this.setState({ usersList: responseData.data });
            }
        });
    }

    onClickUser(userId) {
        let { user } = this.state;
        socket.disconnect();
        this.eventSource = new EventSource(`${apiUrl}${ApiUrl.CHAT_CONTROLLER}${ApiUrl.GET_MESSAGE_M}/${user.id}&&${userId}`);
        this.eventSource.onmessage = e => console.log(JSON.parse(e.data));
        let url = `${ApiUrl.CHAT_CONTROLLER}${ApiUrl.GET_MESSAGE_M}/${user.id}&&${userId}`;
        Api.Get(url, this).then(responseData => {
            if (responseData.data) {
                this.setState({ userMessage: responseData.data, recieverId: userId }, () => this.realTimeMessage());
            }
        });
    }

    realTimeMessage = () => {
        let { user, recieverId } = this.state;

        socket.on('onRecieveMessage', (responseData) => {
            if (responseData.data) {
                this.setState({ userMessage: responseData.data });
            }
        });
        socket.emit('onStartListening', user.id, recieverId);
    }

    onChangeInput = (e) => {
        let { inputChange } = this.state;
        inputChange = e.target.value;
        this.setState({ inputChange });
    }

    onClickSend = () => {
        let { inputChange, user, recieverId } = this.state;
        let requestData = {
            message: inputChange,
            recieverId: user.id,
            senderId: recieverId
        }
        let url = `${ApiUrl.CHAT_CONTROLLER}${ApiUrl.CREATE_M}`;
        Api.Post(url, requestData, this).then(responseData => {
            this.setState({ inputChange: '' });
        });
    }

    logout = () => {
        localStorage.clear();
        this.props.history.push('Login');
    }

    render() {
        let { usersList, userMessage, recieverId, inputChange } = this.state;
        return (
            <ChatComponent
                {...{
                    chat: {
                        usersList, userMessage, recieverId, inputChange
                    }
                }}
                onClickUser={this.onClickUser.bind(this)}
                onChangeInput={this.onChangeInput.bind(this)}
                onClickSend={this.onClickSend.bind(this)}
                logout={this.logout.bind(this)}
            />
        )
    }
}

export default withRouter(Chat);

Chat.DisplyName = "Chat";