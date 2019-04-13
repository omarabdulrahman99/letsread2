import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { MDBInput } from "mdbreact";
import greencheck from '../../images/greencheck.jpg';
import { Link } from 'react-router-dom';

import Turn from '../../Turn';
import DraftEditor from './DraftEditor';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';













class BookNote extends Component {

    constructor(props) {
        super(props);
        this.state = {

            addchapter: false,
            chapnum: "",
            title: "",
            warning1: false,
            warning2: false,
            firstload: true,
            chapters: null,
            edit: false,
            cardinputs: {},
            cardselects: {},
            savemsg: false,
            deletemsg: false,
            turnjs: false,
            noteid: null,
            notemodal: false,
            predictions: "",
            quotes: "",
            lessons: "",
            general: "",
            editorState: null,
            initialEditor: EditorState.createEmpty(),
            turnjstext: null,
            coverinfo:null,
            profile:null




        }
    }




    saveEditorState = (editorState) => {





        this.setState({ editorState })
    }

    saveEditorToDB = async () => {

        //save to db, also have it return the newest chapters array.
        //then parse the info into page blocks.
        //use those page blocks to create divs with content.
        //that content is then saved to state, so that state will update, and
        //have the Turnjs prop update with those divs.
        let contentState = this.state.editorState.getCurrentContent();
        let rawString = JSON.stringify(convertToRaw(contentState));

        const res = await axios.post('/api/saveChapEditor', { user: this.props.user, bookid: this.props.bookid, chapnum: this.state.chapnum, editor: rawString });

        let newchapters = res.data.book.chapters


        this.setState({ chapters: res.data.book.chapters })

    }


    addChapter = async (e) => {

        //check chapter number input
        e.preventDefault();


        //check if input is positive && between 1-170;
        var title = this.state.title;
        var patt = new RegExp(/^\d*$/); //0-9 & positive.		
        var valid = patt.test(this.state.chapnum) && (parseInt(this.state.chapnum) >= 1 && parseInt(this.state.chapnum) <= 170);
        var valid2 = true;



        if (this.state.chapters) {
            for (var i = 0; i < this.state.chapters.length; i++) {


                if (this.state.chapnum == this.state.chapters[i].chapnum) {


                    valid2 = false;
                }




            }
        }

        if (valid && valid2 != false) {


            this.setState({ warning1: false, warning2: false });
            var datares = await axios.post('/api/postachapter', { user: this.props.user, bookid: this.props.bookid, chapnum: this.state.chapnum, title: title });


            this.setState({ chapters: datares.data.book.chapters })

        }


        if (valid == false) {


            this.setState({ warning1: true })
        }

        if (valid2 == false) {


            this.setState({ warning2: true, warning1: false })
        }

        //do a check to see if a chapter # already exists.



    }




    //calling it 'start' bc this is the first modal to 'start' a new chapter
    mStartOnChange = (e) => {


        if (e.currentTarget.id == "chapnum") {
            this.setState({ chapnum: e.currentTarget.value });
        }

        if (e.currentTarget.id == "title") {

            this.setState({ title: e.currentTarget.value });
        }



    }



    setChapterStart = () => {


        this.setState({ addchapter: !this.state.addchapter, warning1: false, warning2: false })

    }

    addBookNote = (e) => {


        let noteid = e.target.parentNode.id;
        let index = noteid - 1;

        let predictions = this.state.chapters[index].predictions;




        if (predictions) {

            let editorPredictions = EditorState.createWithContent(convertFromRaw(JSON.parse(predictions)));
            this.setState({ initialEditor: editorPredictions })


        } else {

            this.setState({ initialEditor: EditorState.createEmpty() })
        }


        this.setState({ noteid: noteid, notemodal: !this.state.notemodal });

    }

    /* 		//if I decided to use simple inputs later on.
    		noteEdit = (e) => {

    			switch(e.currentTarget.id){

    				case "predictions":
    					this.setState({predictions:e.currentTarget.value})
    					break;
    				case "quotes":
    					this.setState({quotes:e.currentTarget.value})
    					break;
    				case "lessons":			
    					this.setState({lessons:e.currentTarget.value})
    					break;

    				case "general":
    					this.setState({general:e.currentTarget.value})					
    					break;

    			}



    		}
    	*/


