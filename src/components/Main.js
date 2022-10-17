import PopupWithForm from "./PopupWithForm.js";
import React, {useState, useEffect, useContext} from "react";
import Api from "../utils/Api.js";
import Card from "./Card.js";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";

function Main (props) {
	
	const [cards, setCards] = useState([]);
	const currentUser = useContext(CurrentUserContext);
	
	useEffect(() => {
		Api.preloadData()
			.then(([userInfo, initialCards]) => {
			setCards(initialCards);
		})
			.catch((err) => {
				console.log(err);
			})
	}, []);
	
	return (
		<main className="content">
			<section className="profile">
				<div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }} onClick={props.onEditAvatar}></div>
				<div className="profile__info">
					<h1 className="profile__name">{currentUser.name}</h1>
					<p className="profile__occupation">{currentUser.about}</p>
					<button type="button" className="button button_theme_outline button_icon_edit" onClick={props.onEditProfile}></button>
				</div>
				<button type="button" className="button button_theme_outline button_icon_add" onClick={props.onAddCard}></button>
			</section>
			
			<section className="photo-grid">
				{cards.map((card, i) => (
				<Card key={card._id} onCardClick={props.onSelectCard} card={card} />
				))}
			</section>
			
		</main>
	)
}

export default Main;