import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import axios from 'axios';
import SearchResults from './SearchResults';

class Landing extends Component {

	constructor(props){

		super(props);
		
		this.state = {

			searchquery: "",
			qresults:"",
			usershelfbooksraw:"",
			shelflist:"",
			searchpage:false

		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}


	handleInputChange(e){

		const value = e.target.value;
		this.setState({
			searchquery:value
		})

	}
                                             
	async handleSubmit(e){

		e.preventDefault();
		var ee = e.currentTarget;
		var dataresults = '';
		var shelflist = '';
		var usershelfbooksraw = '';
		var event = e.currentTarget;

		if(this.props.thisuser){


		 console.log(this.props.thisuser)




		 var shelflist = await axios.post(`/api/shelflist`,{user:this.props.thisuser});


		 usershelfbooksraw = await axios.post(`/api/usershelfbooks`,{
			goodreadId:this.props.thisuser.goodreadId

		})

		}else{
			shelflist = false;
			usershelfbooksraw = false;
		}



		
		if(event.nodeName == "DIV"){

			
			const form = ee.parentNode;
			const query = form.elements["searchq"].value;
			dataresults = await axios.get(`/api/search/${query}`);



			this.setState({qresults:dataresults.data, shelflist:shelflist, usershelfbooksraw:usershelfbooksraw, searchpage:true});
			//this.setState({searchpage:true});
		

		}else{

			const form = ee;
			const query = form.elements["searchq"].value;
			dataresults = await axios.get(`/api/search/${query}`);




		this.setState({qresults:dataresults.data, shelflist:shelflist, usershelfbooksraw:usershelfbooksraw, searchpage:true});

	

			
			
			//this.setState({searchpage:true});
			
		}


		


	}


	renderContent(){


		if(this.state.searchpage != true){

			return(


			<div className="formcenter">
				<p className="landtitlep">Let's Read </p>
				<form onSubmit={this.handleSubmit} className="form-inline active-pink-3 active-pink-4 ">
					<div onClick={this.handleSubmit}>
  					<i className="fa fa-search" aria-hidden="true"></i>
  					</div>
  					<input className="form-control form-control-sm ml-3 w-75" required={true} type="text" name="searchq" value={this.state.searchquery} onChange={this.handleInputChange} placeholder="Search books by title, isbn, or author!" aria-label="Search" />
				</form>
			</div>

			);

		}else{

			return(
			<SearchResults tdata={this.state.qresults} shelflist={this.state.shelflist} usershelfbooksraw={this.state.usershelfbooksraw}/>
			)

		}


		
	}

	render(){

		return(

		<div className="centeredsearch">
			{this.renderContent()}
		</div>

		)

	}
}

function mapStateToProps(props){

	return {thisuser:props.auth}

}

export default connect(mapStateToProps)(Landing);