import './App.css';
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
	
	const [isEditProfilePopupOpen, setEditProfilePopup] = useState(false);
	const [isEditAvatarPopupOpen, setEditAvatarPopup] = useState(false);
	const [isAddCardPopupOpen, setAddCardPopup] = useState(false);
	const [isImagePopupOpen, setImagePopup] = useState(false);
	const [selectedCard, setSelectedCard] = useState({});
	const [currentUser, setCurrentUser] = useState({});
	const [cards, setCards] = useState([]);
	
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
	
	/* Функции взаимодействия с API */
	function putProfileData ({name, about}) {
		Api.putProfileData(name, about)
			.then((res) => {
				setCurrentUser(res);
				closeAllPopups();
			}).catch((err) => console.log(err))
	}
	
	function putAvatar (url) {
		Api.putNewAvatar(url)
			.then((res) => {
				setCurrentUser({...currentUser, avatar: res.avatar});
				closeAllPopups();
			}).catch((err) => console.log(err))
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
	};
	
	function handleDelCard (card) {
		Api.removeCard(card._id)
			.then((res) => {
				setCards((state) => state.filter(item => item._id !== card._id)) // вернет массив без удаленной карточки
			}).catch((err) => console.log(err));
	}
	
	function putNewCard (name, link) {
		Api.putNewCard(name, link)
			.then((res) => {
				setCards([res, ...cards]);
				closeAllPopups();
			}).catch(err => console.log(err));
	}
	
	/* Функции открытия попапов */
	function handleCardClick (e) {setSelectedCard(e.target)};
	
	function handleEditProfile () {setEditProfilePopup(!isEditProfilePopupOpen)};
	
	function handleEditAvatar () {setEditAvatarPopup(!isEditAvatarPopupOpen)};
	
	function handleAddCard () {setAddCardPopup(!isAddCardPopupOpen)};
	
	function handleImagePopup () {setImagePopup(!isImagePopupOpen)};
	
	function closeAllPopups () {
	setEditAvatarPopup(false);
	setAddCardPopup(false);
	setEditProfilePopup(false);
	setImagePopup(false);
	setSelectedCard({});
	}
	
	function handlePressEsc (e) {
		if (e.key === 'Escape') {
			closeAllPopups();
		}
	}
	
	return (
		<CurrentUserContext.Provider value={currentUser}>
		
			<Header />
			<Main cards={cards} onCardLike={handleCardLike} onCardDel={handleDelCard} onSelectCard={handleCardClick} onEditProfile={handleEditProfile} onEditAvatar={handleEditAvatar} onAddCard={handleAddCard}  onImage={handleImagePopup}/>
			<Footer />
			
			<EditProfilePopup onSubmit={putProfileData} onPressEsc={handlePressEsc} onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} />
			<EditAvatarPopup onSubmit={putAvatar} onPressEsc={handlePressEsc} onClose={closeAllPopups}  isOpen={isEditAvatarPopupOpen} />
			<AddCardPopup onSubmit={putNewCard} onPressEsc={handlePressEsc} onClose={closeAllPopups} isOpen={isAddCardPopupOpen} />
			<PopupWithForm onPressEsc={handlePressEsc} onClose={closeAllPopups} title={"Вы уверены?"} name={"confirm"} buttonTitle={"Да"} />
			
			
			<ImagePopup onPressEsc={handlePressEsc} card={selectedCard} onClose={closeAllPopups} />
		</CurrentUserContext.Provider>
	);
}

export default App;
