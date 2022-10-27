import React, {useState, useEffect} from 'react';
import {Route, useHistory, Redirect, Switch} from "react-router-dom";
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

function App() {
	
	const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
	const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState({});
	const [currentUser, setCurrentUser] = useState({});
	const [cards, setCards] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentCard, setCurrentCard] = useState('');
	const [loggedIn, setLoggedIn] = useState(false);
	const isOpen = isEditProfilePopupOpen || isEditAvatarPopupOpen || isAddCardPopupOpen || isImagePopupOpen || isConfirmPopupOpen;
	const history = useHistory();
	
	
	useEffect(() => {
		Api.preloadData()
			.then(([userInfo, initialCards]) => {
				setCurrentUser(userInfo);
				setCards(initialCards);
			})
			.catch((err) => {
				console.log(err);
			})
	}, []);
	
	useEffect(() => {
		function handlePressEsc(e) {
			if (e.key === 'Escape') {
				closeAllPopups();
			}
		}
		if (isOpen) {
			document.addEventListener('keydown', handlePressEsc);
			return () => {
				document.removeEventListener('keydown', handlePressEsc);
			}
		}
	}, [isOpen])
	
	useEffect(() => {
		console.log('useEffect')
		tokenCheck();
	}, [])
	
	/*функции auth*/
	function tokenCheck() {
		const jwt = localStorage.getItem('jwt');
		if (jwt) {
			Auth.getContent(jwt).then((res) => {
				if(res) {
					setLoggedIn(true);
					history.push('/main');
				}
			})
		}
	}
	
	function handleSubmitRegistry(email, pass) {
		console.log('reg')
		Auth.registry(email, pass).then((res) => {
			console.log(res)
			history.push('/sign-in');
		}).catch((err) => {console.log(err)})
	}
	
	function handleSubmitSignIn(email, pass) {
		console.log('log')
		Auth.authorize(email, pass).then((res) => {
			console.log(res);
			setLoggedIn(true);
			localStorage.setItem('jwt', res);
			history.push('/main');
			console.log(loggedIn);
		}).catch((err) => {console.log(err)})
	}
	
	/* Функции взаимодействия с API */
	function putProfileData ({name, about}) {
		setIsLoading(true)
		Api.putProfileData(name, about)
			.then((res) => {
				setCurrentUser(res);
				closeAllPopups();
			})
			.catch((err) => console.log(err))
			.finally(() => {setIsLoading(false);})
	}
	
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
		if (!isLiked) {
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
			<Header link={history.location.pathname} loggedIn={loggedIn}/>
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
		</CurrentUserContext.Provider>
	);
}

export default App;
