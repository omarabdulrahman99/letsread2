import React, { Component } from "react";

class Intro extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imgrender: "yes",
			genrediv:"",
			shelfgenreons:[false,false,false,false,false,false,false,false],
			initialtext:"on",
			changeClass:"off"
		};
		this.psych = [
			"https://images.gr-assets.com/books/1391026083l/28815.jpg",
			"https://images.gr-assets.com/books/1347864021l/332792.jpg",
			"https://images.gr-assets.com/books/1436227012l/40745.jpg",
			"https://images.gr-assets.com/books/1432253110l/66354.jpg",
			"https://images.gr-assets.com/books/1322673263l/347852.jpg",
			"https://images.gr-assets.com/books/1533307735l/41035725.jpg",
			"https://images.gr-assets.com/books/1337573169l/13766064.jpg",
			"https://images.gr-assets.com/books/1403535115l/137917.jpg"
		];
		this.romance = [
			"https://images.gr-assets.com/books/1529937095l/35380157.jpg",
			"https://images.gr-assets.com/books/1523288337l/38734256.jpg",
			"https://images.gr-assets.com/books/1548486774l/43601774.jpg",
			"https://images.gr-assets.com/books/1529602560l/38739550.jpg",
			"https://images.gr-assets.com/books/1551206651l/43387878.jpg",
			"https://images.gr-assets.com/books/1545431858l/43307210.jpg",
			"https://images.gr-assets.com/books/1530302967l/38198631.jpg",
			"https://images.gr-assets.com/books/1517514322l/36952571.jpg"
		];
		this.horror = [
			"https://images.gr-assets.com/books/1550237355l/41546163.jpg",
			"https://images.gr-assets.com/books/1547942245l/40680117.jpg",
			"https://images.gr-assets.com/books/1551313693l/43359726.jpg",
			"https://images.gr-assets.com/books/1536816863l/40585222.jpg",
			"https://images.gr-assets.com/books/1547686636l/40629268.jpg",
			"https://images.gr-assets.com/books/1539932181l/40629264.jpg",
			"https://images.gr-assets.com/books/1548641666l/40744547.jpg",
			"https://images.gr-assets.com/books/1546739648l/43475269.jpg"
		];

		this.mystery = [
			"https://images.gr-assets.com/books/1529581837l/40133786.jpg",
			"https://images.gr-assets.com/books/1550180267l/35053980.jpg",
			"https://images.gr-assets.com/books/1538830759l/39091679.jpg",
			"https://images.gr-assets.com/books/1537592164l/39087664.jpg",
			"https://images.gr-assets.com/books/1529947315l/39333677.jpg",
			"https://images.gr-assets.com/books/1529947589l/38251245.jpg",
			"https://images.gr-assets.com/books/1530641205l/30518319.jpg",
			"https://images.gr-assets.com/books/1549840330l/40539137.jpg"
		];

		this.scifi = [
			"https://images.gr-assets.com/books/1531148558l/36233085.jpg",
			"https://images.gr-assets.com/books/1522779721l/28335698.jpg",
			"https://images.gr-assets.com/books/1529962084l/29749094.jpg",
			"https://images.gr-assets.com/books/1549453849l/26159745.jpg",
			"https://images.gr-assets.com/books/1536786369l/39897058.jpg",
			"https://images.gr-assets.com/books/1527757538l/36442895.jpg",
			"https://images.gr-assets.com/books/1548111994l/40944082.jpg",
			"https://images.gr-assets.com/books/1526486698l/37794149.jpg"
		];

		this.history = [
			"https://images.gr-assets.com/books/1550418564l/40538605.jpg",
			"https://images.gr-assets.com/books/1540088794l/34993030.jpg",
			"https://images.gr-assets.com/books/1540316987l/37578115.jpg",
			"https://images.gr-assets.com/books/1542039373l/40536236.jpg",
			"https://images.gr-assets.com/books/1551401404l/39863279.jpg",
			"https://images.gr-assets.com/books/1532449196l/40642337.jpg",
			"https://images.gr-assets.com/books/1544628438l/40594422.jpg",
			"https://images.gr-assets.com/books/1533003408l/40594327.jpg"
		];

		this.business = [
			"https://images.gr-assets.com/books/1550931169l/41104077.jpg",
			"https://images.gr-assets.com/books/1545908174l/40406806.jpg",
			"https://images.gr-assets.com/books/1542003722l/40697606.jpg",
			"https://images.gr-assets.com/books/1532452716l/40364335.jpg",
			"https://images.gr-assets.com/books/1544631809l/40909439.jpg",
			"https://images.gr-assets.com/books/1465761302l/28257707.jpg",
			"https://images.gr-assets.com/books/1544963815l/34890015.jpg",
			"https://images.gr-assets.com/books/1543953780l/32738672.jpg"
		];

		this.thriller = [
			"https://images.gr-assets.com/books/1554354561l/44781614.jpg",
			"https://images.gr-assets.com/books/1530546018l/39796904.jpg",
			"https://images.gr-assets.com/books/1534202983l/41058632.jpg",
			"https://images.gr-assets.com/books/1532556337l/39873226.jpg",
			"https://images.gr-assets.com/books/1535591204l/40642958.jpg",
			"https://images.gr-assets.com/books/1528008787l/39863443.jpg",
			"https://images.gr-assets.com/books/1553473381l/39087704.jpg",
			"https://images.gr-assets.com/books/1538830759l/39091679.jpg"
		];
	}


	componentDidMount = () => {

		let genres = ["psych", "romance", "horror", "mystery", "scifi", "history", "business", "thriller"];
		let counter = 0;
		let shelfgenreons = [...this.state.shelfgenreons];

		
		const shelfinter = setInterval(()=>{
	
			shelfgenreons[counter] = true;
			this.setState({genrediv:genres[counter],shelfgenreons:shelfgenreons})
			counter += 1;
			if(counter >=8){
				clearInterval(shelfinter);
				this.setState({changeClass:"on"},()=>{
					
					setTimeout(()=>{
						this.renderImgs()

					},1500)
					


				} )
		
			}
		},1500) 



		

			



	}






	renderImgs = () => {
		let psychdivs = [];
		let romancedivs = [];
		let horrordivs = [];
		let mysterydivs = [];
		let scifidivs = [];
		let historydivs = [];
		let businessdivs = [];
		let thrillerdivs = [];
		let style = {};
		let adelay = 0;


		//psych
		for (let i = 0; i < this.psych.length; i++) {
			style = {
				gridRow: 1,
				gridColumn: i,
			};

			psychdivs.push(
				<div style={style} key={i}>
					<img className={this.state.changeClass === "on" ? "bookinCont bounce" :"bookinCont bookFadeIn"} src={this.psych[i]} />
				</div>
			);
		}

		//romance
		for (let i = 0; i < this.romance.length; i++) {
			style = {
				gridRow: 5,
				gridColumn: i
			};
			romancedivs.push(
				<div style={style} key={i+10}>
					<img className={this.state.changeClass === "on" ? "bookinCont bounce" :"bookinCont bookFadeIn"} src={this.romance[i]} />
				</div>
			);
		}


		//horror
		for (let i = 0; i < this.horror.length; i++) {
			style = {
				gridRow: 2,
				gridColumn: i
			};
			horrordivs.push(
				<div style={style} key={i+20}>
					<img className={this.state.changeClass === "on" ? "bookinCont bounce" :"bookinCont bookFadeIn"} src={this.horror[i]} />
				</div>
			);
		}

		//mystery
		for (let i = 0; i < this.mystery.length; i++) {
			style = {
				gridRow: 3,
				gridColumn: i
			};
			mysterydivs.push(
				<div style={style} key={i+40}>
					<img className={this.state.changeClass === "on" ? "bookinCont bounce" :"bookinCont bookFadeIn"} src={this.mystery[i]} />
				</div>
			);
		}

		//scifi
		for (let i = 0; i < this.scifi.length; i++) {
			style = {
				gridRow: 6,
				gridColumn: i
			};
			scifidivs.push(
				<div style={style} key={i+80}>
					<img className={this.state.changeClass === "on" ? "bookinCont bounce" :"bookinCont bookFadeIn"} src={this.scifi[i]} />
				</div>
			);
		}

		//history
		for (let i = 0; i < this.history.length; i++) {
			style = {
				gridRow: 4,
				gridColumn: i
			};
			scifidivs.push(
				<div style={style} key={i+140}>
					<img className={this.state.changeClass === "on" ? "bookinCont bounce" :"bookinCont bookFadeIn"} src={this.history[i]} />
				</div>
			);
		}

		//business
		for (let i = 0; i < this.business.length; i++) {
			style = {
				gridRow: 7,
				gridColumn: i
			};
			businessdivs.push(
				<div style={style} key={i+240}>
					<img className={this.state.changeClass === "on" ? "bookinCont bounce" :"bookinCont bookFadeIn"} src={this.business[i]} />
				</div>
			);
		}


		//thriller
		for (let i = 0; i < this.thriller.length; i++) {
			style = {
				gridRow: 8,
				gridColumn: i
			};
			thrillerdivs.push(
				<div style={style} key={i+340}>
					<img className={this.state.changeClass === "on" ? "bookinCont bounce" :"bookinCont bookFadeIn"} src={this.thriller[i]} />
				</div>
			);
		}





		this.setState({
			psychdivs: psychdivs,
			romancedivs: romancedivs,
			horrordivs:horrordivs,
			mysterydivs:mysterydivs,
			scifidivs:scifidivs,
			historydivs:historydivs,
			businessdivs:businessdivs,
			thrillerdivs:thrillerdivs,
			imgrender: "no"
		});
	};




	render() {
		return (
		<div className="introCont">
			<div className=" landtitlep introTextCenter">
				Do you like {this.state.genrediv}
			</div>
			<div className="booksANMCont">
				
				{this.state.imgrender === "yes" ? this.renderImgs() : null}
				{this.state.shelfgenreons[0] ? this.state.psychdivs : null}
				{this.state.shelfgenreons[1] ? this.state.romancedivs : null}
				{this.state.shelfgenreons[2] ? this.state.horrordivs : null}
				{this.state.shelfgenreons[3] ? this.state.mysterydivs : null}
				{this.state.shelfgenreons[4] ? this.state.scifidivs : null}
				{this.state.shelfgenreons[5] ? this.state.historydivs : null}
				{this.state.shelfgenreons[6] ? this.state.businessdivs : null}
				{this.state.shelfgenreons[7] ? this.state.thrillerdivs : null}
			

			</div>
		</div>
		);
	}
}

