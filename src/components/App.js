import React, {useState, useEffect} from 'react';
import { Routes, Route, Link} from "react-router-dom";
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from "./popups/ImagePopup.js";
import Api from '../utils/Api.js';
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./popups/EditProfilePopup.js";
import EditAvatarPopup from "./popups/EditAvatarPopup.js";
import AddCardPopup from "./popups/AddCardPopup.js";
import ConfirmPopup from "./popups/ConfirmPopup.js";
import Login from "./Login";
import Registry from "./Registry";

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

	const isOpen = isEditProfilePopupOpen || isEditAvatarPopupOpen || isAddCardPopupOpen || isImagePopupOpen || isConfirmPopupOpen;
	
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
			<Header />
			<Routes>
				<Route path="main"
				element={
					<Main cards={cards} onCardLike={handleCardLike} onCardDel={handleRemoveCard} onSelectCard={handleCardClick} onEditProfile={handleEditProfile} onEditAvatar={handleEditAvatar} onAddCard={handleAddCard} />
				} />
				{/*компоненты auth*/}
				<Route path="/sign-in" element={<Login />} />
				<Route path="/sign-up" element={<Registry />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
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
