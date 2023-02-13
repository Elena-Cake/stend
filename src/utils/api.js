
class Api {
    constructor({ baseUrl, headers }) {
        this._startRequest = baseUrl
        this._headers = headers
        this._checkRes = (res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`)
        };
    }

    //  Запуск задачи
    startCalculate(data) {
        return fetch(`${this._startRequest}run`, {
            method: 'PATCH',
            mode: 'cors',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(this._checkRes)
    }

    // Запрос лога
    getLog() {
        return fetch(`${this._startRequest}getlog`, {
            headers: this._headers,

            mode: 'cors'
        })
            .then(this._checkRes)
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
        'Content-Type': 'application/json'
    }

}
)