    renderEditCards = () => {

        var cardsarr = [];
        var sortedchaps = [];
        var inputstyle = { color: 'black' }

        sortedchaps = this.state.chapters.sort(function(a, b) { return a.chapnum - b.chapnum });

        for (var i = 0; i < sortedchaps.length; i++) {

            var chapnum = this.state.chapters[i].chapnum;


            if (this.state.cardselects[chapnum] == 'selected') {

                cardsarr.push(


                    <div key={this.state.chapters[i].chapnum} id={this.state.chapters[i].chapnum} onClick={this.editCardClick} className="bkcardeditselect">
								<div className="cardTitle">Chapter {this.state.chapters[i].chapnum}</div>
								<hr></hr>
								<input id={this.state.chapters[i].chapnum} type="text" placeholder={this.state.chapters[i].title} style={inputstyle} className="cardTitle2" value={this.state.cardinputs[this.state.chapters[i].chapnum]} onChange={this.cardonChange} />
								<button onClick={(e) => {this.addBookNote(e)}} >Add Book Notes</button>
							</div>


                )

            } else {

                cardsarr.push(

                    <div key={this.state.chapters[i].chapnum} id={this.state.chapters[i].chapnum} onClick={this.editCardClick} className="bkcardedit">
						<div className="cardTitle">Chapter {this.state.chapters[i].chapnum}</div>
						<hr></hr>
						<div className="cardTitle2">{this.state.chapters[i].title}</div>>
					</div>
                )


            }


        }

        return (cardsarr)

    }


    cardonChange = (e) => {

        var cardid = e.target.id;
        var value = e.target.value;



        this.setState(prevState => ({ cardinputs: { ...prevState.cardinputs, [cardid]: value } }));



    }


    editCardClick = (e) => {



        if (e.target.nodeName != "INPUT") {

            var chapid = e.currentTarget.id;


            if (this.state.cardselects[chapid] == 'selected') {
                this.setState(prevState => ({ chapnum: chapid, cardselects: { ...prevState.cardselects, [chapid]: 'notselected' } }))
            } else if (this.state[chapid] == 'notselected') {


                this.setState(prevState => ({ chapnum: chapid, cardselects: { ...prevState.cardselects, [chapid]: 'selected' } }))


            } else {

                this.setState(prevState => ({ chapnum: chapid, cardselects: { ...prevState.cardselects, [chapid]: 'selected' } }))
            }
        }

    }

