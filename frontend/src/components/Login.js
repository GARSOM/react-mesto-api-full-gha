import React from "react"

export function Login({ onLogin }) {
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
        onLogin(email, password)
    }

    return (
        <div className="login">
            <form className="login__form" onSubmit={handleSubmit}>
                <h1 className="login__title">Вход</h1>
                <input
                    className="login__input"
                    placeholder="Email"
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleEmailInput}
                    required
                />
                <input
                    className="login__input"
                    placeholder="Пароль"
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={handlePasswordInput}
                    required
                />
                <button
                    type="submit"
                    className="login__submit">
                    Войти
                </button>
            </form>
        </div>
    )
}