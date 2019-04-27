import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataloaded: "notloaded"
		};
		this.profileload = this.profileload.bind(this);
		this.profilerender = this.profilerender.bind(this);
		this.toggle = this.toggle.bind(this);
		this.profileres = "";
	}

	componentDidMount() {
		this.profileload(this.props.thisuser);
	}

	toggle(nr) {
		console.log("toggle1");
		let modalNumber = "modal" + nr;
		this.setState(
			{
				[modalNumber]: !this.state[modalNumber]
			},
			() => console.log(this.state.modal1)
		);
	}

	async profileload(user) {
		if (!user.goodreadId) {
			return <div>nodata</div>;
		} else {
			if (this.state.dataloaded == "loaded") {
			} else {
				var profileres = await axios.post("/api/profileinfo", {
					goodreadId: user.goodreadId
				});

				this.profileres = profileres;

				this.setState(prevState => ({
					dataloaded:
						prevState.dataloaded != "notloaded" ? null : "loaded"
				}));
			}
		}
	}

	profilerender() {
		var profileuserdata = this.profileres.data.profileinfo.GoodreadsResponse
			.user;
		var name = profileuserdata[0].name[0];
		var gender = profileuserdata[0].gender[0];
		var location = profileuserdata[0].location[0];
		var age = profileuserdata[0].age[0];
		var about = profileuserdata[0].about[0];
		var image = profileuserdata[0].image_url[0];

		var styles = {
			backgroundImage: `url(${image})`
		};

		return (
			<div className="profiledetail">
				<div className="profileimage" style={styles} />
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
						<div>{gender != "" ? gender : "n/a"}</div>
						<div>{age != "" ? age : "n/a"}</div>
						<br />
						<div className="quotation">{about}</div>
					</div>
				</div>
			</div>
		);
	}

	galleryrender() {
		var imagesarray = [];
		var imgempty = "https://i.imgur.com/RmQGVhT.png";
		var favbooks = this.profileres.data.favbooks.GoodreadsResponse
			.reviews[0].review;
		//console.log(JSON.stringify(favbooks,null,2));

		for (var i = 0; i < 9; i++) {
			//console.log(JSON.stringify(favbooks[i].book[0].small_image_url[0]));
			if (!favbooks || !favbooks[i]) {
				imagesarray.push(
					<figure key={i}>
						<img src={imgempty} alt="" />
					</figure>
				);
			} else {
				imagesarray.push(
					<figure key={i} onClick={() => this.toggle(1)}>
						<img src={favbooks[i].book[0].image_url[0]} alt="" />
					</figure>
				);
			}
		}

		return (
			<div className="gallery1">
				<div className="container2">
					<div id="carousel">{imagesarray}</div>
				</div>
			</div>
		);
	}

	render() {
		return (
			<div className="profilecontainer">
				{this.state.dataloaded != "notloaded" ? (
					this.profilerender()
				) : (
					<div className="loader" />
				)}
				{this.state.dataloaded != "notloaded" ? (
					this.galleryrender()
				) : (
					<div />
				)}

				{this.state.dataloaded != "notloaded" ? (
					<div className="favbookscontainer">
						<div className="favbookstitle">Favorite books</div>
						<div className="favbooksicon">
							<span>☆</span>
							<span>☆</span>
							<span>☆</span>
							<span>☆</span>
							<span>☆</span>
						</div>
					</div>
				) : null}
			</div>
		);
	}
}

function mapStateToProps(props) {
	return { thisuser: props.auth };
}

export default connect(mapStateToProps)(Profile);