     turnjsSwitch = async (e) => {


        let chapnum = e.currentTarget.id;
        let index = chapnum - 1;
        let predictions = this.state.chapters[index].predictions;
        let title = this.state.chapters[index].title;


        var profileres = await axios.post('/api/profileonly', {goodreadId:this.props.user.goodreadId});
        var profileuserdata = profileres.data.profileinfo.GoodreadsResponse.user;
        console.log(profileuserdata)



        let turnjsEditor = predictions ? EditorState.createWithContent(convertFromRaw(JSON.parse(predictions))) : EditorState.createEmpty();
        let turnjstext = turnjsEditor.getCurrentContent().getPlainText();


        var predObj = predictions ? JSON.parse(predictions) : "Empty"
        if (predObj != "Empty") {

            var stylechars = [];
            var finaldivsArr = [];

            var stylesDict = {

                "header-one": "h1",
                "unordered-list-item": "ul",
                "ordered-list-item": "ol",
                BOLD: { fontWeight: "bold" },
                UNDERLINE: { textDecoration: "underline" },
                ITALIC: { fontStyle: "italic" }




            };


            var blockcount = 0;
 
            for (var i = 0; i < turnjstext.length; i++) {

                var tempstyles = { display: "inline" };
                blockcount = 0;
                if (turnjstext[i].match(/\r\n|\r|\n/g)) {
                    tempstyles = {};
                }

                for (var j = 0; j < predObj.blocks.length; j++) {



                    for (var k = 0; k < predObj.blocks[j].inlineStyleRanges.length; k++) {



                        var start = predObj.blocks[j].inlineStyleRanges[k].offset + blockcount ;
                        var end = predObj.blocks[j].inlineStyleRanges[k].length + start;
                        var style = predObj.blocks[j].inlineStyleRanges[k].style;



                        if (i >= start && i <= end) {


                            Object.assign(tempstyles, stylesDict[style])

                        } //endif




                    } //endfor3



                    blockcount += predObj.blocks[j].text.length + 1;
                    


                } //endfor2


                stylechars.push([turnjstext[i], tempstyles])

            } //endfor1






            let divarr = [];
            let pages = [];
            let blocknum = 0;
            let charcount = 0;
            let linecount = 0;
            let pagenum = 0;
            var divarr2 = [];


        	
            for (var m = 0; m < stylechars.length; m++) {

            
                if ((stylechars[m][0].match(/\r\n|\r|\n/g) ) || (!stylechars[m + 1]) || (divarr2.length >0)) {

                  
                    if(divarr2.length >0){

                    	if(divarr2[1]){

                    		divarr2.pop();
                    	}
                    	divarr = divarr2;
    
                    	m = m -1;
                    
                    	divarr2 = [];

                    }


                    if (!pages[pagenum]) {
                        pages[pagenum] = [];
                    }

                    let type = predObj.blocks[blocknum] ? predObj.blocks[blocknum].type : null;
             	//17 is the safety buffer. can still add last block.
                    switch (type) {                  	
                        case "header-one":
                         	{if(linecount + 3 >= 17){
                      		    divarr.push(<div key={m} style={stylechars[m][1]}>{stylechars[m][0]}</div>)
                         		pages[pagenum].push(<div key={m}><h1>{divarr}</h1></div>);
                         		pagenum++;
                         		blocknum++;
                         		linecount = 0;
                         	}else{
                         		divarr.push(<div key={m} style={stylechars[m][1]}>{stylechars[m][0]}</div>)
                         		pages[pagenum].push(<div key={m}><h1>{divarr}</h1></div>);                    
                         		blocknum++;
                         		linecount += 3;
                         	}

                            break;}
                        case "header-two":
                       		if(linecount + 2.5 >= 17){                         		
                         		divarr.push(<div key={m} style={stylechars[m][1]}>{stylechars[m][0]}</div>)
                         		pages[pagenum].push(<div key={m}><h2>{divarr}</h2></div>);
                         		pagenum++;
                         		blocknum++;
                         		linecount = 0;
                         	}else{
                         		divarr.push(<div key={m} style={stylechars[m][1]}>{stylechars[m][0]}</div>)
                         		pages[pagenum].push(<div key={m}><h2>{divarr}</h2></div>);                    
                         		blocknum++;
                         		linecount += 2.5;
                         	}

                            break;
                        case "header-three":
                       	if(linecount + 2 >= 17){                        		
                         		divarr.push(<div key={m} style={stylechars[m][1]}>{stylechars[m][0]}</div>)
                         		pages[pagenum].push(<div key={m}><h3>{divarr}</h3></div>);
                         		pagenum++;
                         		blocknum++;
                         		linecount = 0;
                         	}else{
                         		divarr.push(<div key={m} style={stylechars[m][1]}>{stylechars[m][0]}</div>)
                         		pages[pagenum].push(<div key={m}><h3>{divarr}</h3></div>);                    
                         		blocknum++;
                         		linecount += 2;
                         	}
                            break;
                        case "header-four":
                       	if(linecount + 1.5 >= 17){                       		
                         		divarr.push(<div key={m} style={stylechars[m][1]}>{stylechars[m][0]}</div>)
                         		pages[pagenum].push(<div key={m}><h4>{divarr}</h4></div>);
                         		pagenum++;
                         		blocknum++;
                         		linecount = 0;
                         	}else{
                         		divarr.push(<div key={m} style={stylechars[m][1]}>{stylechars[m][0]}</div>)
                         		pages[pagenum].push(<div key={m}><h4>{divarr}</h4></div>);                    
                         		blocknum++;
                         		linecount += 1.5;
                         	}

                            break;
                        case "header-five":
                        	if(linecount + 1.25 >= 17){                        		
                         		divarr.push(<div key={m} style={stylechars[m][1]}>{stylechars[m][0]}</div>)
                         		pages[pagenum].push(<div key={m}><h5>{divarr}</h5></div>);
                         		pagenum++;
                         		blocknum++;
                         		linecount = 0;
                         	}else{
                         		divarr.push(<div key={m} style={stylechars[m][1]}>{stylechars[m][0]}</div>)
                         		pages[pagenum].push(<div key={m}><h5>{divarr}</h5></div>);                    
                         		blocknum++;
                         		linecount += 1.25;
                         	}

                            break;
                        case "header-six":
                       		if(linecount + 1 >= 17){                       		
                         		divarr.push(<div key={m} style={stylechars[m][1]}>{stylechars[m][0]}</div>)
                         		pages[pagenum].push(<div key={m}><h6>{divarr}</h6></div>);
                         		pagenum++;
                         		blocknum++;
                         		linecount = 0;
                         	}else{
                         		divarr.push(<div key={m} style={stylechars[m][1]}>{stylechars[m][0]}</div>)
                         		pages[pagenum].push(<div key={m}><h6>{divarr}</h6></div>);                    
                         		blocknum++;
                         		linecount += 1;
                         	}

                            break;
                        case "unordered-list-item":
                            {let olchars = divarr.length;
                        	let widthchars = 36; //in OL, each line is 36 chars max, accounting for capitalized text, gives us an extra line or two safety.
                        	let lines = olchars/widthchars;
                        	let totallines = linecount + lines;

                                              	
 							if(totallines >= 17){	
                         		
                         		let nextpglines = totallines - 17;
                         		let nextindex = widthchars * nextpglines;
                      		

                         		if(olchars <= nextindex){
                         	
                         			divarr2 = divarr2.concat(divarr);

                         		}else{
                         			
                         		
                         			let divarrcut = divarr.splice(divarr.length - nextindex, nextindex)                       
                         			divarr2.length = 0;
                         			divarr2 = divarr2.concat(divarrcut);
                       
                         	
                         			pages[pagenum].push(<div key={m}><ul className="pageUL"><li>{divarr}</li></ul></div>);
                         		
                         		}                    		
                         		
                         		pagenum++;
                         		//blocknum++;
                         		linecount = 0;
                         	}else{
                         
                         		divarr.push(<div key={m} style={stylechars[m][1]}>{stylechars[m][0]}</div>)
                         		pages[pagenum].push(<div key={m}><ul className="pageUL"><li>{divarr}</li></ul></div>);                   
                         		blocknum++;
                         		linecount += Math.ceil(lines);
                         	}

                         	                         	
                         	break;}
                        case "ordered-list-item":

                        	{let olchars = divarr.length;
                        	let widthchars = 36; //in OL, each line is 36 chars max, accounting for capitalized text, gives us an extra line or two safety.
                        	let lines = olchars/widthchars;
                        	let totallines = linecount + lines;

                        
                        	
 							if(totallines >= 17){	
                         		
                         		let nextpglines = totallines - 17;
                         		let nextindex = widthchars * nextpglines;
                      		

                         		if(olchars <= nextindex){
                         	
                         			divarr2 = divarr2.concat(divarr);

                         		}else{
                         			
                         		
                         			let divarrcut = divarr.splice(divarr.length - nextindex, nextindex)                       
                         			divarr2.length = 0;
                         			divarr2 = divarr2.concat(divarrcut);
                       
                         	
                         			pages[pagenum].push(<div key={m}><ol className="pageOL"><li>{divarr}</li></ol></div>);
                         		
                         		}                    		
                         		
                         		pagenum++;
                         		//blocknum++;
                         		linecount = 0;
                         	}else{
                         
                         		divarr.push(<div key={m} style={stylechars[m][1]}>{stylechars[m][0]}</div>)
                         		pages[pagenum].push(<div key={m}><ol className="pageOL"><li>{divarr}</li></ol></div>);                   
                         		blocknum++;
                         		linecount += Math.ceil(lines);
                         	}

                         	                         	
                         	break;}
                        case "blockquote":
                        	{let olchars = divarr.length;
                        	let widthchars = 36;
                        	let lines = olchars/widthchars;
                        	let totallines = linecount + lines;
       
 							if(totallines >= 17){	
                         		
                         		let nextpglines = totallines - 17;
                         		let nextindex = widthchars * nextpglines;
                        
                         		if(olchars <= nextindex){
                         			
                         			divarr2 = divarr2.concat(divarr);
                         		
                         		}else{
                         			let divarrcut = divarr.splice(divarr.length - nextindex, nextindex)                       
                         			divarr2.length = 0;
                         			divarr2 = divarr2.concat(divarrcut);
                         			pages[pagenum].push(<div key={m}><blockquote className="grapefruit">{divarr}</blockquote></div>);
                         	
                         		}                    		
                         		
                         		pagenum++;
                         		//blocknum++;
                         		linecount = 0;
                         	}else{
                         
                         		divarr.push(<div key={m} style={stylechars[m][1]}>{stylechars[m][0]}</div>)
                         		pages[pagenum].push(<div key={m}><blockquote className="grapefruit">{divarr}</blockquote></div>);                  
                         		blocknum++;
                         		linecount += Math.ceil(lines);
                         	}
                         	break;}
                        case "unstyled":   
                   
                           {let olchars = divarr.length;
                        	let widthchars = 36;
                        	let lines = olchars/widthchars;
                        	let totallines = linecount + lines;

                       
 							if(totallines >= 17){	
                         		
                         		let nextpglines = totallines - 17;
                         		let nextindex = widthchars * nextpglines;
                        
                         		if(olchars <= nextindex){
                         			
                         			divarr2 = divarr2.concat(divarr);
                         		
                         		}else{
                         			let divarrcut = divarr.splice(divarr.length - nextindex, nextindex)                       
                         			divarr2.length = 0;
                         			divarr2 = divarr2.concat(divarrcut);
                         			pages[pagenum].push(<div key={m}>{divarr}</div>);
                         		
                         		}                    		
                         		
                         		pagenum++;
                         		//blocknum++;
                         		linecount = 0;
                         	}else{
                         
                         		divarr.push(<div key={m} style={stylechars[m][1]}>{stylechars[m][0]}</div>)
                         		pages[pagenum].push(<div key={m}>{divarr}</div>);                  
                         		blocknum++;
                         		linecount += Math.ceil(lines);
                         	}
                         	break;}

                        default:
                           {let olchars = divarr.length;
                        	let widthchars = 36;
                        	let lines = olchars/widthchars;
                        	let totallines = linecount + lines;

                       
 							if(totallines >= 17){	
                         		
                         		let nextpglines = totallines - 17;
                         		let nextindex = widthchars * nextpglines;
                        
                         		if(olchars <= nextindex){
                         			
                         			divarr2 = divarr2.concat(divarr);
                         		
                         		}else{
                         			let divarrcut = divarr.splice(divarr.length - nextindex, nextindex)                       
                         			divarr2.length = 0;
                         			divarr2 = divarr2.concat(divarrcut);
                         			pages[pagenum].push(<div key={m}>{divarr}</div>);
                         		
                         		}                    		
                         		
                         		pagenum++;
                         		//blocknum++;
                         		linecount = 0;
                         	}else{
                         
                         		divarr.push(<div key={m} style={stylechars[m][1]}>{stylechars[m][0]}</div>)
                         		pages[pagenum].push(<div key={m}>{divarr}</div>);                  
                         		blocknum++;
                         		linecount += Math.ceil(lines);
                         	}
                         	break;}
                    }



                 
                    divarr = [];



                } else {
               
                    divarr.push(<div key={m} style={stylechars[m][1]}>{stylechars[m][0]}</div>);
                    
                }

            }


            


       
           console.log(profileuserdata)

            this.setState({ turnjstext: pages, coverinfo:{chapnum:chapnum,title:title}, profile:profileuserdata}, () => {

                this.setState({ turnjs: 'on' })
            })

        } else {

            let turnjstext = ["No notes =("];
            this.setState({ turnjstext: turnjstext, coverinfo:{chapnum:index, title:title}, profile:profileuserdata }, () => {

            	this.setState({turnjs:'on'})
            })



      }

    }



