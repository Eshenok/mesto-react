import React from "react";

export default function ImagePopup ({card, onClose}) {
	
	const classes = ['popup', `popup_type_image`];
	if (Object.keys(card).length !== 0) {
		classes.push('popup_opened');
	}
	
	return (
		<div className={classes.join(' ')}>
			<div onClick={onClose} className="popup__overlay"></div>
			<div className="popup__image-container">
				<button type="button" className="button button_icon_close button_close_image" onClick={onClose}></button>
				<img src={card.src} className="popup__image" alt={card.alt}/>
				<p className="popup__caption">{card.alt}</p>
			</div>
		</div>
	)
}