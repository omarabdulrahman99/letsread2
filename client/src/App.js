import React, { lazy, Suspense, Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./actions";

//import asyncComponent from "./components/AsyncComponent";
//const Header = asyncComponent(() => import("./Header"));
const Intro = lazy(() => import("./components/Intro"));
const Header = lazy(() => import("./components/Header"));
const Footer = lazy(() => import("./components/Footer"));
const Landing = lazy(() => import("./components/Landing"));
const Profile = lazy(() => import("./components/Profile"));
const BookList = lazy(() => import("./components/books/BookList"));
const BookNote = lazy(() => import("./components/books/BookNote"));
const StatsChart = lazy(() => import("./components/StatsChart"));

class App extends Component {

  constructor(props){
    super(props)
    this.containerRef = React.createRef();
  }


  componentDidMount() {
    this.props.fetchUser();

  }

  render() {
    return (
      <BrowserRouter>
        <div className="rootdk">
          <Suspense fallback={<div />}>
            <Header />
          </Suspense>
          <div className="container" ref={this.containerRef}>
            <Suspense fallback={<div className="loader" />}>
              <Switch>
                <Route exact path="/intro" component={Intro}/>

                <Route
                  exact
                  path="/mybooks"
                  component={() =>
                    this.props.thisuser ? <BookList /> : <Landing />
                  }
                />
                <Route
                  exact
                  path="/booknotes"
                  component={() =>
                    this.props.thisuser ? <BookNote /> : <Landing />
                  }
                />
                <Route
                  exact
                  path="/statschart"
                  component={() =>
                    this.props.thisuser ? <StatsChart /> : <Landing />
                  }
                />
                <Route
                  exact
                  path="/profile"
                  component={() =>
                    this.props.thisuser ? <Profile /> : <Landing />
                  }
                />
                <Route exact path="/" component={Landing} />
              </Switch>
            </Suspense>

            <Suspense fallback={<div />}>
              <Footer />
            </Suspense>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(props) {
  return { thisuser: props.auth };
}

export default connect(
  mapStateToProps,
  actions
)(App);
