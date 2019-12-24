import React from 'react';
import './App.css';
import BaseLayout from "./layout/BaseLayout";
import {BrowserRouter, Route, Switch} from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="App">
        <BrowserRouter>
            <Switch>
                <Route path="/*" component={BaseLayout}/>
            </Switch>
        </BrowserRouter>
    </div>
  );
};

export default App;
