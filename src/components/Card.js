import React, {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";

export default function Card (props) {
	const currentUser = useContext(CurrentUserContext);
	
	const isOwn = props.card.owner._id === currentUser._id;
	const cardDeleteButtonClassName = (
		`button button_icon_delete ${isOwn ? '' : 'button_type_none'}`
	);
	
	const isLiked = props.card.likes.some((item) => {return (item._id === currentUser._id)});
	const cardLikeButtonClassName = (
		`button button_icon_like ${isLiked ? 'button_icon_like-active' : ''}`
	)
	
	return (
		<article className="photo-grid__item">
			<img onClick={props.onCardClick} src={props.card.link} className="photo-grid__image" alt={props.card.name}/>
			<div className="photo-grid__footer">
				<h2 className="photo-grid__caption">{props.card.name}</h2>
				<div className="photo-grid__like-container">
					<button type="button" className={cardLikeButtonClassName}></button>
					<p className="photo-grid__counter">asdaa{props.card.likes.length}</p>
				</div>
			</div>
			<button type="button" className={cardDeleteButtonClassName}></button>
		</article>
	)
}