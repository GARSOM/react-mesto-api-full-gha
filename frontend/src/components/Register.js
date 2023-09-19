import React from "react"
import { Link } from "react-router-dom"

export function Register({ onRegister }) {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    function handlePasswordInput(e) {
        setPassword(e.target.value)
    }

    function handleEmailInput(e) {
        setEmail(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        onRegister(email, password)
    }

    return (
        <div className="login">
            <form className="login__form" onSubmit={handleSubmit}>
                <h1 className="login__title">Регистрация</h1>
                <input
                    name="email"
                    className="login__input"
                    placeholder="Email"
                    type='email'
                    value={email}
                    onChange={handleEmailInput}
                    required
                />
                <input
                    name="password"
                    className="login__input"
                    placeholder="Пароль"
                    type='password'
                    value={password}
                    onChange={handlePasswordInput}
                    required
                />
                <button
                    className="login__submit"
                    type="submit"
                >
                    Зарегистрироваться
                </button>
                <p className="login__caption">Уже зарегистрированы?
                    <Link className="login__caption-auth" to='/sign-in'> Войти</Link>
                </p>
            </form>
        </div>
    )
}
