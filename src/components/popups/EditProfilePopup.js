import PopupWithForm from "./PopupWithForm.js";
import {useContext, useState, useEffect} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext.js";
import {Input} from "../Input.js";

export default function EditProfilePopup (props) {
	
	const currentUser = useContext(CurrentUserContext); // subscribe
	const [name, setName] = useState('');
	const [about, setAbout] = useState('');
	
	useEffect(() => {
		setName(currentUser.name);
		setAbout(currentUser.about);
	}, [currentUser, props.isOpen]);
	
	function handleSubmit(e) {
		e.preventDefault();
		props.onSubmit({name: name, about: about});
	}
	
	return (
		<PopupWithForm onSubmit={handleSubmit} onPressEsc={props.onPressEsc} onClose={props.onClose} title={"Редактировать профиль"} name={"edit-profile"} buttonTitle={props.buttonTitle} isOpen={props.isOpen}>
			<div className="popup__label">
				<Input value={name} onChange={(e) => setName(e.target.value)}
				       type="text"
					     id="popup__input-name"
				       className="input popup__input_type_name"
				       name="popup__input_type_name"
				       minLength="2"
				       maxLength="40"
				       required={true}
				       placeholder="Введите имя"
				/>
			</div>
			<div className="popup__label">
				<Input value={about} onChange={(e) => setAbout(e.target.value)}
							 type="text"
							 id="popup__input-occupation"
							 className="input popup__input_type_occupation"
							 name="popup__input_type_occupation"
							 minLength="2"
							 maxLength="200"
							 required={true}
							 placeholder="Укажите род деятельности"
				/>
			</div>
		</PopupWithForm>
	)
}