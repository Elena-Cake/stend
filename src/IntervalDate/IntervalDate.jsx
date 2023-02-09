import React from "react";
import './IntervalDate.css';

const IntervalDate = ({onStartDateChange , onEndDateChange }) => {
    return (
        <div className="intervaldate">
            <h1 className="title">
                Интервал моделирования
            </h1>
            <div className="inputs__interval">
                <p className="inputs__text">c</p>
                <input className="inputs__date" type="date" onChange={(e)=>{onStartDateChange(e.target.value)}}/>
                <p className="inputs__text">по</p>
                <input className="inputs__date" type="date" onChange={(e)=>{onEndDateChange(e.target.value)}}/>
            </div>
        </div>
    )
}

export default IntervalDate;