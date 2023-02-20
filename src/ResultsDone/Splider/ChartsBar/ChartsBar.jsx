import React, { useState } from "react";
import {
    BarChart, Bar, XAxis,
    YAxis, CartesianGrid, Tooltip, Legend,
    Brush
} from 'recharts';

const ChartsBar = ({ activeSlide, dataChart, i }) => {

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
}


export default ChartsBar;
