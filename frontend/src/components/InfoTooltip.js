import React from 'react'

export function InfoTooltip({ popupStatus, isOpen, onClose }) {
    return (
        <section className={`popup popup_type_infoTooltip ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button onClick={onClose} className="popup__close" type="button"></button>
                <img src={popupStatus.image} alt={`Информационное сообщение: ${popupStatus.message}`} className="popup__icon" />
                <p className="popup__icon-caption">{popupStatus.message}</p>
            </div>
        </section>
    )
}

export default InfoTooltip