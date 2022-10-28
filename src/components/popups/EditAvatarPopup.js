import React, {useEffect, useRef} from "react";
import PopupWithForm from "./PopupWithForm.js";

export default function EditAvatarPopup (props) {
	
	const avatarRef = useRef('');
	
	function handleSubmit(e) {
		e.preventDefault();
		props.onSubmit(avatarRef.current.value);
	}
	
	useEffect(() => {
		avatarRef.current.value = '';
	}, [props.isOpen])
	
	return (
		<PopupWithForm onSubmit={handleSubmit} onPressEsc={props.onPressEsc} onClose={props.onClose} title={"Обновить аватар"} name={"profile-image"} buttonTitle={props.buttonTitle} isOpen={props.isOpen}>
			<div className="popup__label">
				<input type="url" //из-за рефа не могу сделать компонентом
				       id="popup__input-profile-image"
				       className="input popup__input_type_profile-image"
				       name="popup__input_type_profile-image"
				       required
				       placeholder="Ссылка на картинку"
				       ref={avatarRef}
				/>
			</div>
		</PopupWithForm>
	);
}