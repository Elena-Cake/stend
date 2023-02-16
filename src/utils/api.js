
import axios from "axios";

const instance = axios.create({
    baseURL: 'http://modeller:9090/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
})

export const api = {
    // Запрос инструментов
    getInstruments() {
        return instance.get('run')
            .then(res => res.json())
    },

    // Запуск задачи
    startCalculate(data) {
        return instance.post('run', JSON.stringify(data))
            .then(res => res.data)
    },

    // Запрос лога
    getLog() {
        return instance.get('getlog')
            .then(res => res.data)
    },

    // Запрос результата
    getResult() {
        return instance.get('getres')
            .then(res => res.data)
    },

    // Принудительное завершение выполнения задачи
    abortCalculate() {
        return instance.get('abort')
            .then(res => res.data)
    }
}




