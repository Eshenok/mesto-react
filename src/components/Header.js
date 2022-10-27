import logo from "../images/logo.svg";
import {Link} from "react-router-dom";

function Header(props) {

	const headerLinkClasses = ['header__link'];
	if (props.link === '/main') {
		headerLinkClasses.push('header__link_dim');
	}
	
	return (
		<header className="header">
			<img className="header__logo" src={logo} alt="Место 'Россия'"/>
			{props.loggedIn ? <p className="header__email">{props.email}</p> : <></>}
			<Link to={props.link} className={headerLinkClasses.join(' ')}>{props.linkTitle}</Link>
		</header>
	)
}

export default Header;