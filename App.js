
import React, { Component } from 'react';
import { Text, View, StyleSheet , AsyncStorage } from 'react-native';
import Routes from './src/routes';
import { Provider as ReduxProvider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga'
import main from './src/reducers/main';
import SagaMiddlewareProvider from './src/middlewares/SagaMiddlewareProvider';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

export default class App extends Component {
  constructor(props) {
    super(props);
    const sagaMiddleware = createSagaMiddleware();
    const composeEnhancers =
      process.env.NODE_ENV !== 'production' &&
      typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;
      const store = createStore(main, composeEnhancers(applyMiddleware(sagaMiddleware)));
      store.runSaga = sagaMiddleware.run;
      store.asyncReducers = {}; // Async reducer registry
      this.sagaMiddleware = sagaMiddleware;
      this.store = store;
  }
  componentDidMount(){
    changeNavigationBarColor('#03182b', true)
  }
  
  render() {
    return (
      <ReduxProvider store={this.store}>
        <SagaMiddlewareProvider sagaMiddleware={this.sagaMiddleware}>
          <Routes />
        </SagaMiddlewareProvider>
      </ReduxProvider>
    );
  }
}
