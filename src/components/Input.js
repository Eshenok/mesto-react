import React, {useState} from "react";

export const Input = ({onChange, value, ...rest }) => {
	
	const [error, setError] = useState(' ');
	
	const classes = ['popup__input-span-error'];
	if (error !== ' ') {
		classes.push('popup__input-span-error_active')
	}
	
	function handleChange(e) {
		onChange(e);
		if (e.target.validity.valid) {
			setError(' ');
		} else {
			setError(e.target.validationMessage);
		}
	}
	
	return (
		<>
			<input onChange = {handleChange} {...rest} value={value || ''} />
			<span className={classes.join(' ')}>{error}</span>
		</>
	)
}