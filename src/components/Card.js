import React, {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";

export default function Card (props) {
	const currentUser = useContext(CurrentUserContext);
	
	const cardDeleteButtonClassName = (`button button_icon_delete ${checkIsOwn() ? '' : 'button_type_none'}`);
	const cardLikeButtonClassName = (`button button_icon_like ${checkIsLiked() ? 'button_icon_like-active' : ''}`);
	
	function checkIsLiked () {
		return props.card.likes.some((item) => {return (item === currentUser._id)});
	}
	
	function checkIsOwn () {
		return props.card.owner === currentUser._id;
	}
	
	function handleLikeClick() {
		props.onCardLike(props.card, checkIsLiked());
	}
	
	function handleDelClick() {
		props.onCardDel(props.card);
	}
	
	return (
		<article className="photo-grid__item">
			<img onClick={props.onCardClick} src={props.card.link} className="photo-grid__image" alt={props.card.name}/>
			<div className="photo-grid__footer">
				<h2 className="photo-grid__caption">{props.card.name}</h2>
				<div className="photo-grid__like-container">
					<button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
					<p className="photo-grid__counter">{props.card.likes.length}</p>
				</div>
			</div>
			<button type="button" className={cardDeleteButtonClassName} onClick={handleDelClick}></button>
		</article>
	)
}