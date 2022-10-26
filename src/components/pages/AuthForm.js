import {Input} from "../Input";
import {useState} from "react";

export default function AuthForm(props) {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function handleSubmit (e) {
		e.preventDefault();
	}

	return (
		<div className="authentication">
			<p className="authentication__title">{props.title}</p>
			<form onSubmit={handleSubmit} className="authentication__form">
				<Input onChange={(e) => setEmail(e.target.value)} value={email} className="input input__place_auth" type="email" placeholder="Email"/>
				<Input onChange={(e) => setPassword(e.target.value)} value={password} className="input input__place_auth" type="password" placeholder="Пароль"/>
				<div className="authentication__footer">
					<button type="submit" className="button button_theme_white">{props.buttonTitle}</button>
					{props.caption ? <p className="authentication__caption">{props.caption}</p> : <></>}
				</div>
			</form>
		</div>
	)
}