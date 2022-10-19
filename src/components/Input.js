import React from "react";
/*
* props.change для обработчика onChange
* все остальные пропсы для атрибутов
*/

export default function Input(props) {
	
	const atr = props.atr;
	
	function handleChange(e) {
		props.change(e.target.value);
	}
	
	return (
		<input {...atr} onChange={handleChange} />
	)
}