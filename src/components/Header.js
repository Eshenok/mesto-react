import logo from "../images/logo.svg";
import {Link, Route} from "react-router-dom";
function Header({link, email, loggedIn, onClose}) {

	const headerLinkClasses = ['header__link'];
	headerLinkClasses.push('header__link_dim');
	
	return (
		<header className="header">
			<img className="header__logo" src={logo} alt="Место 'Россия'"/>
			
			<Route path="/main">
				<p className="header__email">{email}</p>
				<Link className="header__link header__link_dim" to="/sign-in" onClick={onClose}>
					Выйти
				</Link>
			</Route>
			<Route path="/sign-up">
				<Link className="header__link" to="/sign-in">
					Войти
				</Link>
			</Route>
			<Route path="/sign-in">
				<Link className="header__link" to="/sign-up">
					Регистрация
				</Link>
			</Route>
			
		</header>
	)
}

export default Header;