import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';

import {
  routerMiddleware,
} from 'react-router-redux';

import createSagaMiddleware, {
  END,
} from 'redux-saga';

import rootReducer from 'ducks';
import DevTools from 'components/DevTools';

const NODE_ENV = process.env.NODE_ENV || 'development';

export default function (history, initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();

  let plugins;
  if (NODE_ENV === 'development') {
    plugins = compose(
      applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history)
      ),
      DevTools.instrument()
    );
  } else {
    plugins = applyMiddleware(
      sagaMiddleware,
      routerMiddleware(history)
    );
  }

  const store = createStore(rootReducer, initialState, plugins);

  if (module.hot) {
    module.hot.accept('common/ducks', () => {
      const nextRootReducer = require('common/ducks').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store;
}
