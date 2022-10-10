import React from "react";

export default function Card (props) {
	return (
		<article className="photo-grid__item">
			<img onClick={props.onCardClick} src={props.card.link} className="photo-grid__image" alt={props.card.name}/>
			<div className="photo-grid__footer">
				<h2 className="photo-grid__caption">{props.card.name}</h2>
				<div className="photo-grid__like-container">
					<button type="button" className="button button_icon_like"></button>
					<p className="photo-grid__counter">{props.card.likes.length}</p>
				</div>
			</div>
			<button type="button" className="button button_icon_delete"></button>
		</article>
	)
}