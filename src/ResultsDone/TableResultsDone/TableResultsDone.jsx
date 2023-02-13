
import './TableResultsDone.css';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


import configuration from '../../constans/configurations'

const TableResultsDone = ({ onCreateRequesObject, isErrorArrayIdInstruments }) => {
    const gridRef = useRef();

    const containerStyle = useMemo(() => ({ width: '100%', height: '74vh' }), []);
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
    );

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

    useEffect(() => {
        console.clear()
    }, []);

    const getSelectedRows = useCallback(() => {
        const arr = []
        gridRef.current.api.forEachNode(function (node) {
            node.isSelected() && arr.push(node.data.idInstruments);
        });
        onCreateRequesObject(arr)
    }, []);

    return (
        <div className='table'>
            <div style={containerStyle}>
                <div style={gridStyle} className="ag-theme-alpine ">
                    <AgGridReact
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        rowSelection='multiple'
                    ></AgGridReact>
                </div>
            </div>
            {isErrorArrayIdInstruments &&
                <span className="error">Выберете инстументы для проведения моделирования</span>}
            <button className="button" onClick={getSelectedRows}>Запустить расчет</button>
        </div>
    )
}

export default TableResultsDone;