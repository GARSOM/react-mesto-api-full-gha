export function ConfirmationPopup({ card, onClose, name, title, onCardDelete }) {

    function handleDeleteClick() {
        onCardDelete(card)
    }

    return (
        <section className={`popup popup_${name} ${card && 'popup_opened'}`}>
            <div className="popup__container">
                <button onClick={onClose} className="popup__close" type="button"></button>
                <div className="popup__form">
                    <h3 className="popup__title">{title}</h3>
                    <button onClick={handleDeleteClick} className="popup__submit" type="submit">Да</button>

                </div>
            </div>
        </section>
    )
}; 