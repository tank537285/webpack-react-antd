import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore,applyMiddleware } from 'redux'
import todoApp from './reducer/reducers'
let store = createStore(todoApp,{
    visibilityFilter: "SHOW_ALL",
    todos: [{
        id:0,
        text:"123",
        completed:false
    }]
},applyMiddleware(thunkMiddleware))
/*store.subscribe(()=>{
    console.log(store.getState())
})*/
ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));
registerServiceWorker();
