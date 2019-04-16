import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions'
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import Calendar from '../Calendar';
import BookNote from './BookNote';


class BookList extends Component {


    constructor(props) {
        super(props);
        this.state = {

            bookcounter: 1,
            shelf: "All",
            tabledata: '',
            grid2: "grid2",
            booknote:false
           


        }


        this.mybookdata = ''; //initial shelf/ table data!
        this.bookpreviewId = '';
        this.booksched = null;
        this.mybooksload = this.mybooksload.bind(this);
        this.leftnav = this.leftnav.bind(this);
        this.tablerender = this.tablerender.bind(this);
        this.tableload = this.tableload.bind(this);
        this.previewState = this.previewState.bind(this);
        this.previewRender = this.previewRender.bind(this);


    }



    async mybooksload(user) {


        

        if (!user) {


            return (<div>nodata</div>)

        } else {

            const booksres = await axios.post('/api/mybooksload', { goodreadId: user.goodreadId });
            const bookdata = booksres.data;


            if (JSON.stringify(bookdata) != JSON.stringify(this.mybookdata)) {

               

                this.mybookdata = bookdata;

                this.setState(prevState => ({
                    bookcounter: prevState.bookcounter + 1
                }))

            }






        }

    }



    leftnav() {



        var shelflist = this.mybookdata.shelflist[0].user_shelf;
        var exclusive = [];
        var othershelves = [];

        for (var i = 0; i < shelflist.length; i++) {

            if (shelflist[i].exclusive_flag[0]._ == "true") {

                exclusive.push(<li key={i} onClick={this.tableload}>{shelflist[i].name[0]}</li>)
            } else {
                othershelves.push(<li key={i} onClick={this.tableload}>{shelflist[i].name[0]}</li>)
            }
        }


        return (
            <ul>
              <div className="goodReadsLogo"></div>
              <hr className="goodReadsLogoHR"></hr>
              <h1 className="shelvesh1">Shelves</h1>
              <li onClick={this.tableload}>All</li>
              {exclusive}
              {othershelves}
            </ul>


        )



    }


    async tableload(e) {


       
        var shelf;

        if (e.currentTarget.textContent == "All") {
            shelf = "";
        } else {
            shelf = e.currentTarget.textContent;
        }

        this.setState({ shelf: shelf, grid2: "grid2"  }, async () => {

            const booklistres = await axios.post('/api/selectshelf', { shelfname: this.state.shelf, goodreadId: this.props.auth.goodreadId })
            const booklist = booklistres.data;
            this.setState({ tabledata: booklist })

        })




    }



    tablerender() {

        var tabledatachoice;

        if (this.state.tabledata != '') {
           
            tabledatachoice = this.state.tabledata.books;
        } else {
           
            tabledatachoice = this.mybookdata.books;
        }
        


        var rows;

        if (tabledatachoice == null || tabledatachoice == undefined || Object.keys(tabledatachoice).length === 0) {

            rows = [{ cover: "", title: "", author: "", avgrating: "", year: "" }]

        } else {



            rows = tabledatachoice.map(currObj => {


                var title = currObj.book[0].title[0];
                var author = currObj.book[0].authors[0].author[0].name[0];
                var avgrating = currObj.book[0].average_rating[0];
                var year = currObj.book[0].published[0];
                var image = currObj.book[0].image_url[0];
                var numpages = currObj.book[0].num_pages[0];
                var desc = currObj.book[0].description[0];
                var id = currObj.book[0].id[0]._;

                /* var styles = {

                   width:'100%',
                   height:'100%',
                   backgroundRepeat: 'no-repeat',
                   backgroundSize: 'cover',
                   backgroundPosition:'50% 50%',
                   backgroundImage: `url(${image})`
                 

                 } */
                return { cover: <div id={id} className="pointer" onClick={this.previewState}><img src={image}></img></div>, title: title, author: author, avgrating: avgrating, year: year }


            })



        }




        var columns = [

            {
                label: 'cover',
                field: 'cover',
                sort: 'asc'
            },
            {
                label: 'title',
                field: 'title',
                sort: 'asc'
            },
            {
                label: 'author',
                field: 'author',
                sort: 'asc'
            },
            {
                label: 'avg. rating',
                field: 'avg. rating',
                sort: 'asc'
            },
            {
                label: 'year',
                field: 'year',
                sort: 'asc'
            }


        ]



        return (


            <MDBTable btn className="mdbtablemybooks">
            <MDBTableHead columns={columns} />
            <MDBTableBody rows={rows} />
          </MDBTable>


        )

    }


