import PopupWithForm from "./PopupWithForm.js";
import React, {useEffect, useState} from "react";
import {Input} from "../Input.js";

export default function AddCardPopup (props) {
	
	const [name, setName] = useState('');
	const [link, setLink] = useState('');
	
	function handleSubmit (e) {
		e.preventDefault();
		props.onSubmit(name, link);
	}
	
	useEffect(() => {
		setLink('');
		setName('');
	}, [props.isOpen])
	
	return (
		<PopupWithForm onSubmit={handleSubmit} onPressEsc={props.onPressEsc} onClose={props.onClose} title={"Новое место"} name={"add-card"} buttonTitle={props.buttonTitle} isOpen={props.isOpen}>
			<div className="popup__label">
				<Input  value={name} onChange={(e) => setName(e.target.value)}
								type="text"
								id="popup__input-image-caption"
								className="input popup__input_type_image-caption"
								name="popup__input_type_image-caption"
								minLength="2"
								maxLength="30"
								required={true}
								placeholder="Название"
				/>
			</div>
			<div className="popup__label">
				<Input value={link} onChange={(e) => setLink(e.target.value)}
							 type="url"
							 id="popup__input-image-src"
							 className="input popup__input_type_image-src"
							 name="popup__input_type_image-src"
							 required={true}
							 placeholder="Ссылка на картинку"
				/>
			</div>
		</PopupWithForm>
	)
}