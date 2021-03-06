import React, { Component } from "react";
import { connect } from "react-redux";
import { MDBDataTable } from "mdbreact";
import Button from "./AddToShelfButton";
import axios from "axios";

class SearchResults extends Component {
	constructor(props) {
		super(props);
		this.searchRef = React.createRef();
		this.state = {
			searchquery: "",
			trows: this.props.tdata.rows,
			tcolumns: this.props.tdata.columns,
			tbooksarray: this.props.tdata.booksarray,
			usershelfbooksraw: this.props.usershelfbooksraw,
			shelflist: this.props.shelflist,
			searchcounter: 0
		};
		this.handleInputChanges = this.handleInputChanges.bind(this);
		this.handleSubmits = this.handleSubmits.bind(this);
	}

	componentDidMount() {
		var usershelfbooks = "";
		var usershelfbooksraw = this.state.usershelfbooksraw;
		var user = this.props.user;

		if (usershelfbooksraw) {
			usershelfbooks = this.state.usershelfbooksraw.data.usershelfbooks;
		} else {
			usershelfbooks = this.state.usershelfbooksraw;
		}

		var booksarray = this.state.tbooksarray;
		var trows = this.state.trows;
		var tcolumns = this.state.tcolumns;
		var shelflist = this.state.shelflist;
		var searchcounter = this.state.searchcounter;

		if (this.props.thisuser) {
			trows.forEach(function(rowobj, i, trowsArray) {
				trowsArray[i].button = (
					<Button
						usershelfbooks={usershelfbooks}
						shelflist={shelflist}
						bookobj={booksarray[i]}
						searchcounter={searchcounter}
					/>
				);
			});
		} else {
			tcolumns.pop();
		}

		this.setState({ trows: trows });
	}

	async handleSubmits(e) {
		e.preventDefault();
		var ee = e.currentTarget;
		var event = e.currentTarget;
		var dataresults = "";
		var usershelfbooks = "";
		var usershelfbooksraw = "";
		var shelflist = "";
		var user = this.props.thisuser;

		if (this.props.thisuser) {
			shelflist = await axios.post("/api/shelflist", {
				user: this.props.thisuser
			});

			usershelfbooksraw = await axios.post("/api/usershelfbooks", {
				goodreadId: this.props.thisuser.goodreadId
			});

			usershelfbooks = usershelfbooksraw.data.usershelfbooks;
		} else {
			shelflist = false;
			usershelfbooksraw = false;
			usershelfbooks = false;
		}

		if (event.nodeName === "DIV") {
			const form = ee.parentNode;
			const query = form.elements["searchq"].value;
			if (query === "") {
				return null;
			}

			dataresults = await axios.get(`/api/search/${query}`);

			let searchcounter = this.state.searchcounter;
			let booksarray = dataresults.data.booksarray;

			if (this.props.thisuser) {
				dataresults.data.rows.forEach(function(rowobj, i, trowsArray) {
					trowsArray[i].button = (
						<Button
							shelflist={shelflist}
							usershelfbooks={usershelfbooks}
							bookobj={booksarray[i]}
							searchcounter={searchcounter}
						/>
					);
				});
			} else {
				dataresults.data.columns.pop();
			}

			this.setState(prevState => ({
				trows: dataresults.data.rows,
				tcolumns: dataresults.data.columns,
				tbooksarray: dataresults.data.booksarray,
				searchcounter: prevState.searchcounter + 1
			}));
		} else {
			const form = ee;
			const query = form.elements["searchq"].value;
			if (query === "") {
				return null;
			}
			dataresults = await axios.get(`/api/search/${query}`);

			let searchcounter = this.state.searchcounter;

			let booksarray = dataresults.data.booksarray;

			if (this.props.thisuser) {
				dataresults.data.rows.forEach(function(rowobj, i, trowsArray) {
					trowsArray[i].button = (
						<Button
							shelflist={shelflist}
							usershelfbooks={usershelfbooks}
							bookobj={booksarray[i]}
							searchcounter={searchcounter}
						/>
					);
				});
			} else {
				dataresults.data.columns.pop();
			}

			this.setState(prevState => ({
				trows: dataresults.data.rows,
				tcolumns: dataresults.data.columns,
				tbooksarray: dataresults.data.booksarray,
				searchcounter: prevState.searchcounter + 1
			}));
		}
	}

	handleInputChanges(e) {
		this.setState({
			searchquery: e.target.value
		});
	}

	render() {
		var tdata = {
			columns: this.state.tcolumns,
			rows: this.state.trows
		};

		return (
			<div>
				<p className="marquee">
					<span>
						GoodreadsAPI corrently borken like zis Engrish. You
						cannot add books to shelves from here. Will be fixed
						once updated. Thanks for your patience!
					</span>
				</p>
				<div className="topsearch">
					<form
						onSubmit={this.handleSubmits}
						className="form-inline active-pink-3 active-pink-4 "
					>
						<div onClick={this.handleSubmits}>
							<i
								onClick={this.onClicki}
								className="fa fa-search"
							/>
						</div>
						<input
							className="form-control form-control-sm ml-3 w-75"
							ref={this.searchRef}
							required={true}
							type="text"
							name="searchq"
							value={this.state.searchquery}
							onChange={this.handleInputChanges}
							placeholder="Search books by title, isbn, or author!"
							aria-label="Search"
						/>
					</form>
				</div>

				<div>
					<MDBDataTable
						striped
						bordered
						fixed
						hover
						small
						paging={false}
						data={tdata}
					/>
				</div>
			</div>
		);
	}
}

function mapStateToProps(props) {
	return { thisuser: props.auth };
}

export default connect(mapStateToProps)(SearchResults);
