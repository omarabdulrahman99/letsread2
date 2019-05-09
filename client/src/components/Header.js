import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Link } from "react-router-dom";
//import {ThemeContext} from '../ThemeContext';
import { slide as Menu } from "react-burger-menu";

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			theme: "light",
			areMenusOpen: true
		};
	}

	renderContent() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return (
					<a className="login" href={"/auth/goodreads"}>
						<img
							src="https://s.gr-assets.com/assets/badge/goodreads-login-button-7bd184d3077cf3580f68aa8a00de39ce.png"
							alt="goodreads-login-button"
						/>
					</a>
				);
			default:
				return (
					<nav>
						<div>
							<ul className="headerul">
								<Menu isOpen={true}>
									<a href={"/intro"}>Introduction</a>
									<Link to="/mybooks">My Books</Link>

									<a href={"/statschart"}>My Stats</a>

									<a href={"/profile"}>Profile</a>

									<a href={"/auth/logout"}>LogOut</a>
								</Menu>
							</ul>
						</div>
					</nav>
				);
		}
	}

	render() {
		return (
			<header className="header">
				<a href="/">
					<div className="logobg">Let's Read!</div>
				</a>
				<div>{this.renderContent()}</div>
			</header>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(
	mapStateToProps,
	actions
)(Header);
