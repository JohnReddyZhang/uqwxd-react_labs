import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import myReducers from './reducers'
// import {createStore} from 'redux';
import { legacy_createStore as createStore } from 'redux';

//Create the store
const myStore = createStore(myReducers);

//This will console log the current state everytime the state changes
myStore.subscribe(() => console.log(myStore.getState()));

//Enveloping the App inside the Provider, ensures that the states in the store are available
//throughout the application
const container = document.getElementById('root');
const root = createRoot(container)
root.render(<Provider store={myStore}>
    <App />
</Provider>)

// ReactDOM.render(
//     <Provider store={myStore}>
//         <App />
//     </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
