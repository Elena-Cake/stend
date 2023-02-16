import React, { useEffect, useState } from "react";
import IntervalDate from "../IntervalDate/IntervalDate";
import Splider from "./Splider/Splider";
import './ResultsDone.css';
import TableResultsDone from "./TableResultsDone/TableResultsDone";
import Loader from "../Loader/Loader";
import { api } from "../utils/api";
import axios from "axios";
import LoadingPopup from "../LoadingPopup/LoadingPopup";
import InfoPopup from "../InfoPopup/InfoPopup";

const ResultsDone = () => {
    const [isLoadingPopupOpen, setIsLoadingPopupOpen] = useState(false);
    const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);

    const [isVisible, setIsVisible] = useState(false);
    const [textPopup, setTextPopup] = useState({ text: '', isError: false });

    const [dates, setDates] = useState([]);
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [arrayIdInstruments, setArrayIdInstruments] = useState([1]);
    const [dataRequest, setDataRequest] = useState({});

    const [isErrorInputDateFrom, setIsErrorInputDateFrom] = useState(false);
    const [isErrorInputDateTo, setIsErrorInputDateTo] = useState(false);
    const [isErrorArrayIdInstruments, setIsErrorArrayIdInstruments] = useState(false);

    const [dataLogMessage, setDataLogMessage] = useState('')
    const [dataLog, setDataLog] = useState('')

    const [dataCharts, setDataCharts] = useState({})

    const handleStartDateChange = (date) => {
        setDateStart(date)
        setIsErrorInputDateFrom(false)
    };

    const handleEndDateChange = (date) => {
        setDateEnd(date)
        setIsErrorInputDateTo(false)
    };

    // попап оповещения расчетов
    function openInfoPopup() {
        setIsInfoPopupOpen(true)
    }

    // попап ожидания расчетов
    function openLoadingPopup() {
        setIsLoadingPopupOpen(true)
    }

    function closePopups() {
        setIsLoadingPopupOpen(false)
        setIsInfoPopupOpen(false)
    }

    // функция формирует массив дат
    function getDatesInRange(startDate, endDate) {
        let endDateClass
        endDate === "" ? endDateClass = new Date(startDate) : endDateClass = new Date(endDate);
        const startDateClass = new Date(startDate);
        const date = new Date(startDateClass.getTime());
        const datesInInterval = [];

        while (date <= endDateClass) {
            const dateFull = new Date(date);
            datesInInterval.push(dateFull.toLocaleDateString())
            date.setDate(date.getDate() + 1);
        }
        return datesInInterval;
    };

    // функция по нажатию на кнопку
    const createRequesObject = (arrayIdInstruments) => {
        setArrayIdInstruments(arrayIdInstruments)
        // api.getResult()
        //     .then(data => {
        //         console.log(data)
        //         setDataCharts(data)
        //     })

    };

    // формирует запрос
    useEffect(() => {
        setDataRequest({
            start_date: dateStart,
            end_date: dateEnd,
            site_id: arrayIdInstruments
        })
        setDates(getDatesInRange(dateStart, dateEnd))
    }, [arrayIdInstruments])

    // получение статуса работы
    function longAPI() {
        let status
        api.getLog()
            .then((res) => {
                status = res.message == [] ? '' : res.message;
                setDataLog(status)
                console.log(status)
                if (status !== 'finished') {
                    setTimeout(longAPI, 5000)
                } else {
                    api.getResult()
                        .then(data => {
                            setDataCharts(data)
                            setIsVisible(true)
                            closePopups()
                        })
                }
            })
    }

    // отправка запроса
    useEffect(() => {
        //api
        if (dataRequest.start_date === "" || arrayIdInstruments.length === 0) {
            dataRequest.start_date === "1" ? setIsErrorInputDateFrom(true) : setIsErrorInputDateFrom(false)
            dataRequest.end_date === "1" ? setIsErrorInputDateTo(true) : setIsErrorInputDateTo(false)
            arrayIdInstruments.length === 0 ? setIsErrorArrayIdInstruments(true) : setIsErrorArrayIdInstruments(false)
        } else {
            setIsErrorInputDateFrom(false)
            setIsErrorInputDateTo(false)
            setIsErrorArrayIdInstruments(false)
            // console.log(dataRequest)
            setDataLogMessage('')
            setDataLog('')
            api.startCalculate(dataRequest)
                .then((data) => {
                    if (data.success === 1) {
                        setTextPopup({ text: 'Моделирование запущено', isError: false })
                        setDataLogMessage(data.message)
                        openLoadingPopup()
                        longAPI()
                    } else if (data.success === 0) {
                        setTextPopup({ text: 'Не удалось запустить моделирование', isError: true })
                        setDataLogMessage(data.message)
                        openLoadingPopup()
                        longAPI()
                    }
                })
        }
    }, [dataRequest])

    // прервать вычисление
    const abortCulculate = () => {
        api.abortCalculate()
            .then((data) => {
                setTextPopup({ text: 'Моделирование прервано', isError: true })
                closePopups()
                openInfoPopup()
            })
    }

    useEffect(() => {
        setIsErrorInputDateFrom(false)
        setIsErrorInputDateTo(false)
        setIsErrorArrayIdInstruments(false)
    }, [])

    return (
        <div className="resultsdone">
            <IntervalDate
                onStartDateChange={handleStartDateChange}
                onEndDateChange={handleEndDateChange}
                isErrorInputDateFrom={isErrorInputDateFrom}
                isErrorInputDateTo={isErrorInputDateTo}
            />
            <TableResultsDone onCreateRequesObject={createRequesObject}
                isErrorArrayIdInstruments={isErrorArrayIdInstruments} />
            <Splider dates={dates} data={dataCharts} isVisible={isVisible} />
            <Loader />
            <LoadingPopup
                isOpen={isLoadingPopupOpen}
                onClose={closePopups}
                dataLog={dataLog}
                dataLogMessage={dataLogMessage}
                textPopup={textPopup}
                onAbortClick={abortCulculate} />
            <InfoPopup
                isOpen={isInfoPopupOpen}
                onClose={closePopups}
                textPopup={textPopup} />
        </div>
    );
}

export default ResultsDone;