import React from 'react';
import './App.css';
import storeFactory from './store';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import { Auth } from './pages/auth';

import { SystemContainer, HeaderContainer } from './containers/containers';

const store = storeFactory()

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <HeaderContainer />
          <Switch>
            <Route exact path='/' component={SystemContainer} />
            <Route path='/system' component={SystemContainer} />
            <Route path='/auth' component={Auth} />
          </Switch>

        </Provider>
      </BrowserRouter>
    </div>
  )
}

export default App;
