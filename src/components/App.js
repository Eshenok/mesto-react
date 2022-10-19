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

function App() {
	
	const [isEditProfilePopupOpen, setEditProfilePopup] = useState(false);
	const [isEditAvatarPopupOpen, setEditAvatarPopup] = useState(false);
	const [isAddCardPopupOpen, setAddCardPopup] = useState(false);
	const [isImagePopupOpen, setImagePopup] = useState(false);
	const [selectedCard, setSelectedCard] = useState({});
	const [currentUser, setCurrentUser] = useState({});
	
	useEffect(() => {
		Api.getUserInfo()
			.then((res) => {
				setCurrentUser(res);
			})
			.catch((err) => {console.log(err)})
	}, []);
	
	function handlePressEsc (e) {
		if (e.key === 'Escape') {
			closeAllPopups();
		}
	}
	
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
	
	return (
		<CurrentUserContext.Provider value={currentUser}>
		
			<Header />
			<Main onSelectCard={handleCardClick} onEditProfile={handleEditProfile} onEditAvatar={handleEditAvatar} onAddCard={handleAddCard}  onImage={handleImagePopup}/>
			<Footer />
			
			<EditProfilePopup onPressEsc={handlePressEsc} onClose={closeAllPopups}  isOpen={isEditProfilePopupOpen} />
			
			<PopupWithForm onPressEsc={handlePressEsc} onClose={closeAllPopups} title={"Обновить аватар"} name={"profile-image"} buttonTitle={"Сохранить"} isOpen={isEditAvatarPopupOpen}>
				<div className="popup__label">
					<input type="url" id="popup__input-profile-image"
					       className="popup__input popup__input_type_profile-image" name="popup__input_type_profile-image"
					       required placeholder="Ссылка на картинку"/>
					<span className="popup__input-span-error popup__input-profile-image-error"> </span>
				</div>
			</PopupWithForm>
			
			<PopupWithForm onPressEsc={handlePressEsc} onClose={closeAllPopups} title={"Вы уверены?"} name={"confirm"} buttonTitle={"Да"} />
			<PopupWithForm onPressEsc={handlePressEsc} onClose={closeAllPopups} title={"Новое место"} name={"add-card"} buttonTitle={"Создать"} isOpen={isAddCardPopupOpen}>
				<div className="popup__label">
					<input type="text" id="popup__input-image-caption"
					       className="popup__input popup__input_type_image-caption" name="popup__input_type_image-caption"
					       minLength="2" maxLength="30" required placeholder="Название"/>
					<span className="popup__input-span-error popup__input-image-caption-error"> </span>
				</div>
				<div className="popup__label">
					<input type="url" id="popup__input-image-src" className="popup__input popup__input_type_image-src"
					       name="popup__input_type_image-src" required placeholder="Ссылка на картинку"/>
					<span className="popup__input-span-error popup__input-image-src-error"> </span>
				</div>
			</PopupWithForm>
			
			<ImagePopup onPressEsc={handlePressEsc} card={selectedCard} onClose={closeAllPopups} />
		</CurrentUserContext.Provider>
	);
}

export default App;