    renderCards = () => {
        var cardsarr = [];
        var sortedchaps = [];
        //go through each chapter in chapterarray and return a card in a div with chapter num & title in it. 
        //each card has an onclick which will open up a bigger modal with all the text info in sections.


        sortedchaps = this.state.chapters.sort(function(a, b) { return a.chapnum - b.chapnum });


        for (var i = 0; i < sortedchaps.length; i++) {

            cardsarr.push(
                <div key={this.state.chapters[i].chapnum} id={this.state.chapters[i].chapnum} onClick={this.turnjsSwitch} className="bkcard">
						<div className="cardTitle">Chapter   {this.state.chapters[i].chapnum}</div>
						<hr></hr>
						<div className="cardTitle2">{this.state.chapters[i].title}</div>
					</div>);

        }


        return (cardsarr)


    }

    seteditRender = () => {

        this.setState({ edit: !this.state.edit, cardinputs: {}, cardselects: {} })


    }

    trashButton = () => {

        return (
            <div className="icon-trash" onClick={this.delChapters}>
				    <div className="trash-lid"></div>
				    <div className="trash-container"></div>
				    <div className="trash-line-1"></div>
				    <div className="trash-line-2"></div>
				    <div className="trash-line-3"></div>
				  </div>

        )
    }


    saveedits = async () => {

        var saveinputs = [];
        var chapters = this.state.chapters.slice();
        var cardinputs = Object.assign({}, this.state.cardinputs);
        var cardselects = Object.assign({}, this.state.cardselects);

        for (var key in cardinputs) {

            for (var key2 in cardselects) {


                if (cardselects[key2] == 'selected' && key == key2) {


                    var obj = { chapnum: key, title: cardinputs[key] };
                    saveinputs.push(obj);

                }

            }

        }



        for (var i = 0; i < chapters.length; i++) {


            for (var j = 0; j < saveinputs.length; j++) {


                if (chapters[i].chapnum == saveinputs[j].chapnum) {

                    chapters[i].title = saveinputs[j].title;

                }

            }
        }

        var user = this.props.user;
        var bookid = this.props.bookid;

        var newchapters = await axios.post('/api/updatechapters', { user: user, bookid: bookid, chapters: chapters });

        this.setState({ chapters: newchapters.data.chapters, savemsg: true }, () => {

            setTimeout(() => { this.setState({ savemsg: false }) }, 2300)
        })


    }



