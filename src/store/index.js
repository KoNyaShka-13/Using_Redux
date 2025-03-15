import { createStore, combineReducers } from 'redux';
//import reducer from '../reducers';//Он уже не нужен,  так как из него все вынесли
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';

const enhancer = (createStore) => (...args) => {//Преобразуем, чтобы экшены становились объектами
     const store = createStore(...args);

     const oldDispatch = store.dispatch;
     store.dispatch = (action) => {
          if (typeof action === 'string') {//Проверка условия, если экшен является строкой, то мы в ручную изменяем его
               return oldDispatch({//Другими словами, в старый диспэтч, что достали, вставляем данные экшена, который является строкой
                    type: action
               })
          }
          return oldDispatch(action)//Если экшен не является строкой, то кидаем просто экшен в диспэтч
     }

      return store;
}

const store = createStore( combineReducers({heroes, filters}), enhancer);//Объединили 2 редьюсера 
     //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
     

export default store;