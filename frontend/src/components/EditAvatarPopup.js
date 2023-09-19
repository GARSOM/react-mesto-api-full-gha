import { PopupWithForm } from "./PopupWithForm"
import React, { useRef } from "react";

export function EditAvatarPopup(props) {
    const avatarInput = useRef('');

    React.useEffect(() => {
        avatarInput.current.value = ' ';
    }, [props.isOpen]);
    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarInput.current.value,
        })
    }
    return (
        <PopupWithForm
            name='avatar'
            isOpen={props.isOpen}
            onClose={props.onClose}
            buttonText={'Сохранить'}
            onSubmit={handleSubmit}
            title='Обновить аватар'
        >
            <input
                ref={avatarInput}
                id="avatar-url"
                type="url"
                required
                placeholder="Ссылка на изображение"
                name="avatar"
                className="popup__input popup__input-edit-avatar-link" />
            <span className="popup__input-error" id="error-avatar-url"></span>
        </PopupWithForm>
    )
}