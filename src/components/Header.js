import logo from "../images/logo.svg";
import {Link} from "react-router-dom";
function Header({link, email, loggedIn, onClose}) {

	const headerLinkClasses = ['header__link'];
	const linkTo = [];
	const linkTitle = [];

	if (link === '/sign-in') {
		linkTitle.push('Регистрация');
		linkTo.push('/sign-up');
	} else if (link === '/sign-up') {
		linkTitle.push('Войти');
		linkTo.push('/sign-in');
	} else {
		linkTitle.push('Выйти');
		linkTo.push('');
		headerLinkClasses.push('header__link_dim');
	}

	return (
		<header className="header">
			<img className="header__logo" src={logo} alt="Место 'Россия'"/>
			{loggedIn ? <p className="header__email">{email}</p> : <></>}
			<Link onClick={loggedIn ? onClose : () => {}} to={linkTo.join('')} className={headerLinkClasses.join(' ')}>{linkTitle}</Link>
		</header>
	)
}

export default Header;