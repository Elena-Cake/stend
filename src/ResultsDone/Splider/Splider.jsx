import React, { useState } from "react";
import {
    BarChart, Bar, Cell, XAxis,
    YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer, Brush
} from 'recharts';
import './Splider.css';

const Splider = ({ dates }) => {
    const [data, setData] = useState({ one: [1, 2, 5, 6], two: [2, 5, 6, 7], three: [8, 5, 2, 1] });
    const [activeSlide, setActiveSlide] = useState(0);

    // список ключей ответа
    const keys = []
    for (let key in data) {
        keys.push(key)
    };
    // формирование опций для переключения
    const options = keys.map((key, i) => <option className="charts__option" value={i}>{key}</option>);

    const slideElements = keys.map((key, i) => {
        // формирование массива объектов для граффиков
        const dataChart = []
        data[key].map((item, i) => {
            dataChart.push({
                name: dates[i],
                data: data[key][i]
            })
        })

        return (
            <div key={i} className={`slide ${activeSlide == i && 'slide_active'}`}>
                <BarChart
                    width={700}
                    height={520}
                    data={dataChart}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" label={{ value: "dates" }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Brush dataKey="name" height={30} stroke="#8884d8" />
                    <Bar dataKey="data" fill="#8884d8" />
                </BarChart>
            </div>
        )
    })

    // кнопки переключения слайдов
    const onHandleNext = () => {
        const activeSlideChange = activeSlide + 1
        activeSlideChange <= keys.length - 1 ?
            setActiveSlide(activeSlideChange) :
            setActiveSlide(0)
    }
    const onHandlePrev = () => {
        const activeSlideChange = activeSlide - 1
        activeSlideChange >= 0 ?
            setActiveSlide(activeSlideChange) :
            setActiveSlide(keys.length - 1)
    }

    return (
        <div className="charts">
            <select className="charts__select" onChange={(event) => setActiveSlide(event.target.value)}>
                {options}
            </select>
            <p className="charts__title">
                {keys[activeSlide]}
            </p>
            <div className="slider">
                {slideElements}
            </div>
            <div className="charts__btns">
                <button className="charts__btn" onClick={onHandlePrev}>prev</button>
                <button className="charts__btn" onClick={onHandleNext}>next</button>
            </div>
        </div >
    )
}

export default Splider;
