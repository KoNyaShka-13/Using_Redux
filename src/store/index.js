import { createStore, combineReducers } from 'redux';
//import reducer from '../reducers';//Он уже не нужен,  так как из него все вынесли
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';

const store = createStore( combineReducers({heroes, filters}),//Объединили 2 редьюсера 
     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;