import React from "react";
import IntervalDate from "../IntervalDate/IntervalDate";
import Splider from "./Splider/Splider";
import './ResultsDone.css';
import TableResultsDone from "./TableResultsDone/TableResultsDone";

const ResultsDone = () => {
    return (
        <div className="resultsdone">
            <IntervalDate />
            <TableResultsDone />
            <Splider />
        </div>
    )
}

export default ResultsDone;