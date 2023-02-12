import React from "react";
import './Loader.css';

const Loader = ({ isVisible }) => {

    return (
        <div className={`loader ${isVisible && 'loader_visible'}`} >
        </div >
    )
}

export default Loader;
