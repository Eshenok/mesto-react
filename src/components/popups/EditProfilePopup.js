import PopupWithForm from "./PopupWithForm.js";
import {useContext, useState, useEffect} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext.js";
import {Input} from "../Input.js";
import {useForm} from "../hooks/useForm";

export default function EditProfilePopup (props) {
	
	const currentUser = useContext(CurrentUserContext); // subscribe
	// popup__input_type_name: '', popup__input_type_occupation: ''
	
	useEffect(() => {
		if (props.isOpen) {
			setValues({
				'popup__input_type_name': {value: currentUser.name, valid: true},
				'popup__input_type_occupation': {value: currentUser.about, valid: true}
			});
		}
	}, [currentUser, props.isOpen]);
	
	const {values, handleChange, setValues} = useForm({'popup__input_type_name': {value: '', valid: false}, 'popup__input_type_occupation': {value: '', valid: false}});
	console.log(values)
	const {'popup__input_type_name': name, 'popup__input_type_occupation': about} = values;
	
	function handleSubmit(e) {
		e.preventDefault();
		props.onSubmit({name: name.value, about: about.value});
	}
	
	return (
		<PopupWithForm onSubmit={handleSubmit} onPressEsc={props.onPressEsc} onClose={props.onClose} title={"Редактировать профиль"} name={"edit-profile"} buttonTitle={props.buttonTitle} isOpen={props.isOpen}>
			<div className="popup__label">
				<Input value={name.value}
							 onChange={handleChange}
				       type="text"
					     id="popup__input-name"
				       className="popup__input popup__input_type_name"
				       name="popup__input_type_name"
				       minLength="2"
				       maxLength="40"
				       required={true}
				       placeholder="Введите имя"
				/>
			</div>
			<div className="popup__label">
				<Input value={about.value}
							 onChange={handleChange}
							 type="text"
							 id="popup__input-occupation"
							 className="popup__input popup__input_type_occupation"
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