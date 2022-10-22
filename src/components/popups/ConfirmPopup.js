import PopupWithForm from "./PopupWithForm";
import React from "react";

export default function ConfirmPopup ({onClose, isOpen, onSubmit}) {
	
	function handleSubmit (e) {
		onSubmit();
		e.preventDefault();
	}
	
	return (
		<PopupWithForm onClose={onClose} onSubmit={handleSubmit} title={"Вы уверены?"} name={"confirm"} buttonTitle={"Да"} isOpen={isOpen} />
	)
}