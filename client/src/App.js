import React, {lazy, Suspense, Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';





import asyncComponent from "./components/AsyncComponent";
//const Header = asyncComponent(() => import("./Header"));
const Header = lazy(()=> import('./components/Header'));//just to try
const Footer = asyncComponent(() => import("./components/Footer"));
const Landing = asyncComponent(() => import("./components/Landing"));
const Profile = asyncComponent(() => import("./components/Profile"));
const BookList = asyncComponent(() => import("./components/books/BookList"));
const BookNote = asyncComponent(() => import("./components/books/BookNote"))





class App extends Component {


  componentDidMount(){

    this.props.fetchUser();
    
  }



  render() {

    return (
    
          

       <BrowserRouter>             
       
          <div className="rootdk">
            <Suspense fallback ={<div>Loading</div>}>
              <Header/>
            </Suspense>
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
                
                       
                       <Footer />

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