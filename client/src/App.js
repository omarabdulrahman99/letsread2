import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';



import FooterSec from './components/Footer';
import Landing from './components/Landing';
import SearchResults from './components/SearchResults';
import Profile from './components/Profile';
import BookList from './components/books/BookList';
import BookNote from './components/books/BookNote';
import Calendar from './components/Calendar';

import Turn from './Turn';
import Header2 from './Header2';

class App extends Component {


  componentDidMount(){

    this.props.fetchUser();
    
  }



  render() {

    return (
    
          

       <BrowserRouter>             
       
          <div className="rootdk">
            <Header2/>
              <div className="container">
                      
                        <Switch>
                          <Route exact path="/" component={Landing}/>
                          <Route exact path="/mybooks" component={() => (
                                    this.props.thisuser ? (
                                      <BookList/>
                                    ) : (
                                      <Landing/>
                                    )
                                  )} />
                          <Route exact path="/booknotes" component={() => (
                                    this.props.thisuser ? (
                                      <BookNote/>
                                    ) : (
                                      <Landing/>
                                    )
                                  )} />} />
                          <Route exact path="/profile" render={() => (
                                    this.props.thisuser ? (
                                      <Profile/>
                                    ) : (
                                      <Landing/>
                                    )
                                  )}/>

                        </Switch>
                       
                       <FooterSec />

                 </div>
              </div>
              

        </BrowserRouter>   
          
   

      )

   }

}

function mapStateToProps(props){

  return {thisuser:props.auth}
}

export default connect(mapStateToProps, actions)(App);