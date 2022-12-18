// Импорты
import React, {useState, useEffect} from 'react';
import {Route, useHistory, Redirect, Switch, useRouteMatch} from "react-router-dom";
import Header from './Header.js';
import Main from './pages/Main.js';
import Footer from './Footer.js';
import ImagePopup from "./popups/ImagePopup.js";
import Api from '../utils/Api.js';
import Auth from "../utils/Auth.js";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./popups/EditProfilePopup.js";
import EditAvatarPopup from "./popups/EditAvatarPopup.js";
import AddCardPopup from "./popups/AddCardPopup.js";
import ConfirmPopup from "./popups/ConfirmPopup.js";
import Login from "./pages/Login";
import Registry from "./pages/Registry";
import ProtectedRoute from "./pages/ProtectedRoute";
import NotFound from "./pages/NotFound";
import InfoTooltip from "./popups/InfoTooltip.js";

function App() {

	// Стейты
	const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
	const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
	const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState({open: false, status: false});
	const [selectedCard, setSelectedCard] = useState({});
	const [currentUser, setCurrentUser] = useState({});
	const [cards, setCards] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentCard, setCurrentCard] = useState(null);
	const [loggedIn, setLoggedIn] = useState(false);
	const [email, setEmail] = useState('');


	const isOpen = isEditProfilePopupOpen || isEditAvatarPopupOpen || isAddCardPopupOpen || isImagePopupOpen || isConfirmPopupOpen || isSuccessPopupOpen.open;
	const history = useHistory(); // Хук для истории перехода по ссылкам
	let {path, url} = useRouteMatch(); // По факту не используется, но только с ним работает приложение

	/* Хуки effect */

	// Хук предзагрузки данных
	useEffect(() => {
		if (loggedIn) {
			Api.preloadData()
				.then(([userInfo, initialCards]) => {
					setCurrentUser(userInfo);
					setCards(initialCards);
				})
				.catch((err) => {
					console.log(err);
				})
		}
	}, [loggedIn]);

	// Хук навышивания слушателя для Esc
	useEffect(() => {
		function handlePressEsc(e) {
			if (e.key === 'Escape') {
				closeAllPopups();
			}
		}
		if (isOpen) {
			// Сработает только если попап открыт
			document.addEventListener('keydown', handlePressEsc);
			return () => {
				document.removeEventListener('keydown', handlePressEsc);
			}
		}
	}, [isOpen])

	// Хук для получения инфу пользователя, только если кука есть
	useEffect(() => {
		if (!loggedIn) {
			getUser();
		}
	}, []);
	
	/*функции auth*/
	function getUser() {
		Auth.getCurrentUser()
			.then((res) => { // Получаем контент
			setEmail(res.email); // Записываем в state email
			setLoggedIn(true); // Переключаем state залогинен ли пользователь
			history.push('/main'); // Переходим на /main
		})
			.catch((err) => {console.log(err)});
		}

	// Регистрация пользователя
	function handleSubmitRegistry(email, pass) {
		Auth.registry(email, pass).then((res) => {
			setIsSuccessPopupOpen({open: true, status: true}) // Переключаем state
			history.push('/sign-in'); // После регистрации переходим на логинг
		})
			.catch((err) => setIsSuccessPopupOpen({open: true, status: false}));
	}

	// Авторизация (логинг)
	function handleSubmitSignIn(email, pass) {
		Auth.authorize(email, pass).then((res) => {
			setEmail(email); // Устанавливаем state email
			setLoggedIn(true); // Переключаем state залогинен ли пользваотель
			history.push('/main'); // Переключаем на /main
		})
			.catch((err) => setIsSuccessPopupOpen({open: true, status: false}))
	}

	// Выход
	function handleSignOut() {
		Auth.logout()
			.then((res) => {
				history.push('/sign-in'); // Перекидываем на логинг
				setLoggedIn(false); // Переключаем state залогинен ли пользователь
			})
			.catch((err) => {
				console.log(err);
				setIsSuccessPopupOpen({ open: true, status: false })})
	}
	
	/* Функции взаимодействия с API */

	// Передаем новые данные юзера
	function putProfileData ({name, about}) {
		setIsLoading(true) // Запускаем загрузку
		Api.putProfileData(name, about)
			.then((res) => {
				setCurrentUser(res);
				closeAllPopups();
			})
			.catch((err) => console.log(err))
			.finally(() => {setIsLoading(false);}) // Когда все прошло вырубаем загрузку
	}

	// Передаем новый аватар
	function putAvatar (url) {
		setIsLoading(true)
		Api.putNewAvatar(url)
			.then((res) => {
				setCurrentUser({...currentUser, avatar: res.avatar});
				closeAllPopups();
			})
			.catch((err) => console.log(err))
			.finally(() => {setIsLoading(false);})
	}
	
	/* Card */
	function handleCardLike(card, isLiked) {
		if (!isLiked) { // Если карточка не лайкнута
			Api.putLike(card._id)
				.then((res) => {
					setCards((state) => state.map((c) => c._id === card._id ? res : c));
				}).catch(err => console.log(err));
		} else {
			Api.removeLike(card._id)
				.then((res) => {
					setCards((state) => state.map((c) => c._id === card._id ? res : c)); // изменит в массиве только нужную карточку
				}).catch(err => console.log(err));
		}
	}
	
	function removeCard (card) {
		Api.removeCard(card._id)
			.then(() => {
				setCards((state) => state.filter(item => item._id !== card._id)) // вернет массив без удаленной карточки
			}).catch((err) => console.log(err));
	}
	
	function putNewCard (name, link) {
		setIsLoading(true);
		Api.putNewCard(name, link)
			.then((res) => {
				setCards([res, ...cards]);
				closeAllPopups();
			})
			.catch(err => console.log(err))
			.finally(() => {setIsLoading(false);});
	}
	
	/* Функции открытия попапов */
	function handleCardClick (e) {
		setSelectedCard(e.target);
		setIsImagePopupOpen(!isImagePopupOpen)
	}
	
	function handleEditProfile () {setIsEditProfilePopupOpen(!isEditProfilePopupOpen)}
	function handleEditAvatar () {setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)}
	function handleAddCard () {setIsAddCardPopupOpen(!isAddCardPopupOpen)}
	function handleRemoveCard (card) {
		setIsConfirmPopupOpen(!isConfirmPopupOpen);
		setCurrentCard(card);
	}
	
	function closeAllPopups () {
		setIsSuccessPopupOpen({...isSuccessPopupOpen, open: false});
		setIsConfirmPopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsAddCardPopupOpen(false);
		setIsEditProfilePopupOpen(false);
		setIsImagePopupOpen(false);
		setSelectedCard({});
	}
	
	function submitRemoveCard () {
		Api.removeCard(currentCard._id)
			.then(() => {
				setCards((state) => state.filter(item => item._id !== currentCard._id));// вернет массив без удаленной карточки
				closeAllPopups();
			}).catch((err) => console.log(err));
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<InfoTooltip status={true} onClose={closeAllPopups}/>
			<Header onClose={handleSignOut} email={email} link={history.location.pathname} loggedIn={loggedIn}/>
				<Switch>
					<ProtectedRoute
						path="/main"
						component={Main}
						cards={cards}
						onCardLike={handleCardLike}
						onCardDel={handleRemoveCard}
						onSelectCard={handleCardClick}
						onEditProfile={handleEditProfile}
						onEditAvatar={handleEditAvatar}
						onAddCard={handleAddCard}
						loggedIn={loggedIn}
					/>
					{/*компоненты auth*/}
					<Route path="/sign-in">
						{loggedIn ? <Redirect to="/main" /> : <Login history={history} onSubmit={handleSubmitSignIn} />}
					</Route>
					
					<Route path="/sign-up">
						{loggedIn ? <Redirect to="/main" /> : <Registry history={history} onSubmit={handleSubmitRegistry} />}
					</Route>
					
					<Route exact path="/">
						{loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" /> }
					</Route>
					
					<Route path="*">
						<NotFound />
					</Route>
				</Switch>
			{loggedIn ? <Footer /> : <></>}
			{/*компоненты попапов*/}
			<EditProfilePopup buttonTitle={isLoading ? 'Сохранение...' : 'Сохранить'} onSubmit={putProfileData} onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} />
			<EditAvatarPopup buttonTitle={isLoading ? 'Сохранение...' : 'Сохранить'} onSubmit={putAvatar} onClose={closeAllPopups}  isOpen={isEditAvatarPopupOpen} />
			<AddCardPopup buttonTitle={isLoading ? 'Создаем...' : 'Создать'} onSubmit={putNewCard} onClose={closeAllPopups} isOpen={isAddCardPopupOpen} />
			<ConfirmPopup onClose={closeAllPopups} isOpen={isConfirmPopupOpen} onSubmit={submitRemoveCard} />
			<ImagePopup card={selectedCard} onClose={closeAllPopups} />
			<InfoTooltip status={isSuccessPopupOpen.status} isOpen={isSuccessPopupOpen.open} onClose={closeAllPopups}/>
		</CurrentUserContext.Provider>
	);
}

export default App;
