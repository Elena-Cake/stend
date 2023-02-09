import React from "react";
import './IntervalDate.css';

const IntervalDate = () => {
    return (
        <div className="intervaldate">
            <h1 className="title">
                Интервал моделирования
            </h1>
            <div className="inputs__interval">
                <p className="inputs__text">c</p>
                <input className="inputs__date" type="date" />
                <p className="inputs__text">по</p>
                <input className="inputs__date" type="date" />
            </div>
        </div>
    )
}

export default IntervalDate;