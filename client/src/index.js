import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom";


import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";


import App from "./App";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const rootElement = document.getElementById("root");
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	rootElement
);
