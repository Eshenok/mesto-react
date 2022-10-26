import React, {useState, useEffect, useContext} from "react";
import Card from "../Card.js";
import {CurrentUserContext} from "../../contexts/CurrentUserContext.js";

function Main (props) {
	
	const currentUser = useContext(CurrentUserContext);
	
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
				{props.cards.map((card) => (
				<Card onCardDel={props.onCardDel} onCardLike={props.onCardLike} key={card._id} onCardClick={props.onSelectCard} card={card} />
				))}
			</section>
			
		</main>
	)
}

export default Main;