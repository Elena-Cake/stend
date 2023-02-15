import React, { useEffect, useState } from "react";
import IntervalDate from "../IntervalDate/IntervalDate";
import Splider from "./Splider/Splider";
import './ResultsDone.css';
import TableResultsDone from "./TableResultsDone/TableResultsDone";
import Loader from "../Loader/Loader";
import { api } from "../utils/api";
import axios from "axios";
import LoadingPopup from "../LoadingPopup/LoadingPopup";

const ResultsDone = () => {
    const [isLoadingPopupOpen, setIsLoadingPopupOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [textPopup, setTextPopup] = useState('');

    const [dates, setDates] = useState([]);
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [arrayIdInstruments, setArrayIdInstruments] = useState([1]);
    const [dataRequest, setDataRequest] = useState({});

    const [isErrorInputDateFrom, setIsErrorInputDateFrom] = useState(false);
    const [isErrorInputDateTo, setIsErrorInputDateTo] = useState(false);
    const [isErrorArrayIdInstruments, setIsErrorArrayIdInstruments] = useState(false);

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

    // попап ожидания расчетов
    function openLoadingPopup() {
        setIsLoadingPopupOpen(true)
    }

    function closeLoadingPopup() {
        setIsLoadingPopupOpen(false)
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
            setDataLog('')
            api.startCalculate(dataRequest)
                .then((data) => {
                    console.log(data)
                    if (data.success === 1) {
                        setTextPopup('Моделирование запущено')
                        setDataLog(data.message)
                        openLoadingPopup()

                        let status
                        function longAPI() {
                            api.getLog()
                                .then((res) => {
                                    console.log(res)
                                    status = res.message == [] ? '' : res.message;
                                    setDataLog(dataLog + "\n" + status)
                                })
                            if (status !== 'finished') {
                                setTimeout(longAPI, 5000)
                            } else {
                                api.getResult()
                                    .then(data => {
                                        console.log(data)
                                        setDataCharts(data)
                                    })
                            }
                        }
                        longAPI()
                    } else if (data.success === 0) {
                        setTextPopup('Не удалось запустить моделирование')
                        setDataLog(data.message)
                        openLoadingPopup()
                        api.getLog()
                            .then((res) => {
                                const logi = dataLog
                                console.log(res.message)
                                setDataLog(logi + "\n" + res.message)
                            })
                    }
                })
        }
    }, [dataRequest])

    useEffect(() => {
        setIsErrorInputDateFrom(false)
        setIsErrorInputDateTo(false)
        setIsErrorArrayIdInstruments(false)
        api.getLog()
            .then((res) =>
                console.log(res.data)
            )
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
            <Splider dates={dates} data={dataCharts} />
            <Loader isVisible={isVisible} />
            <LoadingPopup
                isOpen={isLoadingPopupOpen}
                onClose={closeLoadingPopup}
                dataLog={dataLog}
                textPopup={textPopup} />
        </div>
    );
}

export default ResultsDone;