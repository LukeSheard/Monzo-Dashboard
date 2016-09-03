import DevTools from 'components/dev-tools';
import createSagaMiddleware, {
  END,
} from 'redux-saga';
import {
  createMemoryHistory,
} from 'react-router';
import {
  routerMiddleware,
} from 'react-router-redux';
import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';

import rootReducer from './reducer';

const NODE_ENV = process.env.NODE_ENV || 'development';
const _DEV_ = NODE_ENV !== 'production';

export default function (history = createMemoryHistory(), initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();

  let plugins;
  if (_DEV_) {
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
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer').default; // eslint-disable-line import/newline-after-import
      store.replaceReducer(nextRootReducer);
    });
  }

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store;
}
