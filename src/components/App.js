import '../App.css';
import React, {useState, useEffect} from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";

function App() {
	
	const [isEditProfilePopupOpen, setEditProfilePopup] = useState(false);
	const [isEditAvatarPopupOpen, setEditAvatarPopup] = useState(false);
	const [isAddCardPopupOpen, setAddCardPopup] = useState(false);
	const [isImagePopupOpen, setImagePopup] = useState(false);
	const [selectedCard, setSelectedCard] = useState(false);
	
	useEffect(() => {
		document.addEventListener('keydown', handlePressEsc);
		return () => {document.removeEventListener('keydown', handlePressEsc)};
	}, [isEditAvatarPopupOpen, isAddCardPopupOpen, isEditProfilePopupOpen]);
	
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
	setSelectedCard(false);
	}
	
	return (
		<>
		
			<Header />
			<Main onSelectCard={handleCardClick} onEditProfile={handleEditProfile} onEditAvatar={handleEditAvatar} onAddCard={handleAddCard}  onImage={handleImagePopup}/>
			<Footer />
			
			<PopupWithForm onClose={closeAllPopups} title={"Редактировать профиль"} name={"edit-profile"} buttonTitle={"Сохранить"} isOpen={isEditProfilePopupOpen}>
				<div className="popup__label">
					<input type="text" id="popup__input-name" className="popup__input popup__input_type_name"
					       name="popup__input_type_name" minLength="2" maxLength="40" required placeholder="Введите имя"/>
					<span className="popup__input-span-error popup__input-name-error"> </span>
				</div>
				<div className="popup__label">
					<input type="text" id="popup__input-occupation" className="popup__input popup__input_type_occupation"
					       name="popup__input_type_occupation" minLength="2" maxLength="200" required
					       placeholder="Укажите род деятельности"/>
					<span className="popup__input-span-error popup__input-occupation-error"> </span>
				</div>
			</PopupWithForm>
			
			<PopupWithForm onClose={closeAllPopups} title={"Обновить аватар"} name={"profile-image"} buttonTitle={"Сохранить"} isOpen={isEditAvatarPopupOpen}>
				<div className="popup__label">
					<input type="url" id="popup__input-profile-image"
					       className="popup__input popup__input_type_profile-image" name="popup__input_type_profile-image"
					       required placeholder="Ссылка на картинку"/>
					<span className="popup__input-span-error popup__input-profile-image-error"> </span>
				</div>
			</PopupWithForm>
			
			<PopupWithForm onClose={closeAllPopups} title={"Вы уверены?"} name={"confirm"} buttonTitle={"Да"} />
			<PopupWithForm onClose={closeAllPopups} title={"Новое место"} name={"add-card"} buttonTitle={"Создать"} isOpen={isAddCardPopupOpen}>
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
			
			<ImagePopup card={selectedCard} onClose={closeAllPopups} />
		</>
	);
}

export default App;
