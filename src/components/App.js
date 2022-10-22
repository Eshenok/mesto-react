import React, {useState, useEffect} from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import Api from '../utils/Api.js';
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup";
import AddCardPopup from "./AddCardPopup";

function App() {
	
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
	const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState({});
	const [currentUser, setCurrentUser] = useState({});
	const [cards, setCards] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	
	const isOpen = isEditProfilePopupOpen || isEditAvatarPopupOpen || isAddCardPopupOpen || isImagePopupOpen;
	
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
	
	function handleDelCard (card) {
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
	
	function closeAllPopups () {
		setIsEditAvatarPopupOpen(false);
		setIsAddCardPopupOpen(false);
		setIsEditProfilePopupOpen(false);
		setIsImagePopupOpen(false);
		setSelectedCard({});
	}
	
	return (
		<CurrentUserContext.Provider value={currentUser}>
			<Header />
			<Main cards={cards} onCardLike={handleCardLike} onCardDel={handleDelCard} onSelectCard={handleCardClick} onEditProfile={handleEditProfile} onEditAvatar={handleEditAvatar} onAddCard={handleAddCard} />
			<Footer />
			{/*компоненты попапов*/}
			<EditProfilePopup buttonTitle={isLoading ? 'Сохранение...' : 'Сохранить'} onSubmit={putProfileData} onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} />
			<EditAvatarPopup buttonTitle={isLoading ? 'Сохранение...' : 'Сохранить'} onSubmit={putAvatar} onClose={closeAllPopups}  isOpen={isEditAvatarPopupOpen} />
			<AddCardPopup buttonTitle={isLoading ? 'Создаем...' : 'Создать'} onSubmit={putNewCard} onClose={closeAllPopups} isOpen={isAddCardPopupOpen} />
			<PopupWithForm onClose={closeAllPopups} title={"Вы уверены?"} name={"confirm"} buttonTitle={"Да"} />
			<ImagePopup card={selectedCard} onClose={closeAllPopups} />
		</CurrentUserContext.Provider>
	);
}

export default App;
