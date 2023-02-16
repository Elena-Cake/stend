import React from "react";
import '../LoadingPopup/LoadingPopup.css';

const InfoPopup = ({ isOpen, onClose, textPopup }) => {
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
                    <h3 className={`popup__title ${textPopup.isError && 'popup__title_type_error'}`}>{textPopup.text}</h3>
                </form>
            </div>
        </div>
    )
}

export default InfoPopup;