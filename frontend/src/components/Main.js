import React from "react";
import { Card } from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function Main(props) {
    const currentUser = React.useContext(CurrentUserContext)

    return (
        <main className="content">
            <section className="profile">
                <button onClick={props.onEditAvatar} className="profile__edit-avatar" type="button">
                    <img src={currentUser.avatar} className="profile__avatar" alt="Аватарка" />
                </button>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button onClick={props.onEditProfile} type="button" className="profile__button">
                    </button>
                    <p className="profile__nickname">{currentUser.about}</p>
                </div>
                <button onClick={props.onAddPlace} type="button" className="profile__add">
                </button>
            </section>
            <section className="photo">
                <ul className="photo__elements">
                    {props.cards.map((card) => (
                        <Card
                            card={card}
                            key={card._id}
                            onCardClick={props.onCardClick}
                            onCardLike={props.onCardLike}
                            onCardDelete={props.onCardDelete}
                        />
                    ))}
                </ul>
            </section>
        </main>
    )
}