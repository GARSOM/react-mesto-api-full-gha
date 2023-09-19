export function PopupWithForm(props) {

    return (
        <div className={`popup popup_${props.name}${props.isOpen ? ' popup_opened' : ''}`}>
            <div className={`popup__container popup__container-${props.name}`}>
                <button onClick={props.onClose} type="button" className={`popup__close popup__close_${props.name}`} />
                <form onSubmit={props.onSubmit} name={`popup-form-${props.name}`} className={`popup__form popup__form_${props.name}`} >
                    <h3 className="popup__text">{props.title}</h3>
                    {props.children}
                    <button onSubmit={props.handleSubmit} type="submit" className="popup__submit">{props.isLoading ? props.submitBtnLoading : props.buttonText}</button>
                </form>
            </div>
        </div>
    )
}