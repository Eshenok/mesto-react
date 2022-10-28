import React from "react";
import success from '../../images/success.png'
import fail from '../../images/fail.png'

export default function SuccessStatePopup({onClose, status, isOpen}) {
	
	const classes = ['popup', `popup_type_success`];
	if (isOpen) {
		classes.push('popup_opened');
	}
	
	return (
		<div className={classes.join(' ')}>
			<div onClick={onClose} className="popup__overlay"></div>
			<div className="popup__container">
				<button type="button" className="button button_icon_close button_close_image" onClick={onClose}></button>
				{<img src={status ? success : fail} className="popup__status-image" />}
				<p className="popup__title popup__title_place_success">{status ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так!\n' +
					'Попробуйте ещё раз.'}</p>
			</div>
		</div>
	)
}