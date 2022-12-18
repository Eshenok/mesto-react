function PopupWithForm ({name, isOpen, title, buttonTitle, onClose, onSubmit, children}) {
	
	const classes = ['popup', `popup_type_${name}`];
	if (isOpen) {
		classes.push('popup_opened');
	}
		
		return (
		<div className={classes.join(' ')}>
			<div onClick={onClose} className="popup__overlay"></div>
			<div className="popup__container">
				<p className="popup__title">{title}</p>
				<form onSubmit={onSubmit} className={`popup__form popup__form_type_${name}`} name={`popup__form_type_${name}`}>
					{children}
					<button type="submit" className={`button button_theme_dark button_type_${name}`}>{buttonTitle}</button>
				</form>
				<button type="button" className="button button_icon_close" onClick={onClose}></button>
			</div>
		</div>
	);
}

export default PopupWithForm;
