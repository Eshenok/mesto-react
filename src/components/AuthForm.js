import {Input} from "./Input";

export default function AuthForm(props) {
	return (
		<div className="">
			<p className="">{props.title}</p>
			<form className="">
				<Input placeholder="Email"/>
				<Input placeholder="Пароль"/>
				<button type="button" className="button">{props.buttonTitle}</button>
				{() => props.caption ? <p className="">props.caption</p> : <></>}
			</form>
		</div>
	)
}