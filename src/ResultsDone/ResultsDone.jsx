import React, { useState } from "react";
import IntervalDate from "../IntervalDate/IntervalDate";
import Splider from "./Splider/Splider";
import './ResultsDone.css';
import TableResultsDone from "./TableResultsDone/TableResultsDone";

const ResultsDone = () => {

    const [dates, setDates] = useState([]);
    const [dateStart, setDateStart] = useState('')
    const [dateEnd, setDateEnd] = useState('')
    
    const handleStartDateChange =(date)=>{
        setDateStart(date)
    }

    const handleEndDateChange =(date)=>{
        setDateEnd(date)
    }

      // посмотреть функцию по массиву дат
      function getDatesInRange(startDate, endDate) {
        
        startDate = new Date(startDate);
        endDate = new Date(endDate);
        const date = new Date(startDate.getTime());
        const datesInInterval = [];

        while (date < endDate) {
            const dateFull = new Date(date);
            datesInInterval.push(dateFull.toLocaleDateString())
            date.setDate(date.getDate() + 1);
        }
        return datesInInterval;
    }

    console.log(getDatesInRange(dateStart, dateEnd));


  
    return (
        <div className="resultsdone">
            <IntervalDate onStartDateChange={handleStartDateChange} onEndDateChange={handleEndDateChange}/>
            <TableResultsDone />
            <Splider dates={dates}/>
        </div>
    )
}

export default ResultsDone;