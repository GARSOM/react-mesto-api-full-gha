import { CurrentUserContext } from "../contexts/CurrentUserContext"
import React from "react"
import { PopupWithForm } from "./PopupWithForm"

export function EditProfilePopup(props) {
    const [name, setName] = React.useState(' ')
    const [description, setDescription] = React.useState(' ')
    const currentUser = React.useContext(CurrentUserContext)

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen])
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description
        })
    }
    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            name='profile'
            isOpen={props.isOpen}
            onClose={props.onClose}
            buttonText={'Сохранить'}
            onUpdateUser={props.onUpdateUser}
            title='Редактировать профиль'
        >
            <input
                value={name || ' '}
                onChange={(e) => setName(e.target.value)}
                id="input-name"
                type="text"
                name="name"
                className="popup__input popup__input-name"
                placeholder="Имя" />
            <span className="popup__input-error" id="error-input-name"></span>
            <input
                value={description || ' '}
                onChange={(e) => setDescription(e.target.value)}
                name="about"
                type="text"
                id="input-job"
                className="popup__input popup__input-job"
                placeholder="О себе" />
            <span className="popup__input-error" id="error-input-job"></span>
        </PopupWithForm>
    )
}