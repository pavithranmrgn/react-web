import React, { Component } from "react";
import { apiUrl } from "../config/configSettings";

export default class Api extends Component {

    static Get(url, componentState) {
        url = apiUrl + url;
        let headers = { Pragma: 'no-cache' };
        if (componentState && componentState.state && componentState.state.user && componentState.state.user.token) {
            headers = { ...headers, ['Authorization']: 'Bearer' + " " + componentState.state.user.token };
        }
        return new Promise((resolve) => {
            const options = {
                method: 'GET',
                headers
            };
            return fetch(url, options).then((response) => {
                return resolve(response.json());
            }).catch(error => {
                return resolve(error);
            });
        });
    }

    static Post(url, data, componentState) {
        url = apiUrl + url;
        let headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        if (componentState && componentState.state && componentState.state.user && componentState.state.user.token) {
            headers = { ...headers, ['Authorization']: 'Bearer' + " " + componentState.state.user.token };
        }
        return new Promise((resolve) => {
            const options = {
                method: 'POST',
                headers,
                body: JSON.stringify(data)
            };
            return fetch(url, options).then((response) => {
                return resolve(response.json());
            }).catch(error => {
                return resolve(error);
            });
        });
    }
}