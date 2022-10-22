import {useState} from 'react';

export function useForm(inputValues) {
	const [values, setValues] = useState(inputValues);
	
	function handleChange (e) {
		const {value, name, validity} = e.target;
		setValues({...values, [name]:{value: value, valid: validity.valid}});
	};
	return {values, handleChange, setValues};
}