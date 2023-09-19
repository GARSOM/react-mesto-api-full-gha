import { PopupWithForm } from "./PopupWithForm"
import React from "react";

export function AddPlacePopup(props) {
    const [name, setName] = React.useState('')
    const [link, setLink] = React.useState('')

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen])

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onAddPlace({ name, link })
    }
    return (
        <PopupWithForm
            name='add-place'
            onSubmit={handleSubmit}
            isOpen={props.isOpen}
            onClose={props.onClose}
            buttonText={props.isLoading ? 'Создаем' : 'Создать'}
            submitBtnLoading={'dad'}
            title='Новое место'
        >

            <input
                value={name || ''}
                onChange={(evt) => setName(evt.target.value)}
                name="nameImg"
                placeholder="Название"
                type="text"
                id="input-text"
                className="popup__input popup__input_place-name" />
            <span className="popup__input-error" id="error-input-text"></span>
            <input
                value={link || ''}
                onChange={(evt) => setLink(evt.target.value)}
                name="linkImg"
                placeholder="Ссылка на картинку"
                type="url" id="input-link"
                className="popup__input popup__input_place-link" />
            <span className="popup__input-error" id="error-input-link">Введите адрес сайта.</span>
        </PopupWithForm>
    )
}