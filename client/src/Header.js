import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from './actions';
import { Link } from 'react-router-dom';
import {ThemeContext} from './ThemeContext';
class Header extends Component {


	constructor(props){
		super(props);
		this.state = {
			theme:'light'
		}
	}


	renderContent(){



		switch(this.props.auth){


			case null:
				return;
			case false:
				return (

					
						<a className="login" href={'/auth/goodreads'}>
							<img src='https://s.gr-assets.com/assets/badge/goodreads-login-button-7bd184d3077cf3580f68aa8a00de39ce.png' alt='goodreads-login-button' />
						 </a>
				


					)
			default:
				return (
				
						//you can't use context outside of return. also no dispatch actions like redux. and this messy looking code. redux > context.
						<nav>
							<ThemeContext.Provider value={this.state.theme}>
								<ThemeContext.Consumer>
									{(context) => (

									<ul className="headerul">
											
											<Link to="/mybooks">My Books</Link>
											
										
											<a href={'/profile'} >
												Profile
											</a>
										
									
											<a href={'/auth/logout'} >
												LogOut
											</a>
										
									 </ul>



										)}


							 	</ThemeContext.Consumer>
							</ThemeContext.Provider>
						</nav>
			
					)

		}

	}









		render(){


			return(

				<header className="header">
					<a href="/">
						<div className="logobg">Let's Read!</div>
					</a>
					<div>
						{this.renderContent()}
					</div>
				</header>
			
		
				)

			}


		}



		








function mapStateToProps({ auth }){

	return { auth };
}


export default connect(mapStateToProps,actions)(Header);