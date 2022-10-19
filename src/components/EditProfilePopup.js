import PopupWithForm from "./PopupWithForm.js";
import {useContext, useState, useEffect} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";
import Input from "./Input.js";

export default function EditProfilePopup (props) {
	
	const currentUser = useContext(CurrentUserContext); // subscribe
	const [name, setName] = useState('');
	const [about, setAbout] = useState('');
	
	useEffect(() => {
		setName(currentUser.name);
		setAbout(currentUser.about);
	}, [currentUser]);
	
	return (
		<PopupWithForm onPressEsc={props.onPressEsc} onClose={props.onClose} title={"Редактировать профиль"} name={"edit-profile"} buttonTitle={"Сохранить"} isOpen={props.isOpen}>
			<div className="popup__label">
				<Input type="text"
				       id="popup__input-name"
				       className="popup__input popup__input_type_name"
				       name="popup__input_type_name"
				       minLength="2"
				       maxLength="40"
				       required={true}
				       placeholder="Введите имя"
				       value={name}
				       change={setName}
				/>
				<span className="popup__input-span-error popup__input-name-error"> </span>
			</div>
			<div className="popup__label">
				<Input type="text"
				       id="popup__input-occupation"
				       className="popup__input popup__input_type_occupation"
				       name="popup__input_type_occupation"
				       minLength="2"
				       maxLength="200"
				       required={true}
				       placeholder="Укажите род деятельности"
				       value={about}
				       change={setAbout}
				/>
				<span className="popup__input-span-error popup__input-occupation-error"> </span>
			</div>
		</PopupWithForm>
	)
}