import React, {Component} from 'react';




class IntroFirst extends Component{


constructor(props){
	super(props);
	this.state = {
		clicked:false,
		clicked2:false,
		clicked3:false
	}

}
	
componentDidMount = () => {

	setInterval(()=>{
			this.setclockStyle();
	},950)

	
}


onClick1 = (e) => {
	
	let classN = e.currentTarget.className;
	
	

	if(classN === "lefthalf1" || classN === "righthalf1" || classN === "righthalf1anim" || classN === "lefthalf1anim"){
		this.setState({clicked:!this.state.clicked})
	}

	if(classN === "lefthalf2" || classN === "righthalf2"  || classN === "righthalf2anim" || classN === "lefthalf2anim"){
		this.setState({clicked2:!this.state.clicked2})
	}

	if(classN === "lefthalf3" || classN === "righthalf3"  || classN === "righthalf3anim" || classN === "lefthalf3anim"){
		this.setState({clicked3:!this.state.clicked3})
	}

	
}


setclockStyle = ()=> {

	        let angle = 360/60,
            date = new Date(),
            hour = date.getHours() % 12,
            minute = date.getMinutes(),
            second = date.getSeconds(),
            hourAngle = (360/12) * hour + (360/(12*60)) * minute;


            let minstyletxt = 'rotate('+angle*minute+'deg)';
            let minstyle = {transform:minstyletxt};
            let secstyletxt = 'rotate('+angle*second+'deg)';
            let secstyle = {transform:secstyletxt};
            let hourstyletxt = 'rotate('+hourAngle+'deg)';
            let hourstyle = {transform:hourstyletxt};

            let secelem = document.querySelector('#second');
            secelem.style.transform = secstyletxt;

            let minelem = document.querySelector('#minute');
            minelem.style.transform = minstyletxt;

            let hourelem = document.querySelector('#hour');
            hourelem.style.transform = hourstyletxt;

            
}



render(){
	

	return(

		<div className="parentIntroFirst">
			<div className={this.state.clicked ? "lefthalf1anim" : "lefthalf1"} onClick={this.onClick1}>
				<img className="lefthalfimg" src="https://i.imgur.com/Jajhk5m.png"></img>
				<blockquote className="lefthalf1text">“A reader lives a thousand lives before he dies.. The man who never reads lives only one" – George R.R. Martin</blockquote>
				<div className="lefthalf1text2">Get S</div>
			</div>
			<div className={this.state.clicked ? "righthalf1anim" : "righthalf1"}  onClick={this.onClick1} >
				<img className="righthalfimg" src="https://i.imgur.com/PLFfO4r.png"></img>
				<blockquote className="righthalf1text">"Whenever you read a good book, somewhere in the world a door opens to allow in more light." –Vera Nazarian 
				</blockquote>
				<div className="righthalf1text2">tarted</div>
			</div>
			<div className={this.state.clicked2 ? "lefthalf2anim" : "lefthalf2"}  onClick={this.onClick1}>
				<div id="clock">
			        <div id="hour" ><img src="https://i.imgur.com/wVDnBuM.png" /></div>
			        <div id="minute" ><img src="https://i.imgur.com/6OtSyqk.png" /></div>
			        <div id="second" ><img src="https://i.imgur.com/xnEnEv3.png" /></div>
			    </div>
			    <div className="lefthalf2text">
			    	<p>Do you find too many other activities distracting?</p>
			    	<p>Do you simply like organizing your time?</p>
			    </div>
			</div>
			<div className={this.state.clicked2 ? "righthalf2anim" : "righthalf2"}  onClick={this.onClick1}>
					<div className="righthalf2text">
						Use our built in calendar to easily schedule reading dates while checking out more books! 
						You can also track your reading statistics to see how well you're doing!
					</div>
				<div style={{width:"80%",height:"60%",position:"relative",margin:"30% auto auto 0%"}}>
					<iframe src="https://streamable.com/s/bw1sv/zpzdga" frameBorder="0" width="100%" height="100%" allowFullScreen 
							style={{width:"100%", height:"100%", position:"absolute",left:"0px",top:"0px",overflow:"hidden"}}>
					</iframe>
				</div>
			</div>
			<div className={this.state.clicked3 ? "lefthalf3anim" : "lefthalf3"} onClick={this.onClick1}>
				<div style={{width:"70%",height:"60%",position:"absolute", margin:"20% auto", right:0}}>
					<iframe src="https://streamable.com/s/4kygo/uiacdm" frameBorder="0" width="100%" height="100%" allowFullScreen 
							style={{width:"100%", height:"100%", position:"absolute",left:"0px",top:"0px",overflow:"hidden"}}>
					</iframe>
				</div>
			</div>
			<div className={this.state.clicked3 ? "righthalf3anim" : "righthalf3"}  onClick={this.onClick1} >
					<div className="righthalf3text">
						Here you can search for more books, add them to your favorite goodreads shelves, and save your thoughts
						in a rich text editor that is later transformed into a 3-d personal notebook!
					</div>

			</div>


			<div className="confetti">
				  <div className="confetti-piece"></div>
				  <div className="confetti-piece"></div>
				  <div className="confetti-piece"></div>
				  <div className="confetti-piece"></div>
				  <div className="confetti-piece"></div>
				  <div className="confetti-piece"></div>
				  <div className="confetti-piece"></div>
				  <div className="confetti-piece"></div>
				  <div className="confetti-piece"></div>
				  <div className="confetti-piece"></div>
				  <div className="confetti-piece"></div>
				  <div className="confetti-piece"></div>
				  <div className="confetti-piece"></div>
				  <div className="iconConf">You are all set! Enjoy!</div>
			</div>

	
		</div>


		)

}






}



export default IntroFirst;