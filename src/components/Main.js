import PopupWithForm from "./PopupWithForm.js";
import React, {useState, useEffect} from "react";
import Api from "../utils/Api.js";
import Card from "./Card.js";

function Main (props) {
	
	const [userName, setUserName] = useState('');
	const [userDescription, setUserDescription] = useState('');
	const [userAvatar, setUserAvatar] = useState('');
	const [cards, setCards] = useState([]);

	useEffect(() => {
		Api.preloadData()
			.then(([userInfo, initialCards]) => {
			setUserAvatar(userInfo.avatar);
			setUserDescription(userInfo.about);
			setUserName(userInfo.name);
			setCards(initialCards);
		})
			.catch((err) => {
				console.log(err);
			})
	}, []);
	
	console.log(cards);
	
	return (
		<main className="content">
			<section className="profile">
				<div className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }} onClick={props.onEditAvatar}></div>
				<div className="profile__info">
					<h1 className="profile__name">{userName}</h1>
					<p className="profile__occupation">{userDescription}</p>
					<button type="button" className="button button_theme_outline button_icon_edit" onClick={props.onEditProfile}></button>
				</div>
				<button type="button" className="button button_theme_outline button_icon_add" onClick={props.onAddCard}></button>
			</section>
			
			<section className="photo-grid">
				{cards.map((card) => (
				<Card onCardClick={props.onSelectCard} card={card} />
				))}
			</section>
			
			{/*<div className="popup popup_type_edit-profile">*/}
			{/*	<div className="popup__overlay"></div>*/}
			{/*	<div className="popup__container">*/}
			{/*		<p className="popup__title">Редактировать профиль</p>*/}
			{/*		<form className="popup__form popup__form_type_edit-profile" name="popup__form_type_edit-profile" noValidate>*/}
			{/*			<div className="popup__label">*/}
			{/*				<input type="text" id="popup__input-name" className="popup__input popup__input_type_name"*/}
			{/*				       name="popup__input_type_name" minLength="2" maxLength="40" required placeholder="Введите имя"/>*/}
			{/*				<span className="popup__input-span-error popup__input-name-error"> </span>*/}
			{/*			</div>*/}
			{/*			<div className="popup__label">*/}
			{/*				<input type="text" id="popup__input-occupation" className="popup__input popup__input_type_occupation"*/}
			{/*				       name="popup__input_type_occupation" minLength="2" maxLength="200" required*/}
			{/*				       placeholder="Укажите род деятельности"/>*/}
			{/*				<span className="popup__input-span-error popup__input-occupation-error"> </span>*/}
			{/*			</div>*/}
			{/*			<button type="submit" className="button button_theme_dark button_type_save">Сохранить</button>*/}
			{/*		</form>*/}
			{/*		<button type="button" className="button button_icon_close button_close_profile"></button>*/}
			{/*	</div>*/}
			{/*</div>*/}
			
			{/*<div className="popup popup_type_add-card">*/}
			{/*	<div className="popup__overlay"></div>*/}
			{/*	<div className="popup__container">*/}
			{/*		<p className="popup__title">Новое место</p>*/}
			{/*		<form className="popup__form popup__form_type_add-content" name="popup__form_type_add-content" noValidate>*/}
			{/*			<div className="popup__label">*/}
			{/*				<input type="text" id="popup__input-image-caption"*/}
			{/*				       className="popup__input popup__input_type_image-caption" name="popup__input_type_image-caption"*/}
			{/*				       minLength="2" maxLength="30" required placeholder="Название"/>*/}
			{/*				<span className="popup__input-span-error popup__input-image-caption-error"> </span>*/}
			{/*			</div>*/}
			{/*			<div className="popup__label">*/}
			{/*				<input type="url" id="popup__input-image-src" className="popup__input popup__input_type_image-src"*/}
			{/*				       name="popup__input_type_image-src" required placeholder="Ссылка на картинку"/>*/}
			{/*				<span className="popup__input-span-error popup__input-image-src-error"> </span>*/}
			{/*			</div>*/}
			{/*			<button type="submit" className="button button_theme_dark button_type_add-card">Создать</button>*/}
			{/*		</form>*/}
			{/*		<button type="button" className="button button_icon_close button_close_card"></button>*/}
			{/*	</div>*/}
			{/*</div>*/}
			
			{/*<div className="popup popup_type_confirm">*/}
			{/*	<div className="popup__overlay"></div>*/}
			{/*	<div className="popup__container">*/}
			{/*		<p className="popup__title popup__title_place_popup-confirm">Вы уверены?</p>*/}
			{/*		<form className="popup__form popup__form_type_confirm" name="popup__form_type_confirm" noValidate>*/}
			{/*			<button type="button" className="button button_theme_dark button_type_confirm">Да</button>*/}
			{/*		</form>*/}
			{/*		<button type="button" className="button button_icon_close button_close_card"></button>*/}
			{/*	</div>*/}
			{/*</div>*/}
			
			{/*<div className="popup popup_type_profile-image">*/}
			{/*	<div className="popup__overlay"></div>*/}
			{/*	<div className="popup__container">*/}
			{/*		<p className="popup__title">Обновить аватар</p>*/}
			{/*		<form className="popup__form popup__form_type_profile-image" name="popup__input_type_profile-image" noValidate>*/}
			{/*			<div className="popup__label">*/}
			{/*				<input type="url" id="popup__input-profile-image"*/}
			{/*				       className="popup__input popup__input_type_profile-image" name="popup__input_type_profile-image"*/}
			{/*				       required placeholder="Ссылка на картинку"/>*/}
			{/*				<span className="popup__input-span-error popup__input-profile-image-error"> </span>*/}
			{/*			</div>*/}
			{/*			<button type="submit" className="button button_theme_dark button_type_update">Сохранить</button>*/}
			{/*		</form>*/}
			{/*		<button type="button" className="button button_icon_close button_close_card"></button>*/}
			{/*	</div>*/}
			{/*</div>*/}
			
			
			
		</main>
	)
}

export default Main;