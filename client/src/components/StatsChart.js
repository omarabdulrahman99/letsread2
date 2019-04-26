import React, {Component} from 'react';
import {connect} from "react-redux";
import axios from 'axios';
import ReactD3, {d3,BarChart, LineChart} from 'react-d3-components';
import dateFns from 'date-fns';





class StatsChart extends Component {


	constuctor(props){
		
		this.chartref = React.createRef();
		this.state = {
			books:null,
			shelves:null,
			joindate:null,
			drawcharts:false,
			chartWidth:620,
			initialwidth:1,
			draw3view:"week",
			secs:0
		}

	}







	async componentDidMount(){

		const booksres = await axios.post('/api/usershelfbooks', {goodreadId:this.props.thisuser.goodreadId});
		const books = booksres.data.usershelfbooks;


		const shelfres = await axios.post('/api/shelflist', {user:this.props.thisuser});
		const shelves = shelfres.data.GoodreadsResponse.shelves[0].user_shelf;

		const profileres = await axios.post('/api/profileonly', {goodreadId:this.props.thisuser.goodreadId});
		const joindate = profileres.data.profileinfo.GoodreadsResponse.user[0].joined[0];
		




		window.addEventListener('resize', this.handleResize);
		
		   	let winwidth = window.innerWidth;
		 
		   	if(winwidth >=0 && winwidth <= 500){
		   		this.setState({chartWidth:300, chartHeight:250});
	    	}else if(winwidth >=501 && winwidth <= 600) {
			   	
			   		this.setState({chartWidth:500, chartHeight:400});
		    	
	    	}else if(winwidth >=601 && winwidth <= 700){

	    			this.setState({chartWidth:580, chartHeight:425})

    		}else if(winwidth >=701 && winwidth <= 800){

	    			this.setState({chartWidth:680, chartHeight:450})

    		}else if(winwidth >=801 && winwidth <= 900){

	    			this.setState({chartWidth:780, chartHeight:475})

    		}else if(winwidth >=901 && winwidth <= 1100){

	    			this.setState({chartWidth:780, chartHeight:500})
    		}else{

    				this.setState({chartWidth:1080, chartHeight:525})
    		}
	


		this.setState({books:books, shelves:shelves, joindate:joindate, draw3view:"year", totalreadChecked:"year"}, () => {this.setState({drawcharts:true});})

		const getNoteSecs = this.getNoteSecs;
		getNoteSecs();
		
		setInterval(function(){
			getNoteSecs();
		},10000);

	}


		getNoteSecs = async () => {

			const notetimesecs = await axios.post('/api/getnotetimesecs', {user:this.props.thisuser });
			const secs = notetimesecs.data.totalsecs.savednotetime;

			const dhms = this.secstodhms(secs);

			this.setState({ ...dhms});
		}


		secstodhms = (seconds) => {


			  var days     = Math.floor(seconds / (24*60*60));
			      seconds -= days    * (24*60*60);
			  var hours    = Math.floor(seconds / (60*60));
			      seconds -= hours   * (60*60);
			  var minutes  = Math.floor(seconds / (60));
			      seconds -= minutes * (60);



			    return {days:days, hours:hours, minutes:minutes, seconds:seconds}
		}


	   handleResize = (e) => {

		   	let winwidth = window.innerWidth;
		   	if(winwidth >=0 && winwidth <= 500){
		   		this.setState({chartWidth:300, chartHeight:250});
	    	}else if(winwidth >=501 && winwidth <= 600) {
			   	
			   		this.setState({chartWidth:500, chartHeight:400});
		    	
	    	}else if(winwidth >=601 && winwidth <= 700){

	    			this.setState({chartWidth:580, chartHeight:425})

    		}else if(winwidth >=701 && winwidth <= 800){

	    			this.setState({chartWidth:680, chartHeight:450})

    		}else if(winwidth >=801 && winwidth <= 900){

	    			this.setState({chartWidth:780, chartHeight:475})

    		}else if(winwidth >=901 && winwidth <= 1100){

	    			this.setState({chartWidth:780, chartHeight:500})
    		}else{

    				this.setState({chartWidth:1080, chartHeight:525})
    		}


	  }




