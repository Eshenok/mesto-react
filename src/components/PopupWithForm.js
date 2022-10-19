import {useEffect} from "react";

function PopupWithForm (props) {
	
	useEffect(() => {
		if (props.isOpen) {
			document.addEventListener('keydown', props.onPressEsc);
		}
			return () => {document.removeEventListener('keydown', props.onPressEsc)};
		
	}, [props.isOpen])
	
	const classes = ['popup', `popup_type_${props.name}`];
	if (props.isOpen) {
		classes.push('popup_opened');
	}
	
		return (
		<div className={classes.join(' ')}>
			<div onClick={props.onClose} className="popup__overlay"></div>
			<div className="popup__container">
				<p className="popup__title">{props.title}</p>
				<form onSubmit={props.onSubmit} className={`popup__form popup__form_type_${props.name}`} name={`popup__form_type_${props.name}`} noValidate>
					{props.children}
					<button type="submit" className={`button button_theme_dark button_type_${props.name}`}>{props.buttonTitle}</button>
				</form>
				<button type="button" className="button button_icon_close" onClick={props.onClose}></button>
			</div>
		</div>
	);
}

export default PopupWithForm;
