import {Input} from "../Input";
import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";

export default function AuthForm(props) {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const formRef = useRef();
	
	function handleSubmit (e) {
		e.preventDefault();
		props.onSubmit(email, password);
	}
	
	return (
		<div className="authentication">
			<p className="authentication__title">{props.title}</p>
			<form ref={formRef} onSubmit={handleSubmit} className="authentication__form" name={`authentication__form_${props.title}`}>
				<Input onChange={(e) => setEmail(e.target.value)} value={email} className="input input__place_auth" type="email" placeholder="Email" required/>
				<Input onChange={(e) => setPassword(e.target.value)} value={password} className="input input__place_auth" type="password" placeholder="Пароль" required/>
				<div className="authentication__footer">
					<button type="submit" className="button button_theme_white">{props.buttonTitle}</button>
					{props.caption ? <Link to={'/sign-in'} className="authentication__caption">{props.caption}</Link> : <></>}
				</div>
			</form>
		</div>
	)
}