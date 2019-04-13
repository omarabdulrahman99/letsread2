import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from './actions';
import { Link } from 'react-router-dom';

class Header2 extends Component {


	constructor(props){
		super(props);
		this.state = {

		}
	}


	renderContent(){



		switch(this.props.auth){


			case null:
				return;
			case false:
				return (

					
						<a href={'/auth/goodreads'}>
							<img src='https://s.gr-assets.com/assets/badge/goodreads-login-button-7bd184d3077cf3580f68aa8a00de39ce.png' alt='nother' />
						 </a>
				


					)
			default:
				return (
				
				<div>
				  <ul className="headerul">
					
						<Link to="/mybooks">My Books</Link>
					
					
						<a href={'/profile'} >
							Profile
						</a>
					
				
						<a href={'/auth/logout'} >
							LogOut
						</a>
					
				 </ul>
				</div>
			
					)

		}

	}









		render(){


			return(

				<div className="header">
					<a href="/">
						<div className="logobg">Let's Read!</div>
					</a>
					<div>
						{this.renderContent()}
					</div>
				</div>
			
		
				)

			}


		}



		








function mapStateToProps({ auth }){

	return { auth };
}


export default connect(mapStateToProps,actions)(Header2);