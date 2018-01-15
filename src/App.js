import React, { Component } from 'react';
import Askify from "./Askify";
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import reducers from './reducers'

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(logger, thunk)
)

class App extends Component {

  render() { 
    return ( 
      <Provider store={store}>
        <Askify />
      </Provider>
     )
  }
}
 
export default App;