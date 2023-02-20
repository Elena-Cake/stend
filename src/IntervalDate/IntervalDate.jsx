import React, { useState } from "react";
import './IntervalDate.css';

const IntervalDate = ({ onStartDateChange, onEndDateChange, isErrorInputDateFrom, isErrorInputDateTo }) => {


    return (
        <div className="intervaldate">
            <h1 className="title">
                Интервал дат
            </h1>
            <div className="inputs__interval">
                <p className="inputs__text">c</p>
                <div className="error__wrapper">
                    {isErrorInputDateFrom &&
                        <span className="error">Это поле обязательное</span>}
                    <input className={`input__date ${isErrorInputDateFrom && 'input_wrong'}`} type="date" onChange={(e) => { onStartDateChange(e.target.value) }} />
                </div>
                <p className="inputs__text">до</p>
                <div className="error__wrapper">
                    {isErrorInputDateTo &&
                        <span className="error">Это поле обязательное</span>}
                    <input className={`input__date ${isErrorInputDateTo && 'input_wrong'}`} type="date" onChange={(e) => { onEndDateChange(e.target.value) }} />
                </div>
            </div>
        </div>
    )
}

export default IntervalDate;