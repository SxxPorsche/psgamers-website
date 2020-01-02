import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import BaseLayout from 'layout/BaseLayout';
import './App.css';

const App: React.FC = () => (
  <div className="App">
    <BrowserRouter>
      <Switch>
        <Route path="/*" component={BaseLayout} />
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
