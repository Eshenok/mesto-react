import React from "react";
/*
* props.change для обработчика onChange
* все остальные пропсы для атрибутов
*/

export const Input = ({onChange, ...rest }) => {
	return <input onChange={onChange || false} {...rest} />
}