	drawChart = () => {

				var pages = [
					{
						x:"100-200",
						y:0
					},
					{
						x:"201-300",
						y:0
					},
					{
						x:"301-400",
						y:0
					},
					{
						x:"401-500",
						y:0
					},
					{
						x:"501-600",
						y:0
					},
					{
						x:"601-700",
						y:0
					},
					{
						x:"701-800",
						y:0

					},
					{
						x:"801-900",
						y:0
					}

				];

				let books = this.state.books;
				console.log(books)
				for(let i=0;i<(books ? books.length : 0);i++){
					
					let numpages = books[i].book[0].num_pages[0];
					
					if(numpages >=100 && numpages <= 200){
						pages[0].y += 1;
					}
					if(numpages >=201 && numpages <= 300){
						pages[1].y += 1;
					}
					if(numpages >=301 && numpages <=400){
						pages[2].y += 1;
					}
					if(numpages >=401 && numpages <=500){
						pages[3].y += 1;
					}
					if(numpages >=501 && numpages <=600){
						pages[4].y += 1;
					}
					if(numpages >=601 && numpages <=700){
						pages[5].y += 1;
					}
					if(numpages >=701 && numpages <=800){
						pages[6].y += 1;
					}
					if(numpages >=801 && numpages <= 900){
						pages[7].y += 1;
					}

			}


			var data = [{label:"useless label", values:pages}]
			var width = this.state.chartWidth;
			var height = this.state.chartHeight;

			return (

				<div>

						<div className="chartTitle">Preference for length of book</div>
						
							<BarChart
								data={data}
								width={width || 620}
								height={height}
								margin={{top:90, bottom:50, left:50, right:10}}
								xAxis={{label: "Pages"}}
                    			yAxis={{label: "No. of books"}}
						
							/>
					
				</div>


				)


	}


	drawChart2 = () => {

				var shelves = this.state.shelves;
				shelves.sort(function(a,b){

					return a.book_count[0]._  -  b.book_count[0]._

				})

				var data = [{
					label:"useless label",
					values:[]
				}];


				var top6 = shelves.length >= 6 ? shelves.slice(shelves.length-6) : shelves;
				

				

				for(let i=0;i<top6.length;i++){

					let shelfname = top6[i].name[0];
					let bkcount = top6[i].book_count[0]._;
	
					data[0].values.push({x:shelfname, y:parseInt(bkcount)});

				}

			

			var width = this.state.chartWidth;
			var height = this.state.chartHeight;


			return (

				<div>

						<div className="chartTitle">Your Hottest Shelves/Genres</div>
						<BarChart
							data={data}
							width={width || 620}
							height={height || 450}
							margin={{top:90, bottom:50, left:50, right:10}}
							xAxis={{label: "Shelf names"}}
                    		yAxis={{label: "No.of books"}}
					


						/>

				</div>


				)

	}





