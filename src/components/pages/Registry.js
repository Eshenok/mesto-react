import AuthForm from "./AuthForm";

export default function Registry (props) {
	
	return (
			<AuthForm title="Регистрация" buttonTitle="Зарегистрироваться" caption="Уже зарегистрированы? Войти" {...props} />
	)
}