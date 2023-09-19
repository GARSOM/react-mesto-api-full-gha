import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function Card(props) {
    const currentUser = React.useContext(CurrentUserContext)

    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id)

    const cardLikeButtonClassName = (
        `photo__like-button ${isLiked && 'photo__like-active'}`
    );

    function handleClick() {
        props.onCardClick(props.card);
    }
    function handleLikeClick() {
        props.onCardLike(props.card)
    }
    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }
    return (
        <li className="photo__white">
            {isOwn && <button onClick={handleDeleteClick} className="photo__basket" />}
            <img onClick={handleClick} className="photo__element" alt={props.card.name} src={props.card.link} />
            <div className="photo__under">
                <h2 className="photo__text">{props.card.name}</h2>
                <div className="photo__likes-info">
                    <button onClick={handleLikeClick} className={cardLikeButtonClassName}></button>
                    <p className="photo__counter-likes">{props.card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}