import React, {Component} from 'react';
import * as d3 from "d3";
import {connect} from "react-redux";
import axios from 'axios';
import ReactD3, {BarChart, LineChart} from 'react-d3-components';
import dateFns from 'date-fns';





class StatsChart extends Component {


	constuctor(props){
		
		this.chartref = React.createRef();
		this.state = {
			books:null,
			shelves:null,
			drawcharts:"off",
			chartWidth:620,
			initialwidth:1
		}

	}



	async componentDidMount(){

		const booksres = await axios.post('/api/usershelfbooks', {goodreadId:this.props.thisuser.goodreadId});
		const books = booksres.data.usershelfbooks;

		const shelfres = await axios.post('/api/shelflist', {user:this.props.thisuser});
		const shelves = shelfres.data.GoodreadsResponse.shelves[0].user_shelf;


		console.log(books);
		window.addEventListener('resize', this.handleResize);
		
		   	let winwidth = window.innerWidth;
		   	if(winwidth >=0 && winwidth <= 500){
		   		this.setState({chartWidth:300});
	    	}else if(winwidth >=501 && winwidth <= 600) {
			   	
			   		this.setState({chartWidth:500});
		    	
	    	}else if(winwidth >=601 && winwidth <= 700){

	    			this.setState({chartWidth:580})

    		}else if(winwidth >=701 && winwidth <= 800){

	    			this.setState({chartWidth:680})

    		}else if(winwidth >=801 && winwidth <= 900){

	    			this.setState({chartWidth:780})

    		}else if(winwidth >=901 && winwidth <= 1020){

	    			this.setState({chartWidth:780})
    		}else{

    				this.setState({chartWidth:780})
    		}
	


		this.setState({books:books, shelves:shelves}, () => {this.setState({drawcharts:true});})

	}


	   handleResize = (e) => {

		   	let winwidth = window.innerWidth;
		   	if(winwidth >=0 && winwidth <= 500){
		   		this.setState({chartWidth:300});
	    	}else if(winwidth >=501 && winwidth <= 600) {
			   	
			   		this.setState({chartWidth:500});
		    	
	    	}else if(winwidth >=601 && winwidth <= 700){

	    			this.setState({chartWidth:580})

    		}else if(winwidth >=701 && winwidth <= 800){

	    			this.setState({chartWidth:680})

    		}else if(winwidth >=801 && winwidth <= 900){

	    			this.setState({chartWidth:780})

    		}else if(winwidth >=901 && winwidth <= 1020){

	    			this.setState({chartWidth:780})
    		}else{

    				this.setState({chartWidth:780})
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
				for(let i=0;i<books.length;i++){
					
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
			return (

				<div>

						<div className="chartTitle">Preference for length of book</div>
						
							<BarChart
								data={data}
								width={width || 620}
								height={400}
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
					if(bkcount == 0){
						continue;
					}
					data[0].values.push({x:shelfname, y:parseInt(bkcount)});

				}

			






			var width = this.state.chartWidth;
			return (

				<div>

						<div className="chartTitle">Your Hottest Shelves/Genres</div>
						<BarChart
							data={data}
							width={width || 620}
							height={400}
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
		let startOfWeek = dateFns.startOfWeek(currDate);
		let endOfWeek = dateFns.endOfWeek(currDate);	
		let daysArr = dateFns.eachDay(startOfWeek, endOfWeek);

		let books = this.state.books;


		//only get books on the 'read' shelf.
		let booksread = books.filter((book) => {

			for(let i=0;i<book.shelves.length;i++){
				if(book.shelves[i].shelf[0].$.name == "read"){
					return true;
				}
			}

			return false;

		})

		

		console.log(booksread)


		//populate values array full of objects, x stands for date to be represented, y for #of books
		for(let i=0;i<daysArr.length;i++){
			let tempday = dateFns.format(daysArr[i], 'MMM D');
			data[0].values.push({x:tempday, y:0})

		}

		


		//loop through each book & compare its date with each date in data.values array. if equals, then increment y by 1.
		for(let i=0;i<booksread.length;i++){
			let tempbook = dateFns.format(booksread[i].date_updated[0], 'MMM D');
			
			for(let j=0;j<data[0].values.length;j++){

				let tempday = data[0].values[j].x;
				if(dateFns.isEqual(tempday,tempbook)){
					data[0].values[j].y += 1;
				}
			}

		}


		
		var width = this.state.chartWidth;
		return(
                <LineChart
                   data={data}
                   width={width || 620}
                   height={400}
                   margin={{top: 10, bottom: 50, left: 50, right: 20}}
    
                />

		)










	}









	render(){

		var drawcharts = this.state ?  this.state.drawcharts ? this.state.drawcharts : false : false;


		return(
			<div>

			{ drawcharts ?
				<div  className="chartLayout">
					<div className="pagesChart">
						
						{this.drawChart()}

					</div>

					<div className="shelvesChart">
						{this.drawChart2()}
					</div>

					<div className="totalreadChart">
						{this.drawChart3()}
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