import React, { Component } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "mdbreact";
import Spinner from "./Spinner";
import axios from "axios";
import { connect } from "react-redux";

class Button extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeshelf: {},
			loading: false
		};

		this.activeshelves2 = {};
		this.prevCounter = 0;
		this.othershelves2 = [];
		this.shelftitle = "";

		this.renderItems = this.renderItems.bind(this);
		this.renderToggle = this.renderToggle.bind(this);
		this.onCheckChange = this.onCheckChange.bind(this);
	}

	componentDidMount() {
		this.prevCounter = this.props.searchcounter;
		this.renderToggle();
		this.renderItems();

		this.setState({ activeshelf: this.activeshelves2 });
	}

	onCheckChange(e, shelfid, bookId, shelfname) {
		var checked = e.target.checked;
		var shelfadd = "";
		this.activeshelves2[shelfid] = checked;

		this.setState(
			prevState => ({
				activeshelf: {
					...prevState.activeshelf,
					[shelfid]: this.activeshelves2[shelfid]
				},
				loading: true
			}),
			async () => {
				shelfadd = await axios.post(
					"http://localhost:7000/api/addtoshelf",
					{
						name: shelfname,
						book_id: bookId,
						a: checked ? "" : "remove"
					}
				);

				console.log(shelfadd + " shelfadd");
				this.setState({
					loading: false
				});
			}
		);
	}

	renderToggle() {
		var bookId = this.props.bookobj.best_book[0].id[0]._;
		var usershelfbooks = this.props.usershelfbooks;
		var toggleitemd = [];
		var trueshelf = [];
		this.othershelves2 = [];
		this.shelftitle = undefined;

		if (usershelfbooks) {
			console.log(usershelfbooks);

			toggleitemd = usershelfbooks.map((book, i) => {
				if (usershelfbooks[i].book[0].id[0]._ === bookId) {
					for (
						var j = 0;
						j < usershelfbooks[i].shelves[0].shelf.length;
						j++
					) {
						if (
							usershelfbooks[i].shelves[0].shelf[j].$.exclusive ==
							"true"
						) {
							this.shelftitle =
								usershelfbooks[i].shelves[0].shelf[j].$.name;

							//exiting the for loop here, so for this book you're returning for true for map function.

							trueshelf.push(
								<DropdownToggle key={bookId} caret color="red">
									✓ {this.shelftitle}
								</DropdownToggle>
							);
						} else {
							if (
								usershelfbooks[i].shelves[0].shelf[j].$
									.exclusive == "false"
							) {
								this.othershelves2.push(
									usershelfbooks[i].shelves[0].shelf[j].$.name
								);
							}
						}
					}

					return trueshelf;
				}
			});

			if (this.othershelves2.length == 0) {
				this.othershelves2 = undefined;
			}

			var toggleitem = toggleitemd.filter(n => n);

			if (toggleitem === undefined || toggleitem.length == 0) {
				return (
					<DropdownToggle caret color="warning">
						Want to read &#63;
					</DropdownToggle>
				);
			} else {
				return toggleitem;
			}
		} else {
			return (
				<DropdownToggle caret color="warning">
					Want to read &#63;
				</DropdownToggle>
			);
		}
	}

	renderItems() {
		var ditems = [];
		var bookId = this.props.bookobj.best_book[0].id[0]._;
		var shelflist = this.props.shelflist;

		if (shelflist) {
			var shelves =
				shelflist.data.GoodreadsResponse.shelves[0].user_shelf;

			ditems = shelves.map(shelf => {
				if (shelf.exclusive_flag[0]._ == "true") {
					if (this.shelftitle) {
						if (this.shelftitle != shelf.name[0]) {
							return (
								<DropdownItem key={shelf.id[0]._}>
									{shelf.name[0]}
								</DropdownItem>
							);
						}
					} else {
						return (
							<DropdownItem key={shelf.id[0]._}>
								{shelf.name[0]}
							</DropdownItem>
						);
					}
				} else {
					if (this.othershelves2) {
						var shelfmatch = undefined;
						var nomatch = undefined;

						for (var j = 0; j < this.othershelves2.length; j++) {
							if (shelf.name[0] == this.othershelves2[j]) {
								this.activeshelves2[shelf.id[0]._] = true;
								shelfmatch = (
									<div
										key={shelf.id[0]._}
										className="checkboxinput"
									>
										<label key={shelf.id[0]._}>
											{this.state.loading ? (
												<Spinner />
											) : (
												""
											)}
											<input
												key={shelf.id[0]._}
												onChange={e =>
													this.onCheckChange(
														e,
														shelf.id[0]._,
														bookId,
														shelf.name[0]
													)
												}
												type="checkbox"
												value={shelf.name[0]}
												checked={
													this.state.activeshelf[
														shelf.id[0]._
													]
												}
											/>
											{shelf.name[0]}
										</label>
										<br />
									</div>
								);
							} else {
								this.activeshelves2[shelf.id[0]._] = false;

								nomatch = (
									<div
										key={shelf.id[0]._}
										className="checkboxinput"
									>
										<label key={shelf.id[0]._}>
											{this.state.loading ? (
												<Spinner />
											) : (
												""
											)}
											<input
												key={shelf.id[0]._}
												onChange={e =>
													this.onCheckChange(
														e,
														shelf.id[0]._,
														bookId,
														shelf.name[0]
													)
												}
												type="checkbox"
												value={shelf.name[0]}
												checked={
													this.state.activeshelf[
														shelf.id[0]._
													]
												}
											/>
											{shelf.name[0]}
										</label>
										<br />
									</div>
								);
							}
						}

						if (shelfmatch) {
							return shelfmatch;
						} else {
							return nomatch;
						}
					} else {
						this.activeshelves2[shelf.id[0]._] = false;

						return (
							<div key={shelf.id[0]._} className="checkboxinput">
								<label key={shelf.id[0]._}>
									{this.state.loading ? <Spinner /> : ""}
									<input
										key={shelf.id[0]._}
										onChange={e =>
											this.onCheckChange(
												e,
												shelf.id[0]._,
												bookId,
												shelf.name[0]
											)
										}
										type="checkbox"
										value={shelf.name[0]}
										checked={
											this.state.activeshelf[
												shelf.id[0]._
											]
										}
									/>
									{shelf.name[0]}
								</label>
								<br />
							</div>
						);
					}
				}
			});
		} else {
			ditems.push(<DropdownItem key={1}>read</DropdownItem>);
			ditems.push(<DropdownItem key={2}>currently-reading</DropdownItem>);
			ditems.push(<DropdownItem key={3}>to-read</DropdownItem>);
		}

		//if nnot equal to searchcounter, then a new search has started and reset checkbox values from API.

		//console.log(JSON.stringify(Button.activeshelves,null,2)+'buttonshelf');
		//console.log(JSON.stringify(this.state.activeshelf,null,2)+'stateshelf');

		if (this.prevCounter != this.props.searchcounter) {
			console.log(
				this.prevCounter +
					"uhmm" +
					this.props.searchcounter +
					"should change"
			);

			this.prevCounter = this.props.searchcounter;

			this.setState(
				prevState => {
					return {
						...prevState,
						activeshelf: this.activeshelves2
					};
				},
				() => console.log("completed ding!")
			);
		}

		return ditems;
	}

	render() {
		return (
			<div className="button" role="button">
				<Dropdown>
					{this.renderToggle()}

					<DropdownMenu>{this.renderItems()}</DropdownMenu>
				</Dropdown>
			</div>
		);
	}
}

function mapStateToProps(props) {
	return { thisuser: props.auth };
}

export default connect(mapStateToProps)(Button);
