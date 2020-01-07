import React, { Suspense, lazy } from 'react';
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter
} from 'react-router-dom';
import { routes } from './routes';

interface MyRoute {
  path: string;
  pageName: string;
  component: any;
}

class MyRouter extends React.Component<RouteComponentProps> {
  render() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {routes.map((route: object) => (
            <Route
              exact
              key={(route as MyRoute).path}
              path={(route as MyRoute).path}
              component={(route as MyRoute).component}
            />
          ))}
        </Switch>
      </Suspense>
    );
  }
}

export default withRouter(MyRouter);
