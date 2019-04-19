import React, {Component} from 'react';
import * as d3 from "d3";
import {connect} from "react-redux";
import axios from 'axios';
import ReactD3, {BarChart} from 'react-d3-components';





class StatsChart extends Component {


	constuctor(props){
		
		this.state = {
			books:null,
			shelves:null,
			drawcharts:"off"
		}

	}



	async componentDidMount(){

		const booksres = await axios.post('/api/usershelfbooks', {goodreadId:this.props.thisuser.goodreadId});
		const books = booksres.data.usershelfbooks;

		const shelfres = await axios.post('/api/shelflist', {user:this.props.thisuser});
		const shelves = shelfres.data.GoodreadsResponse.shelves[0].user_shelf;


		console.log(shelves);
		this.setState({books:books, shelves:shelves}, () => {this.setState({drawcharts:true});})

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

			return (

				<div>

						<div className="chartTitle">Preference for length of book</div>
						
							<BarChart
								data={data}
								width={650}
								height={400}
								margin={{top:90, bottom:50, left:50, right:10}}
								xAxis={{label: "Book pages"}}
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

				console.log(top6)

				for(let i=0;i<top6.length;i++){

					let shelfname = top6[i].name[0];
					let bkcount = top6[i].book_count[0]._;
					if(bkcount == 0){
						continue;
					}
					data[0].values.push({x:shelfname, y:parseInt(bkcount)});

				}

				console.log(data)







			return (

				<div>

						<div className="chartTitle">Your Hottest Shelves/Genres</div>
						<BarChart
							data={data}
							width={600}
							height={400}
							margin={{top:90, bottom:50, left:50, right:10}}
							xAxis={{label: "Shelf names"}}
                    		yAxis={{label: "No.of books"}}
					


						/>

				</div>


				)



	}




	render(){

		var drawcharts = this.state ?  this.state.drawcharts ? this.state.drawcharts : false : false;


		return(
			<div>

			{ drawcharts ?
				<div className="chartLayout">
					<div className="pagesChart">
						
						{this.drawChart()}

					</div>

					<div className="shelvesChart">
						{this.drawChart2()}
					</div>

					<div className="totalreadChart">
						{this.drawChart2()}
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