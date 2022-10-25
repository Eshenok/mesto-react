import logo from "../images/logo.svg";

function Header(props) {
	return (
		<header className="header">
			<img className="header__logo" src={logo} alt="Место 'Россия'"/>
			{() => props.loginIn ? <p className="">{props.email}</p> : <></>}
			<p className="header__link">{props.page}</p>
		</header>
	)
}

export default Header;