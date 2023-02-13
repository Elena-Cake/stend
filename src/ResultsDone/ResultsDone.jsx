import React, { useEffect, useState } from "react";
import IntervalDate from "../IntervalDate/IntervalDate";
import Splider from "./Splider/Splider";
import './ResultsDone.css';
import TableResultsDone from "./TableResultsDone/TableResultsDone";
import Loader from "../Loader/Loader";
import { api } from "../utils/api";

const ResultsDone = () => {

    const [isVisible, setIsVisible] = useState(false);

    const [dates, setDates] = useState([]);
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [arrayIdInstruments, setArrayIdInstruments] = useState([]);
    const [dataRequest, setDataRequest] = useState({});

    const [isErrorInputDateFrom, setIsErrorInputDateFrom] = useState(false);
    const [isErrorInputDateTo, setIsErrorInputDateTo] = useState(false);
    const [isErrorArrayIdInstruments, setIsErrorArrayIdInstruments] = useState(false);

    const handleStartDateChange = (date) => {
        setDateStart(date)
    };

    const handleEndDateChange = (date) => {
        setDateEnd(date)
    };

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
        // if (dataRequest.start_date === "") {
        //     setIsErrorInputDateFrom(true)
        // } else if (arrayIdInstruments.length === 0) {
        //     setIsErrorArrayIdInstruments(true)
        // } else {
        // setIsErrorInputDateFrom(false)
        // setIsErrorInputDateTo(false)
        // setIsErrorArrayIdInstruments(false)
        console.log(dataRequest);
        // if (dataRequest.site_id !== []) {
        //     api.startCalculate(dataRequest)
        //         .then((res) => {
        //             console.log(res)
        //         })
        // }

        // setIsVisible(true)
        // setTimeout(() => {
        //     setIsVisible(false)
        // }, 1000)
        // }
    }, [dataRequest])

    useEffect(() => {
        setIsErrorInputDateFrom(false)
        setIsErrorInputDateTo(false)
        setIsErrorArrayIdInstruments(false)
        api.getLog()
            .then((res) => console.log(res))
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
        </div>
    );
}

export default ResultsDone;