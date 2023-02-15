import React from "react";
import './LoadingPopup.css';

const LoadingPopup = ({ isOpen, onClose, dataLog, textPopup }) => {
    const classPopup = `popup popup-addNS  ${isOpen ? 'popup_opened' : ''}`
    return (
        <div className={classPopup}>
            <div className="popup__container popup__warning">
                <button onClick={onClose}
                    className="popup__btn-close"
                    type="button"
                    aria-label="закрыть окно">
                </button>
                <form className="popup__form" name="addPopup" >
                    <h3 className="popup__title">{textPopup}</h3>
                    <div className="popup__text"></div>
                    <div className="popup__log">
                        {dataLog}
                    </div>
                    <button className=" popup__button">Прервать текущий расчет</button>
                </form>
            </div>
        </div>
    )
}

export default LoadingPopup;