import React from 'react';
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter
} from 'react-router-dom';
import HomeView from 'views/home/HomeView';
import GameView from 'views/games/GamesView';
import GameDetailView from 'views/games/GameDetailView';

class MyRouter extends React.Component<RouteComponentProps> {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomeView} />
        <Route exact path="/home" component={HomeView} />
        <Route exact path="/games" component={GameView} />
        <Route path="/games/:id" component={GameDetailView} />
      </Switch>
    );
  }
}

export default withRouter(MyRouter);
