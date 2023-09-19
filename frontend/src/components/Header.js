import logo from '../images/logo.svg'
import { Link } from 'react-router-dom'

export function Header({ title, route, email, onClick }) {
    return (
        <header className="header">
            <img src={logo} className="header__logo" alt="Логотип" />
            <div className='header__login'>
                <p className='header__login-email'>{email}</p>
                <Link
                    to={route}
                    className='header__login-exit'
                    onClick={onClick}
                >
                    {title}
                </Link>
            </div >
        </header>
    )
}