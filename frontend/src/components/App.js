import React, { useEffect } from 'react';
import '../index';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer'
import { PopupWithForm } from './PopupWithForm';
import { ImagePopup } from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';
import { Register } from './Register';
import { Login } from './Login'
import { ProtectedRoute } from './ProtectedRoute'
import * as auth from '../utils/auth'
import { InfoTooltip } from './InfoTooltip'
import { Route, Routes, useNavigate, Navigate } from 'react-router';
import checkmarkImg from '../images/success.svg'
import crossImg from '../images/fail.svg'
import { ConfirmationPopup } from './ConfirmationPopup';
function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})
  const [currentUser, setCurrentUser] = React.useState({})
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = React.useState(null);
  const [cards, setCards] = React.useState([])
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [emailValue, setEmailValue] = React.useState(null)
  const [popupStatus, setPopupStatus] = React.useState({ image: '', message: '' });
  const [infoTooltip, setInfoTooltip] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate()

  function handleLogin(email, password) {
    auth.authorize({ email, password })
      .then((res) => {
        localStorage.setItem('jwt', res.token)
        setIsLoggedIn(true)
        setEmailValue(email)
        navigate("/")
      })
      .catch(() => {
        setPopupStatus({ image: crossImg, message: 'Что-то пошло не так! Попробуйте еще раз.' });
        handleInfoTooltip();
      })
  }

  function handleRegister(email, password) {
    auth.register(email, password)
      .then(() => {
        setPopupStatus({ image: checkmarkImg, message: 'Вы успешно зарегистрировались!' });
        navigate("/sign-in");
      })
      .catch(() => {
        setPopupStatus({ image: crossImg, message: 'Что-то пошло не так! Попробуйте еще раз.' });
      })
      .finally(handleInfoTooltip);
  };

  function handleLogOut() {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    setEmailValue(null);
    navigate("/sign-in");
  };

  function handleInfoTooltip() {
    setInfoTooltip(true);
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setEmailValue(res.data.email);
            navigate('/');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      Promise
        .all([api.getInitialsCards(), api.getDataUser()])
        .then(([cards, data]) => {
          setCards(cards)
          setCurrentUser(data)
        }).catch(console.error)
    }
  }, [isLoggedIn])

  function handleAddPlaceSubmit(data) {
    setIsLoading(true)
    api
      .setNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      }).catch(console.error)
      .finally(() => { setIsLoading(false) })
  }
  function handleUpdateUser(data) {
    api
      .setUserData(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(console.error)
  }
  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups();
      })
      .catch(console.error)
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      api.setLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        }).catch(console.error)
    } else {
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        }).catch(console.error)
    }
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id)
        setCards(newCards)
        closeAllPopups();
      }).catch(console.error)
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }
  function handleConfimationClick(card) {
    setConfirmationPopupOpen(card);
  }
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({});
    setConfirmationPopupOpen(null)
    setInfoTooltip(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route exact path='/'
            element={
              <>
                <Header
                  title='Выйти'
                  route=''
                  email={emailValue}
                  onClick={handleLogOut}
                />

                <ProtectedRoute
                  component={Main}
                  isLoggedIn={isLoggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleConfimationClick}
                  cards={cards}
                />
              </>
            }
          />
          <Route path='/sign-up'
            element={
              <>
                <Header
                  title='Войти'
                  route='/sign-in'
                />
                <Register
                  onRegister={handleRegister}
                />
              </>
            }
          />
          <Route path='/sign-in'
            element={
              <>
                <Header
                  title='Регистрация'
                  route='/sign-up'
                />
                <Login
                  onLogin={handleLogin} />
              </>
            } />
          <Route exact path='*'
            element={
              isLoggedIn ? <Navigate to='/' /> : <Navigate to='/sign-in' />
            }
          />
        </Routes>

        <Footer />
        <InfoTooltip
          popupStatus={popupStatus}
          isOpen={infoTooltip}
          onClose={closeAllPopups}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isLoading={isLoading}
          cards={cards}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ConfirmationPopup
          card={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          name='confirm-delete'
          title='Вы уверены?'
          onCardDelete={handleCardDelete}
        />
        <PopupWithForm
          name='confirmation'
          onClose={closeAllPopups}
          buttonText={'Да'}
        >
        </PopupWithForm>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
