import PopupWithForm from "./PopupWithForm.js";
import React, {useState} from "react";
import Input from "./Input.js";

export default function AddCardPopup (props) {
	
	const [name, setName] = useState('');
	const [link, setLink] = useState('');
	
	function handleSubmit (e) {
		e.preventDefault();
		props.onSubmit(name, link);
	}
	
	return (
		<PopupWithForm onSubmit={handleSubmit} onPressEsc={props.onPressEsc} onClose={props.onClose} title={"Новое место"} name={"add-card"} buttonTitle={"Создать"} isOpen={props.isOpen}>
			<div className="popup__label">
				<Input atr={{type: "text",
					id: "popup__input-image-caption",
					className: "popup__input popup__input_type_image-caption",
					name: "popup__input_type_image-caption",
					minLength: "2",
					maxLength: "30",
					required: true,
					placeholder: "Название",
				}}
				       change={setName}
				/>
				<span className="popup__input-span-error popup__input-image-caption-error"> </span>
			</div>
			<div className="popup__label">
				<Input atr={{type: "url",
					id: "popup__input-image-src",
					className: "popup__input popup__input_type_image-src",
					name: "popup__input_type_image-src",
					required: true ,
					placeholder: "Ссылка на картинку",
				}}
				change={setLink}
				/>
				<span className="popup__input-span-error popup__input-image-src-error"> </span>
			</div>
		</PopupWithForm>
	)
}