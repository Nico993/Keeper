import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";

import App from "./components/App";


const store = createStore(reducers, compose(applyMiddleware(thunk)));



const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Router>
        <Provider store = {store}>  
            <App />
        </Provider>
    </Router>
    
)

