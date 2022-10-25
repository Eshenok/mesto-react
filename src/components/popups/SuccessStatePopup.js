import React from "@types/react";

export default function SuccessStatePopup({onClose, text, status}) {
	
	const classes = ['popup', `popup_type_success`];
	const imageClasses = {
		success: 'hhtttpl',
		fail: 'sasdfa',
	}
	
	return (
		<div className={classes.join(' ')}>
			<div onClick={onClose} className="popup__overlay"></div>
			<div className="popup__image-container">
				<button type="button" className="button button_icon_close button_close_image" onClick={onClose}></button>
				<img src={status ? imageClasses.success : imageClasses.fail} className="" />
				<p className="">{text}</p>
			</div>
		</div>
	)
}