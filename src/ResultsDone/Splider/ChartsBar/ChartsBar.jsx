
import './ChartsBar.css';

import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const data = [
    {
        name: '1',
        uv: 4000,
        amt: 2400,
    },
    {
        name: '2',
        uv: 3000,
        amt: 2210,
    },
    {
        name: '3',
        uv: 2000,
        amt: 2290,
    },
    {
        name: '4',
        uv: 2780,
        amt: 2000,
    },
    {
        name: '5',
        uv: 1890,
        amt: 2181,
    },
    {
        name: '6',
        uv: 2390,
        amt: 2500,
    },
    {
        name: '7',
        uv: 3490,
        amt: 2100,
    },
];


export default class ChartsBar extends PureComponent {
    static demoUrl = 'https://codesandbox.io/s/bar-chart-with-double-yaxis-zr232';

    render() {
        return (
            <div className='charts__container'>
                <BarChart
                    width={650}
                    height={700}
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="right" dataKey="uv" fill="#82ca9d" />
                </BarChart>
            </div>
        );
    }
}

