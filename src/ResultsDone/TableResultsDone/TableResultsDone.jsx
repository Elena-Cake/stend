
import './TableResultsDone.css';
import React, { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


import configuration from '../../constans/configurations'

const TableResultsDone = ({ }) => {

    const containerStyle = useMemo(() => ({ width: '100%', height: '70vh' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    const changeResStructure = (res) => {
        const rowDataGenerated = [];
        for (let key in res.configurations) {
            for (let keyInst in res.configurations[key].instruments) {
                const item = {
                    idInstruments: keyInst,
                    name: res.configurations[key].instruments[keyInst].name,
                    latitude: res.configurations[key].instruments[keyInst].latitude,
                }
                rowDataGenerated.push(item)
            }
        }
        return rowDataGenerated
    }

    changeResStructure(configuration)


    const [rowData, setRowData] = useState(
        changeResStructure(configuration)
    ); // Set rowData to Array of Objects, one Object per Row

    // Each Column Definition results in one Column.
    const [columnDefs, setColumnDefs] = useState([
        { field: 'idInstruments', checkboxSelection: true },
        { field: 'name' },
        { field: 'latitude' }
    ]);


    const defaultColDef = useMemo(() => {
        return {
            minWidth: 80,
            width: 100,
            resizable: true,
        };
    }, []);

    const handleClickTableCheck = () => {

    }

    // посмотреть функцию по массиву дат
    function getDatesInRange(startDate, endDate) {
        const date = new Date(startDate.getTime());

        date.setDate(date.getDate() + 1);

        const dates = [];

        while (date < endDate) {
            dates.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }

        return dates;
    }

    const d1 = new Date('2022-08-29');
    const d2 = new Date('2022-09-01');

    console.log(getDatesInRange(d1, d2));


    return (
        <>
            <div style={containerStyle}>
                <div style={gridStyle} className="ag-theme-alpine ">
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        rowSelection='multiple'
                    ></AgGridReact>
                </div>
            </div>
            <button className="button" onClick={handleClickTableCheck}>Запустить расчет</button>
        </>
    )
}

export default TableResultsDone;