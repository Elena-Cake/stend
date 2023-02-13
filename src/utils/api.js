
import axios from "axios";

class Api {
    constructor({ baseUrl, headers }) {
        this._startRequest = baseUrl
        this._headers = headers
        this._checkRes = (res) => {
            return res.json();
        };
    }

    //  Запуск задачи
    startCalculate(data) {
        return axios.post(`http://modeller:9090/run`, data)
            .then(this._checkRes)
    }

    // Запрос лога
    getLog() {
        return axios.get(`http://modeller:9090/getlog`)
        // .then(this._checkRes)
    }

    // Запрос результата
    getResult() {
        return fetch(`${this._startRequest}getres`, {
            headers: this._headers,
        })
            .then(this._checkRes)
    }

    // Принудительное завершение выполнения задачи
    abortCalculate() {
        return fetch(`${this._startRequest}abort`, {
            headers: this._headers,
        })
            .then(this._checkRes)
    }
}

export const api = new Api({
    baseUrl: 'http://modeller:9090/',
    headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*'
    }

}
)