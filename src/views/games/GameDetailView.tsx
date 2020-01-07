import React from 'react';
import { RouteComponentProps } from 'react-router';
import GameService from 'services/GameService';
import { Game } from 'components/GameCard/GameCard';
import SkeletonImage from 'components/SkeletonImage/SkeletonImage';
import styles from './index.css';

interface GameDetailState {
  loading: boolean;
  game?: Game;
}

const gameService = new GameService();

class GameDetailView extends React.Component<RouteComponentProps, GameDetailState> {
  state = {
    loading: true,
    game: {
      id: '',
      nameCn: '',
      platform: '',
      platinum: 0,
      gold: 0,
      silver: 0,
      bronze: 0,
      iconUrl: '',
      smallIconUrl: ''
    }
  };

  componentDidMount() {
    console.log(this.props)
    const { id } = this.props.match.params;
    gameService.getGameDetail(id).then(response => {
      if (response.data.status === 200) {
        this.setState({
          loading: false,
          game: response.data.data
        });
      }
    });
  }

  render() {
    return (
      <div>
        <div className={styles['detail-header']}>
          <SkeletonImage
            loading={this.state.loading}
            src={this.state.game.iconUrl}
          />
        </div>
      </div>
    );
  }
}

export default GameDetailView;