    delChapters = async () => {


        //all chapters in selected array are deleted.
        var cardselects = Object.assign({}, this.state.cardselects);
        var cardinputs = Object.assign({}, this.state.cardinputs);


        var newchapters = await axios.post('/api/deletechapters', { user: this.props.user, bookid: this.props.bookid, cardselects: cardselects })
        var chapters = newchapters.data.book.chapters;


        //empty the inputs obj that match the cardselects obj. 
        for (let key in cardselects) {

            if (cardselects[key] == 'selected') {
                delete cardinputs[key]
            }

        }

        //empty the cardselects obj
        cardselects = {};
        this.setState({ chapters: chapters, cardselects: cardselects, cardinputs: cardinputs, deletemsg: true }, () => {

            setTimeout(() => { this.setState({ deletemsg: false }) }, 2300)

        })


    }




    firstLoad = async () => {


        const datares = await axios.post('/api/booksched', { user: this.props.user, bookid: this.props.bookid, action: "get" })

        if (datares.data.dates) {
            var chapters = datares.data.dates.chapters;

            this.setState({ firstload: false, chapters: chapters });
        }


    }


 


    render() {




        var warning1 = <div className="bknotewarningred">Number must be between 1 and 170</div>;
        var warning2 = <div className="bknotewarningred">Chapter number already exists</div>;
        var savemsgStyle = {

            textAlign: 'center',
            fontSize: '25px'

        }


        if (this.props.user && this.state.firstload) {

            this.firstLoad();
        }






        return (



        <div className="cero">

            {this.state.turnjs == 'on' ? <Link to="/booknotes" className="editFlexBack">Go Back</Link> : null}
			{this.state.turnjs == 'on' ?  <Turn turnjstext={this.state.turnjstext} profile={this.state.profile} coverinfo={this.state.coverinfo} /> : 
			<div className="cardscontainer">
				<div className="editcontainer">
                    <a href="/mybooks" className="editFlexBack">Go Back</a>
					<div className="editflex">
						<div className="editFlexBack" onClick={this.seteditRender} >Edit</div>
						{this.state.edit != false ? <div onClick={this.saveedits} className="editFlexBack">Save</div> : null}
						{this.state.edit != false ? this.trashButton() : null}
					</div>
				</div>
				<div className="bkcards">

					<Modal isOpen={this.state.savemsg} size="sm">				         
				          <ModalBody style={savemsgStyle}>
				          	<img height="50" src={greencheck}></img>Save Success!			          	     
				          </ModalBody>
			        </Modal>

			        <Modal isOpen={this.state.deletemsg} size="sm">				         
				          <ModalBody style={savemsgStyle}>
				          	<img height="50" src={greencheck}></img>Delete Success!			          	     
				          </ModalBody>
			        </Modal>

			        <Modal isOpen={this.state.notemodal} className="editNoteModal" >
			        	<ModalHeader toggle={() => this.setState({notemodal:!this.state.notemodal}) }>
			        		Edit Book Notes
			        	</ModalHeader>
			        	<ModalBody>
			        		<div>Predictions:</div>
			        		<DraftEditor initialEditor={this.state.initialEditor} saveEditorState={this.saveEditorState} />
			        		<button onClick={this.saveEditorToDB}>SAVE</button>
			        		
			        	</ModalBody>
			        	<ModalFooter>
			        	</ModalFooter>
			        </Modal>

					<Modal isOpen={this.state.addchapter} size="sm">
				         <ModalHeader toggle={() => this.setChapterStart()}>Add a new chapter</ModalHeader>
				         <form>
				          <ModalBody>
				          	<MDBInput id="chapnum" value={this.state.chapnum} onChange={(e) => {this.mStartOnChange(e)}} className="modalstartinput" label="Chapter Number" type="number" required min="1" max="170"/>
				          	{this.state.warning1 ? warning1 : null}
				          	{this.state.warning2 ? warning2 : null}
				          	<MDBInput id="title" value={this.state.title} onChange={(e) => {this.mStartOnChange(e)}} label="Chapter Title"  maxLength="50"/>				     
				          </ModalBody>
			         	<ModalFooter>
			         		<Button size="sm" type="submit" color="primary" onClick={(e) => {this.addChapter(e)}} required>Save changes</Button>
				            <Button size="sm" color="secondary" onClick={() => this.setChapterStart()} required>Close</Button>{' '}
			         	</ModalFooter>
			         </form>
			        </Modal>
			        {this.state.edit != false && this.state.chapters ? this.renderEditCards() : null}
			        {this.state.chapters && this.state.edit == false  ? this.renderCards() : null}
					{this.state.edit ? null : <div className="addCenter">
						<div className="addCenter" onClick={this.setChapterStart}>
						  <div className="addChapter"></div>
						</div>
					</div>}
				</div>
			</div>

			}


			</div>






        )


    }







}


function mapStateToProps(props) {


    return { user: props.auth, bookid: props.bknid }


}


export default connect(mapStateToProps)(BookNote);