import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from 'react-router-dom'

import "bootstrap/dist/css/bootstrap.css"
import "font-awesome/css/font-awesome.min.css"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './index.css';

/* import { createStore } from "redux"
 */import { Provider } from "react-redux"
/* import rootReducer from "./reducers/rootReducer"
import { composeWithDevTools } from "redux-devtools-extension" */
import store from "./store"

/* const store = createStore(rootReducer, composeWithDevTools())
 */
const routing = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
)

ReactDOM.render(<Provider store={store}>{routing}</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

