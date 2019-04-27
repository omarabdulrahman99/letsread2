import React, { Component } from "react";
import dateFns from "date-fns";
import axios from "axios";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "mdbreact";
import DateTimePicker from "react-datetime-picker";

class Calendar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentMonth: new Date(),
			selectedDate: new Date(),
			booksched: this.props.booksched,
			bookid: this.props.bookid,
			user: this.props.user,
			createmodal: false,
			editmodal: false,
			warning1: false,
			warning2: false,
			warning3: false,
			startdate: null,
			enddate: null,
			calchange: false,
			saveddates: null,
			titlenum: 1
		};

		this.togglee = false;
		this.togsd = null; //startdate for modale (edit one)
		this.toged = null; //enddate for modale (edit one)
	}

	async componentDidMount() {
		//since preview is of a specific book, we need the user and bookid for the api data. action is get/save/delete. get to retrieve initial data.
		//to render the book dates visually. if there are no scheduled dates saved, titlenum is set to 0. titlenum is the index for eaach saved date, so that
		//when clicking on a saved date visually, we can use that titlenum, to reference that saved date in mongodb, which is in an array of svds[key]ects, and edit it or delete it.
		//titlenum will be the last saved number, with one added to it, for the next date svds[key]ect to be saved.

		const datesres = await axios.post("/api/booksched", {
			user: this.state.user,
			bookid: this.state.bookid,
			action: "get"
		});
		var dates;

		if (datesres.data.dates) {
			dates = datesres.data.dates.datesched;
			if (dates && dates.length > 0) {
				this.setState({
					saveddates: dates,
					titlenum: dates[dates.length - 1].titlenum + 1
				});
			}
		}
	}

	addSched = async e => {
		var startdate = this.state.startdate;
		var enddate = this.state.enddate;

		if (startdate != null && enddate != null) {
			//adding a new date cant be null, and startdate has to be less than enddate.
			if (startdate < enddate) {
				var svds = this.state.saveddates;
				var getdata = true;

				//chek for existing date conflicts. loop through each saved date svds[key]ect, and if selected startdate is in between existing start date or end date, then getdata is false. same for enddate.
				if (svds != null) {
					for (var i = 0; i < svds.length; i++) {
						if (
							(startdate >= dateFns.parse(svds[i].startdate) &&
								startdate <= dateFns.parse(svds[i].enddate)) ||
							(enddate >= dateFns.parse(svds[i].startdate) &&
								enddate <= dateFns.parse(svds[i].enddate))
						) {
							getdata = false;
						}

						if (
							(dateFns.parse(svds[i].startdate) >= startdate &&
								dateFns.parse(svds[i].startdate) <= enddate) ||
							(dateFns.parse(svds[i].enddate) >= startdate &&
								dateFns.parse(svds[i].enddate) <= enddate)
						) {
							getdata = false;
						}
					}
				}

				if (getdata == false) {
					this.setState({
						warning1: false,
						warning2: false,
						warning3: true
					});
				} else {
					this.setState({
						warning1: false,
						warning2: false,
						warning3: false
					});
					var datesched = {
						startdate: startdate.toString(),
						enddate: enddate.toString(),
						titlenum: this.state.titlenum
					};
					const datesres = await axios.post("/api/booksched", {
						user: this.state.user,
						bookid: this.state.bookid,
						action: "save",
						datesched: datesched
					});

					this.setState({
						saveddates: datesres.data.dates.datesched,
						titlenum:
							datesres.data.dates.datesched[
								datesres.data.dates.datesched.length - 1
							].titlenum + 1
					});
				}
			} else {
				this.setState({
					warning2: true,
					warning1: false,
					warning3: false
				});
			}
		} else {
			this.setState({ warning1: true, warning2: false, warning3: false });
		}

		//this.setState({warning:true})

		// const sched = await axios.post('/api/booksched', {user:this.state.user});
	};

	//for when you click on a displayed schedule on the calendar. it opens up a modal with the current dates to edit.  save, delete, cancel.
	editSched = async e => {
		var startdate = this.state.startdate;
		var enddate = this.state.enddate;

		if (startdate != null && enddate != null) {
			if (startdate < enddate) {
				var svds = { ...this.state.saveddates };
				var getdata = true;

				for (let key in svds) {
					if (svds[key].titlenum == this.editnum) {
						//svds.splice(i,1)

						delete svds[key];
					}
				}

				//chek for existing date conflicts. loop through each saved date svds[key]ect, and if selected startdate is in between existing start date or end date, then getdata is false. same for enddate.

				for (let key in svds) {
					if (
						(startdate >= dateFns.parse(svds[key].startdate) &&
							startdate <= dateFns.parse(svds[key].enddate)) ||
						(enddate >= dateFns.parse(svds[key].startdate) &&
							enddate <= dateFns.parse(svds[key].enddate))
					) {
						getdata = false;
					}

					if (
						(dateFns.parse(svds[key].startdate) >= startdate &&
							dateFns.parse(svds[key].startdate) <= enddate) ||
						(dateFns.parse(svds[key].enddate) >= startdate &&
							dateFns.parse(svds[key].enddate) <= enddate)
					) {
						getdata = false;
					}
				}

				if (getdata == false) {
					this.setState({
						warning1: false,
						warning2: false,
						warning3: true
					});
				} else {
					this.setState({
						warning1: false,
						warning2: false,
						warning3: false
					});
					var datesched = {
						startdate: startdate.toString(),
						enddate: enddate.toString(),
						titlenum: this.editnum
					};
					const datesres = await axios.post("/api/booksched", {
						user: this.state.user,
						bookid: this.state.bookid,
						action: "edit",
						datesched: datesched
					});

					this.setState({ saveddates: datesres.data.datesched });
				}
			} else {
				this.setState({
					warning2: true,
					warning1: false,
					warning3: false
				});
			}
		} else {
			this.setState({ warning1: true, warning2: false, warning3: false });
		}
	};

	deleteSched = async () => {
		var editnum = this.editnum;
		var dateres = await axios.post("/api/booksched", {
			user: this.state.user,
			bookid: this.state.bookid,
			titlenum: editnum,
			action: "delete",
			startdate: this.state.startdate,
			enddate: this.state.enddate
		});
		this.setState({ saveddates: dateres.data.book.datesched });

		this.togglemodale();
	};

	//for onChange handler of datepickers. setState of new values.
	schedinput = (value, e) => {
		//check if end date is ahead of startdate

		if (e == "startdate") {
			this.setState(prevState => {
				return {
					startdate: value,
					calchange: true
				};
			});
		} else {
			this.setState(prevState => {
				return {
					enddate: value,
					calchange: true
				};
			});
		}
	};

	togglemodalc = () => {
		//the calendar edit starts off with the selectedDate. calchange is the boolean that is used to determine if the onchange values are updated visually.
		//calchange is initially false, so that we start off with selectedDate. It becomes true in the onChange handler. Then, when we close the modal, we set it to false again,
		//using the same modalc handler, so that when we open it again, and onchange happens, we dont use the previous start/end dates.

		//check for togglemodale. If you click on a square, and also on the blue spot, both modals with pop up.
		//this will immediately reverse the createmodal and keep the editmodal.

		if (this.togglee === "open") {
			this.togglee = false;
			this.setState({
				createmodal: false,
				warning1: false,
				warning2: false,
				warning3: false,
				calchange: false,
				startdate: this.togsd,
				enddate: this.toged
			});
		} else {
			this.setState({
				createmodal: !this.state.createmodal,
				warning1: false,
				warning2: false,
				warning3: false,
				calchange: false,
				startdate: this.state.selectedDate,
				enddate: this.state.selectedDate
			});
		}
	};

	togglemodale = e => {
		if (e) {
			var titlenum = e.currentTarget.id;

			this.editnum = titlenum;

			var saveddates = this.state.saveddates;
			var found = false;
			var sd;
			var ed;
			for (var obj of saveddates) {
				if (obj.titlenum == titlenum) {
					this.togsd = dateFns.parse(obj.startdate);
					this.toged = dateFns.parse(obj.enddate);
					sd = obj.startdate;
					ed = obj.enddate;
					found = true;
				}
			}

			if (found) {
				this.setState({ startdate: sd, enddate: ed }, () => {
					this.togglee = "open";
					this.setState({
						editmodal: !this.state.editmodal
					});
				});
			} else {
				this.setState({ editmodal: !this.state.editmodal });
			}
		} else {
			this.setState({ editmodal: !this.state.editmodal });
		}
	};

	onDateClick = day => {
		//call clickhandler for modal
		this.setState(
			{
				selectedDate: day
			},
			() => this.togglemodalc()
		);
	};

	nextMonth = () => {
		this.setState({
			currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
		});
	};

	prevMonth = () => {
		this.setState({
			currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
		});
	};

	renderHeader() {
		const dateFormat = "MMMM YYYY";

		return (
			<div className="header row flex-middle">
				<div className="col col-start">
					<div className="icon" onClick={this.prevMonth}>
						chevron_left
					</div>
				</div>
				<div className="col col-center">
					<span>
						{dateFns.format(this.state.currentMonth, dateFormat)}
					</span>
				</div>
				<div className="col col-end" onClick={this.nextMonth}>
					<div className="icon">chevron_right</div>
				</div>
			</div>
		);
	}

	renderDays() {
		const dateFormat = "dddd";
		const days = [];

		let startDate = dateFns.startOfWeek(this.state.currentMonth);
		for (let i = 0; i < 7; i++) {
			days.push(
				<div className="col col-center" key={i}>
					{dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
				</div>
			);
		}

		return <div className="days row">{days}</div>;
	}

	renderCells() {
		const { currentMonth, selectedDate } = this.state;
		const monthStart = dateFns.startOfMonth(currentMonth);
		const monthEnd = dateFns.endOfMonth(monthStart);
		const startDate = dateFns.startOfWeek(monthStart);
		const endDate = dateFns.endOfWeek(monthEnd);

		const dateFormat = "D";
		const rows = [];

		let days = [];
		let day = startDate;
		let formattedDate = "";

		let svdsnum = this.state.saveddates ? this.state.saveddates.length : 0;
		let saveddates = this.state.saveddates;

		while (day <= endDate) {
			for (let i = 0; i < 7; i++) {
				formattedDate = dateFns.format(day, dateFormat);
				const cloneDay = day;
				var colorsched = [];

				for (var j = 0; j < svdsnum; j++) {
					var sd = dateFns.format(
						saveddates[j].startdate,
						"MM/DD/YYYY"
					);
					var ed = dateFns.format(
						saveddates[j].enddate,
						"MM/DD/YYYY"
					);
					var cDay = dateFns.format(cloneDay, "MM/DD/YYYY");

					if (cDay >= sd && cDay <= ed) {
						colorsched.push(
							<div
								key={saveddates[j].titlenum}
								id={saveddates[j].titlenum}
								onClick={this.togglemodale}
								className="calsched"
							/>
						);
					}
				}

				days.push(
					<div
						className={`style-13 col cell ${
							!dateFns.isSameMonth(day, monthStart)
								? "disabled"
								: dateFns.isSameDay(day, selectedDate)
								? "selected"
								: ""
						}`}
						key={day}
						onClick={() =>
							this.onDateClick(dateFns.parse(cloneDay))
						}
					>
						<span className="number">{formattedDate}</span>
						{colorsched}
					</div>
				);

				day = dateFns.addDays(day, 1);
			}

			rows.push(
				<div className="row" key={day}>
					{days}
				</div>
			);

			days = [];
		}

		return <div className="body">{rows}</div>;
	}

	rtogsd = () => {
		var sdsd = this.togsd;
		var stringsd = "";
		if (sdsd != null) {
			stringsd = dateFns.format(sdsd, "ddd MMM DD, YYYY hh:mm A");
			stringsd = stringsd.toString();
		}

		return <div className="editdates">{stringsd}</div>;
	};

	rtoged = () => {
		var sdsd = this.toged;
		var stringsd = "";
		if (sdsd != null) {
			stringsd = dateFns.format(sdsd, "ddd MMM DD, YYYY hh:mm A");
			stringsd = stringsd.toString();
		}

		return <div className="editdates">{stringsd}</div>;
	};

	render() {
		var sd = "startdate";
		var ed = "enddate";
		var warning1 = "Make sure you select both dates";
		var warning2 = "Make sure start date is before the end date";
		var warning3 = "Date range conflict with existing dates";

		return (
			<div className="calendar">
				{this.renderHeader()}
				{this.renderDays()}
				{this.renderCells()}

				<Modal isOpen={this.state.editmodal} toggle={this.togglemodale}>
					<ModalHeader toggle={this.togglemodale}>
						<div>Edit this current schedule</div>
					</ModalHeader>
					<ModalBody>
						<div>
							<div className="editlabel">Start:</div>
							{this.rtogsd()}
							<div className="editlabel">End:</div>
							{this.rtoged()}
						</div>
						<span className="editlabel2">Start Date:</span>
						<DateTimePicker
							className="dtpickstart"
							onChange={value => {
								this.schedinput(value, sd);
							}}
							value={this.state.startdate}
						/>
						<br />
						<span className="editlabel2">End Date:</span>
						<DateTimePicker
							className="dtpickend"
							onChange={value => {
								this.schedinput(value, ed);
							}}
							value={this.state.enddate}
						/>
						{this.state.warning1 == false ? null : (
							<div>{warning1}</div>
						)}
						{this.state.warning2 == false ? null : (
							<div>{warning2}</div>
						)}
						{this.state.warning3 == false ? null : (
							<div>{warning3}</div>
						)}
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={this.editSched}>
							Save changes
						</Button>
						<Button color="green" onClick={this.deleteSched}>
							Delete
						</Button>
						<Button color="secondary" onClick={this.togglemodale}>
							Close
						</Button>
					</ModalFooter>
				</Modal>

				<Modal
					isOpen={this.state.createmodal}
					toggle={this.togglemodalc}
				>
					<ModalHeader toggle={this.togglemodalc}>
						Set this book's reading schedule
					</ModalHeader>
					<ModalBody>
						Start Date:
						<DateTimePicker
							onChange={value => {
								this.schedinput(value, sd);
							}}
							value={
								this.state.calchange != false
									? this.state.startdate
									: this.state.selectedDate
							}
						/>
						<br />
						End Date:
						<DateTimePicker
							onChange={value => {
								this.schedinput(value, ed);
							}}
							value={
								this.state.calchange != false
									? this.state.enddate
									: this.state.selectedDate
							}
						/>
						{this.state.warning1 == false ? null : (
							<div>{warning1}</div>
						)}
						{this.state.warning2 == false ? null : (
							<div>{warning2}</div>
						)}
						{this.state.warning3 == false ? null : (
							<div>{warning3}</div>
						)}
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={this.addSched}>
							Save changes
						</Button>
						<Button color="secondary" onClick={this.togglemodalc}>
							Close
						</Button>{" "}
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

export default Calendar;
