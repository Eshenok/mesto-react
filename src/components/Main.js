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
	
	function handleCardLike(card, isLiked) {
		if (!isLiked) {
			Api.putLike(card._id)
				.then((res) => {
					setCards((state) => state.map((c) => c._id === card._id ? res : c)); // не понял как работает
				}).catch(err => console.log(err));
		} else {
			Api.removeLike(card._id)
				.then((res) => {
					setCards((state) => state.map((c) => c._id === card._id ? res : c)); // не понял как работает
				}).catch(err => console.log(err));
		}
	};
	
	function handleDelCard (card) {
		Api.removeCard(card._id)
			.then((res) => {
				setCards((state) => state.filter(item => item._id !== card._id)) // вернет массив без удаленной карточки
			}).catch((err) => console.log(err));
	}
	
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
				<Card onCardDel={handleDelCard} onCardLike={handleCardLike} key={card._id} onCardClick={props.onSelectCard} card={card} />
				))}
			</section>
			
		</main>
	)
}

export default Main;