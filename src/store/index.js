import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { thunk as ReduxThunk } from 'redux-thunk';
//import reducer from '../reducers';//Он уже не нужен,  так как из него все вынесли
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';

const stingMiddleware = () => (next) => (action) => {//Расширяем функцию диспэтч
     if (typeof action =='string') {
          return next({
               type: action
          }) 
     }
     return next(action)
};

//const enhancer = (createStore) => (...args) => {//Преобразуем, чтобы экшены становились объектами
//     const store = createStore(...args);
//
//     const oldDispatch = store.dispatch;
//     store.dispatch = (action) => {
//          if (typeof action === 'string') {//Проверка условия, если экшен является строкой, то мы в ручную изменяем его
//               return oldDispatch({//Другими словами, в старый диспэтч, что достали, вставляем данные экшена, который является строкой
//                    type: action
//               })
//          }
//          return oldDispatch(action)//Если экшен не является строкой, то кидаем просто экшен в диспэтч
//     }
//
//      return store;
//}

const store = createStore( //Объединили 2 редьюсера 
     combineReducers({heroes, filters}), 
     compose(applyMiddleware(ReduxThunk, stingMiddleware),
     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
     )
          //compose(//compose нужен для того, чтобы можно было добавлять любое количество настроек и энхансеров
          //enhancer,//нужно сохранять порядок в расстановке
          //
     //)
     );
     //
export default store;