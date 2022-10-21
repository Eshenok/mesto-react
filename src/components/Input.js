import React from "react";
/*
* props.change для обработчика onChange
* все остальные пропсы для атрибутов
*/

export default function Input(props) {
	
	function handleChange(e) {
		props.change(e.target.value);
	}
	
	return (
		<input {...props.atr} onChange={handleChange} value={props.atr.value || ''}/>
	)
}