//export default Intro;

/*.introTextCenter {
  text-align:center;
  position:absolute;
  margin: 0 auto;
  top:20%;
  left:10%;
  z-index:1;



 }

.introCont {
    margin: 1% auto;

}


.booksANMCont {
  display: grid;
  grid-row: 1/2;
  grid-template-columns: repeat(8, 10vw);
  grid-template-rows: repeat(8, 15vh);
  grid-gap: 15px;
  margin:0 auto;

}

.bookinCont {
  width: 100%;
  height: 100%;
  opacity: 0.17;
}

.bookinCont:hover {
  opacity: 1;
}

.bookFadeIn {
  -webkit-animation: bookfadein 1.5s;
}

@-webkit-keyframes bookfadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}*/










	componentDidMount = () => {


		/* ReactDOM.findDOMNode(this.props.cntrf.current).addEventListener("scroll", (e) => {

			const rect = this.props.cntrf.current;
			console.log(rect);
			if (!!rect) {
				this.handleScroll(rect);
			}
		});*/

    
	};

	componentWillUnmount = () => {
		/* ReactDOM.findDOMNode(this.heroRef.current).removeEventListener("scroll", () => this.handleScroll);*/
	};

	handleScroll = elm => {
		/*if (!!elm) {
			const rect = elm.getBoundingClientRect();
			console.log(rect);
		}
		var rect = elm.current.getBoundingClientRect();
		console.log('scrolled')
		let viewHeight = Math.max(
			document.documentElement.clientHeight,
			window.innerHeight
		);

		if(!(rect.bottom < 0 || rect.top - viewHeight >= 0)){
			this.setState({herovisible:"yes"})
		}*/





		                <img
                  className={this.state.showimg === "yes" ? "imgshow" : ""}
                  src="https://timedotcom.files.wordpress.com/2014/07/301386_full1.jpg"
                /> 

                             <img
                  className={this.state.showimg === "yes" ? "imgshow" : ""}
                  src="https://i.imgur.com/jvHfJQL.jpg"
                />

                                <img
                  className={this.state.showimg === "yes" ? "imgshow" : ""}
                  src="https://i.imgur.com/pTsmPKT.jpg"
                />

                                <img
                  className={this.state.showimg === "yes" ? "imgshow" : ""}
                  src="https://i.imgur.com/taOju8c.png"
                />