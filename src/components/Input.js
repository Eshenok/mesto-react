import React from "react";

export const Input = ({onChange, value, ...rest }) => {
	return (
		<>
			<input onChange = {onChange} {...rest} value={value || ''} />
			<span className="input__span-error"> </span>
		</>
)
}