import React from "react";

export default function ImagePopup (props) {
	
	const classes = ['popup', `popup_type_image`];
	if (props.card) {
		classes.push('popup_opened');
	}
	
	return (
		<div className={classes.join(' ')}>
			<div onClick={props.onClose} className="popup__overlay"></div>
			<div className="popup__image-container">
				<button type="button" className="button button_icon_close button_close_image" onClick={props.onClose}></button>
				<img src={props.card.src} className="popup__image" alt={props.card.alt}/>
				<p className="popup__caption">{props.card.alt}</p>
			</div>
		</div>
	)
}