	drawChart3 = () => {

		var data = [{
			label:"useless label",
			values:[]
		}];

		let currDate = new Date();


		let books = this.state.books;


		//only get books on the 'read' shelf.
		let booksread = books ? books.filter((book) => {

			for(let i=0;i<book.shelves.length;i++){
				if(book.shelves[i].shelf[0].$.name == "read"){
					return true;
				}
			}

			return false;

		}) : null;

		

		


			if(this.state.draw3view == "week"){
						
						data[0].values = [];
					
						let startOfWeek = dateFns.startOfWeek(currDate);
						let endOfWeek = dateFns.endOfWeek(currDate);	
						let daysArr = dateFns.eachDay(startOfWeek, endOfWeek);
						//for week view.
						//populate values array full of objects, x stands for date to be represented, y for #of books
						for(let i=0;i<daysArr.length;i++){
							let tempday = daysArr[i];
							data[0].values.push({x:tempday, y:0})

						}

						


						//loop through each book & compare its date with each date in data.values array. if equals, then increment y by 1.
						for(let i=0;i<(booksread ? booksread.length : 0);i++){
							let tempbook = booksread[i].date_updated[0];
							
							for(let j=0;j<data[0].values.length;j++){

								let tempday = data[0].values[j].x;
								if(dateFns.isSameDay(tempday,tempbook)){
									data[0].values[j].y += 1;
								}
							}

						}




						
						for(let i=0;i<data[0].values.length;i++){
							data[0].values[i].x = dateFns.format(data[0].values[i].x, 'MMM D');
						}

						
						//let yScale = d3.scale.linear().domain([0,10]);
						var width = this.state.chartWidth;
						var height = this.state.chartHeight;


						return(

							<div>
								<div className="chartTitle">Books read by this Week/Month/Year/All-time</div>
				                <LineChart
				                   data={data}
				                   width={width || 620}
				                   height={height || 450}
				                   margin={{top: 10, bottom: 50, left: 50, right: 20}}
				           		   xAxis={{label: "Dates"}}
				            	   yAxis={{label: "No. of books", ticks: booksread ? booksread.length : 0, tickFormat:function(e){if(Math.floor(e) != e){return;}return e;}}}

				                />
				            </div>
						)

			}


			if(this.state.draw3view == "month"){

						data[0].values = [];
					
						let startOfMonth = dateFns.startOfMonth(currDate);
						let endOfMonth = dateFns.lastDayOfMonth(currDate);	
						let daysArr = dateFns.eachDay(startOfMonth, endOfMonth);


						for(let i=0;i<daysArr.length;i++){
							let tempday = daysArr[i];
							data[0].values.push({x:tempday, y:0})

						}


						for(let i=0;i<(booksread ? booksread.length : 0);i++){
							let tempbook = booksread[i].date_updated[0];
							
							for(let j=0;j<data[0].values.length;j++){

								let tempday = data[0].values[j].x;
								if(dateFns.isSameDay(tempday,tempbook)){
									data[0].values[j].y += 1;
								}
							}

						}



						for(let i=0;i<data[0].values.length;i++){
							data[0].values[i].x = dateFns.format(data[0].values[i].x, 'D');
						}



						var width = this.state.chartWidth;
						var height = this.state.chartHeight;


						return(

							<div>
								<div className="chartTitle">Books read by this Week/Month/Year/All-time</div>
				                <LineChart
				                   data={data}
				                   width={width || 620}
				                   height={height || 450}
				                   margin={{top: 10, bottom: 50, left: 50, right: 20}}
				           		   xAxis={{label: "Dates"}}
				            	   yAxis={{label: "No. of books", tickFormat:function(e){if(Math.floor(e) != e){return;}return e;}}}

				                />
				            </div>
						)



			}



			if(this.state.draw3view == "year"){

						data[0].values = [];
					
						//take last day of year. subtract 1 month, 12 times loop. save those in an array, use shift for asc order.
						let lastDayOfYear = dateFns.lastDayOfYear(currDate);
						let months = [];

						for(let i=0;i<12;i++){
							//'tempmonth but rly its a day of the month for each month'
							let tempmonth = dateFns.subMonths(lastDayOfYear,i);
							months.unshift(tempmonth);
						}


						for(let i=0;i<months.length;i++){
							let tempmonth = months[i];
							data[0].values.push({x:tempmonth, y:0})

						}


						
						for(let i=0;i<(booksread ? booksread.length : 0);i++){
							let tempbook = booksread[i].date_updated[0];
							
							for(let j=0;j<data[0].values.length;j++){

								let tempday = data[0].values[j].x;
								if(dateFns.isSameMonth(tempday,tempbook)){
									data[0].values[j].y += 1;
								}
							}

						}


						
						for(let i=0;i<data[0].values.length;i++){
							data[0].values[i].x = dateFns.format(data[0].values[i].x, 'MMM');
						}



						var width = this.state.chartWidth;
						var height = this.state.chartHeight;


						return(

							<div>
								<div className="chartTitle">Books read by this Week/Month/Year/All-time</div>
				                <LineChart
				                   data={data}
				                   width={width || 620}
				                   height={height || 450}
				                   margin={{top: 10, bottom: 50, left: 50, right: 20}}
				           		   xAxis={{label: "Dates"}}
				            	   yAxis={{label: "No. of books", tickFormat:function(e){if(Math.floor(e) != e){return;}return e;}}}

				                />
				            </div>
						)

			}





			if(this.state.draw3view == "all"){

						data[0].values = [];
					
						//do currentDate minus accountCreationDate. that'll be the amount of years for loop to do subYear from currentDate.
						let joindateparsed = dateFns.parse(this.state.joindate.slice(this.state.joindate.indexOf('/')+1));
						let joindate = dateFns.format(joindateparsed,'YYYY');
						let currDateYear = dateFns.format(currDate,'YYYY');
						let numdiffyears = dateFns.differenceInYears(currDateYear,joindate)+1;
						let years = [];

				

						for(let i=0;i<numdiffyears;i++){
							let tempyear = dateFns.format(dateFns.subYears(currDateYear,i),'YYYY');
							years.unshift(tempyear);
						}

					

						for(let i=0;i<years.length;i++){
							let tempyear = years[i];
							data[0].values.push({x:tempyear, y:0})

						}

					
						
						for(let i=0;i<(booksread ? booksread.length : 0);i++){
							let tempbook = dateFns.format(booksread[i].date_updated[0], 'YYYY');
							
							for(let j=0;j<data[0].values.length;j++){

								let tempday = data[0].values[j].x;
								if(dateFns.isSameYear(tempday,tempbook)){
									data[0].values[j].y += 1;
								}
							}

						}

						

						var width = this.state.chartWidth;
						var height = this.state.chartHeight;

						data[0].values.unshift({x:dateFns.format(dateFns.subYears(data[0].values[0].x, 1),'YYYY'),  y:0 })
						//glitch sorta. line graph needs one data plot previous to connect a line. needs to have a default.
					
						return(

							<div>
								<div className="chartTitle">Books read by this Week/Month/Year/All-time</div>
				                <LineChart
				                   data={data}
				                   width={width || 620}
				                   height={height || 450}
				                   margin={{top: 10, bottom: 50, left: 50, right: 20}}
				           		   xAxis={{label: "Dates"}}
				            	   yAxis={{label: "No. of books"}}

				                />
				            </div>
						)

				


			}

			


	}