    async previewState(e) {

        e.preventDefault();
        this.bookpreviewId = e.currentTarget.id;
        this.props.calendarbookid(this.bookpreviewId);//for booknotes access
        //axios post req with bookid, find bookdates, return.

        var bookDates = await axios.post('/api/booksched', {action:"get", user:this.props.auth, bookid:this.bookpreviewId})
     

        this.booksched = bookDates.data.dates;
       


        if (this.state.grid2 == "grid2") {
            this.setState({ grid2: "grid3" })
        } else {
            this.setState({ grid2: "grid2" })
        }

    }





    previewRender() {

        var previewId = this.bookpreviewId;
        var tabledatachoice;

        var foundbook;
        var descr;
        var numpages;
        var cover;
        var title;

        if (this.state.tabledata != '') {
            tabledatachoice = this.state.tabledata.books;
        } else {
            tabledatachoice = this.mybookdata.books;
        }

        //use bookid and inside a for loop compare it to each object -> book ->id
        if(!tabledatachoice){
                foundbook = null;
                descr = null;
                numpages = null;
                cover = null;
                title = null;
        }else{


            for (var i = 0; i < tabledatachoice.length; i++) {

                if (tabledatachoice[i].book[0].id[0]._ == previewId) {

                    foundbook = tabledatachoice[i].book[0];
                    descr = tabledatachoice[i].book[0].description[0];
                    numpages = tabledatachoice[i].book[0].num_pages[0];
                    cover = tabledatachoice[i].book[0].image_url[0];
                    title = tabledatachoice[i].book[0].title[0];
                }

        }

        

        }

    


        return (

          <aside className="previewnote style-13">  
            <div className="bookprevinfo">
               <img src={cover}></img>
               <div className="bkprevdet">
               <h1 className="bkprevtitle">{title}</h1>
               <h5>Description:</h5> {descr}
               </div>
            </div>
            <div className="noteprevinfo" >
              <a className="toBkNoteLink" onClick={(e)=> {e.preventDefault(); this.setState({booknote:true })} }>Go to book notes</a>
            </div>
            <div className="calendarprevinfo">
                <Calendar bookid={this.bookpreviewId} booksched={this.booksched} user={this.props.auth}/>
            </div>
          </aside>

        )

    }




    render() {



        this.mybooksload(this.props.auth)




        return (


        
            

                <div className={this.state.booknote != false ? "bknoteparent"  :  this.state.grid2 != "grid2" ? "mybookscontainer style-13" : "mybookscontainer2 style-13" }>
            


                    {this.state.bookcounter != 1 ? null : <div className="loader"></div>}

                    {this.state.booknote != false ? <BookNote/> : null}
                    {this.state.booknote != false ? null :
                        <nav className="booklistsidebar style-13">
                        {this.state.bookcounter != 1 ? this.leftnav() : null}
                        </nav>
                    }


                    {this.state.booknote != false ? null :
                        <main className="mybookstable style-13">
                          {this.state.bookcounter != 1 ? this.tablerender() : null}
                        </main>
                    }


                      
                        {this.state.grid2 != "grid2" && this.state.booknote != true ? this.previewRender() : null}

                </div>


            
      

        )


    }


}







function mapStateToProps({ auth }) {

    return { auth }

}

export default connect(mapStateToProps,actions)(BookList);