import logo from "../images/logo.svg";

function Header(props) {

	const headerLinkClasses = ['header__link'];

	return (
		<header className="header">
			<img className="header__logo" src={logo} alt="Место 'Россия'"/>
			{props.loginIn ? <p className="header__email">{props.email}</p> : <></>}
			<p className={headerLinkClasses.join(' ')}>{props.linkTitle}</p>
		</header>
	)
}

export default Header;