	totalreadChartRadioChange = (e) => {

		let checkedname = e.target.value;
		this.setState({totalreadChecked:checkedname, draw3view:checkedname});

	}




	render(){

		var drawcharts = this.state ?  this.state.drawcharts ? this.state.drawcharts : false : false;



		return(
			<div>

			{ drawcharts ?
				<div  className="chartLayout">

					<div className="flashsecs">

							<div className="clockTitle">Time Spent Notetaking</div>
							<div className="clockcontainer">
								<div className="days">
									<div className="day">
										<p className="sunday">Days</p>
									</div>
									<div className="day">
										<p className="sunday">Hours</p>
									</div>
									<div className="day">
										<p className="sunday">Minutes</p>
									</div>
									<div className="day">
										<p className="sunday">Seconds</p>
									</div>

								</div>
								<div className="clock">
									<div className="numbers">
										<p className="days">{this.state.days}</p>
									</div>
									<div className="colon">
										<p>:</p>
									</div>
									<div className="numbers">
										<p className="hours">{this.state.hours}</p>
									</div>
									<div className="colon">
										<p>:</p>
									</div>
									<div className="numbers">
										<p className="minutes">{this.state.minutes}</p>
									</div>
									<div className="colon">
										<p>:</p>
									</div>
									  <div className="numbers">
									    <p className="seconds">{this.state.seconds}</p>
									  </div>
								</div>
							</div>



					</div>
					<div className="pagesChart">						
						{this.drawChart()}
					</div>

					<div className="shelvesChart">
						{this.drawChart2()}
					</div>

					<div className="totalreadChart">
						{this.drawChart3()}
						<div className="totalreadChartRadioGroup">
								<input id="weekradio" type="radio" className="chartRadio" checked={this.state.totalreadChecked === "week"} value="week" onChange={this.totalreadChartRadioChange}/>
								<label htmlFor="weekradio">Week</label>
								<input id="monthradio" type="radio" className="chartRadio" checked={this.state.totalreadChecked === "month"} value="month" onChange={this.totalreadChartRadioChange}/>
								<label htmlFor="monthradio">Month</label>
								<input id="yearradio" type="radio" className="chartRadio" checked={this.state.totalreadChecked === "year"} value="year" onChange={this.totalreadChartRadioChange}/>
								<label htmlFor="yearradio">Year</label>
								<input id="allradio" type="radio" className="chartRadio" checked={this.state.totalreadChecked === "all"} value="all" onChange={this.totalreadChartRadioChange}/>
								<label htmlFor="allradio">All-time</label>
						</div>
					</div>

				</div>
			: <div className="loader"></div>}

			</div>
			)



	}




}


function mapStateToProps(props){

	return {thisuser:props.auth}

}



export default connect(mapStateToProps)(StatsChart);