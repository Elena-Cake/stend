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

    const [dates, setDates] = useState([]);
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [arrayIdInstruments, setArrayIdInstruments] = useState([1]);
    const [dataRequest, setDataRequest] = useState({});

    const [isErrorInputDateFrom, setIsErrorInputDateFrom] = useState(false);
    const [isErrorInputDateTo, setIsErrorInputDateTo] = useState(false);
    const [isErrorArrayIdInstruments, setIsErrorArrayIdInstruments] = useState(false);

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
        if (dataRequest.start_date === "" || dataRequest.end_date === "" || arrayIdInstruments.length === 0) {
            dataRequest.start_date === "1" ? setIsErrorInputDateFrom(true) : setIsErrorInputDateFrom(false)
            dataRequest.end_date === "1" ? setIsErrorInputDateTo(true) : setIsErrorInputDateTo(false)
            arrayIdInstruments.length === 0 ? setIsErrorArrayIdInstruments(true) : setIsErrorArrayIdInstruments(false)
        } else {
            setIsErrorInputDateFrom(false)
            setIsErrorInputDateTo(false)
            setIsErrorArrayIdInstruments(false)
            console.log(dataRequest)

            api.startCalculate(dataRequest)
                .then((res) => {
                    console.log(res)
                    openLoadingPopup()

                })

            api.getLog()
                .then((res) => {
                    console.log(res.data)
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
            <Splider dates={dates} />
            <Loader isVisible={isVisible} />
            <LoadingPopup isOpen={isLoadingPopupOpen} onClose={closeLoadingPopup} />
        </div>
    );
}

export default ResultsDone;