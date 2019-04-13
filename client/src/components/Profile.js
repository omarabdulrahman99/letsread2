import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { notebookid } from  '../actions/index'
import axios from 'axios';


class Profile extends Component {

	constructor(props){

		super(props);
		this.state = {

			dataloaded:'notloaded',
			

		}
		this.profileload = this.profileload.bind(this);
		this.profilerender = this.profilerender.bind(this);
		this.toggle = this.toggle.bind(this);
		this.profileres = '';
	

	}


 
componentDidMount(){

	

	}

	 toggle(nr) {
	 	console.log('toggle1')
	    let modalNumber = 'modal' + nr
	    this.setState({
	      [modalNumber]: !this.state[modalNumber]
	    }, () => console.log(this.state.modal1));
  }

	async profileload(user){

		if(!user.goodreadId){

			return(<div>nodata</div>)

		}else{
			if(this.state.dataloaded == 'loaded'){


			}else{

				var profileres = await axios.post('/api/profileinfo', {goodreadId:user.goodreadId});
				
				var profileuserdata = profileres.data.profileinfo.GoodreadsResponse.user;
				this.profileres = profileres;

				
				this.setState(prevState => ({
					dataloaded:prevState.dataloaded != 'notloaded' ? null : 'loaded'
				}))
	
			}
			
		}

		
		
	}



	profilerender(){

			
			
			var profileuserdata = this.profileres.data.profileinfo.GoodreadsResponse.user;
			var name = profileuserdata[0].name[0];
			var gender = profileuserdata[0].gender[0];
			var location = profileuserdata[0].location[0];
			//var joined = profileuserdata[0].joined[0];
			//var lastactive = profileuserdata[0].last_active[0];
			var age = profileuserdata[0].age[0];
			var about = profileuserdata[0].about[0];
			var image = profileuserdata[0].image_url[0];
			//var favauthors = profileuserdata[0].favorite_authors;//rated books, get the authors from those! Top 10!
			var favbooks = this.profileres.data.favbooks.GoodreadsResponse.reviews[0].review;//these are books on the *read* shelf with the highest ratings from the user. Top 10 books!
			//loop through review array
			//author: .book[0].authors[0].author[0].name    author[0].small_image_url[0]._
			//book: .rating(personal rating)    .book[0].small_image_url[0]  -->  .description[0]  .image_url[0]  .num_pages[0]  .publication_year  .title[0] .ratings_count[0]  .average_rating[0] .link[0]
			

			var styles = {

				backgroundImage: `url(${image})`

			}		
			
			return(
				
				
						<div className="profiledetail">
						
							<div className="profileimage" style={styles}>
							</div>
							<div className="profileinfo">
								
								<h1 className="profilename">{name}</h1>
								<div className="profilelabels">
									<div>Location: </div>
									<div>Gender:</div>
									<div>Age:</div>
									<div>About me:</div>
								</div>
								<div className="profiledata">
									<div>{location}</div>
									<div>{gender != "" ? gender:"n/a"}</div>
									<div>{age!= "" ? age:"n/a"}</div>
									<br></br>
									<div className="quotation">{about}</div>
								</div>
							</div>
					

						</div>
	
				
				)

	}

	galleryrender(){

		

		var imagesarray =[];
		var imgempty = "https://i.imgur.com/RmQGVhT.png";
		var favbooks = this.profileres.data.favbooks.GoodreadsResponse.reviews[0].review;
		//console.log(JSON.stringify(favbooks,null,2));


		for(var i=0;i<9;i++){

			//console.log(JSON.stringify(favbooks[i].book[0].small_image_url[0]));
			if( !(favbooks) || !favbooks[i]){
				imagesarray.push(<figure key={i}><img src={imgempty} alt=""></img></figure>);
			}else{
				console.log(favbooks[i])
				imagesarray.push(<figure key={i} onClick={() => this.toggle(1)}><img src={favbooks[i].book[0].image_url[0]} alt=""></img></figure>);
			}

		}

		


				return(

						<div className="gallery1">

							<div className="container2">

								<div id="carousel">
									{imagesarray}
								</div>
							</div>
					
						</div>
					)
						
	}




	
	render(){

		this.profileload(this.props.thisuser);

		return(
				
				<div className="profilecontainer">

					{this.state.dataloaded != 'notloaded' ? this.profilerender() : <div className="loader"></div>}
					{this.state.dataloaded != 'notloaded' ? this.galleryrender() : <div></div>}
					
				<div className="favbookscontainer">
					<div className="favbookstitle">Favorite books</div>
					<div className="favbooksicon">
						<img src="https://i.imgur.com/600kya8.jpg"></img>
					</div>
				</div>
				  
				</div>
			

			)

	}

}


function mapStateToProps(props){


	return {thisuser:props.auth}
}

export default connect(mapStateToProps,notebookid)(Profile);