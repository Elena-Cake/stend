import React, { useState } from "react";
import IntervalDate from "../IntervalDate/IntervalDate";
import Splider from "./Splider/Splider";
import './ResultsDone.css';
import TableResultsDone from "./TableResultsDone/TableResultsDone";

const ResultsDone = () => {

    const [dates, setDates] = useState([]);
    const [dateStart, setDateStart] = useState("")
    const [dateEnd, setDateEnd] = useState("")

    const handleStartDateChange = (date) => {
        setDateStart(date)
        console.log('назначаю dateStart', dateStart)
    }

    const handleEndDateChange = (date) => {
        setDateEnd(date)
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
    }
    console.log(getDatesInRange(dateStart, dateEnd), '-интервал из функции, а dateStart=', dateStart);

    // функция по нажатию на кнопку
    const createRequesObject = (arrayIdInstruments) => {
        const dataRequest = {
            start_date: dateStart,
            end_date: dateEnd,
            site_id: arrayIdInstruments
        }
        console.log('dateStart по кнопке', dateStart)
        console.log(dataRequest);
    }


    return (
        <div className="resultsdone">
            <IntervalDate onStartDateChange={handleStartDateChange} onEndDateChange={handleEndDateChange} />
            <TableResultsDone onCreateRequesObject={createRequesObject} />
            <Splider dates={dates} />
        </div>
    )
}

export default ResultsDone;