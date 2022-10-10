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
			
		</main>
	)
}

export default Main;