export function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_type_show-image ${card.link ? 'popup_opened' : ''}`}>
            <div className="popup__contain-show-image">
                <button onClick={onClose} type="button" id="popup__close_show-image" className="popup__close"></button>
                <img className="popup__img" alt={card ? card.name : ''} src={card.link} />
                <p className="popup__caption">{card ? card.name : ''}</p>
            </div>
        </div >
    )
}