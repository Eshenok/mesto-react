import React from "react";
/*
* props.change для обработчика onChange
* все остальные пропсы для атрибутов
*/

export const Input = ({onChange, value, ...rest }) => {
	return <input onChange = {onChange} {...rest} value={value || ''} />
}