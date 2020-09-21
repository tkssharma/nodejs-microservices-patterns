import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

export default initialState => {
  initialState =
    JSON.parse(window.localStorage.getItem('state')) || initialState;

  const store = createStore(
    rootReducer,
    initialState,
    compose( applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f )
  );

  store.subscribe(() => {
    const state = store.getState();
    const persist = {
      cart: state.cart,
      total: state.total
    };

    window.localStorage.setItem('state', JSON.stringify(persist));
  });

  return store;
};
