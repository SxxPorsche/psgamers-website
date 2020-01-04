import React from 'react';
import {
  List,
  Input,
  Divider,
  Button,
  Pagination,
} from 'antd';
import GameCard, { Game } from 'components/GameCard/GameCard';
import GameService from 'services/GameService';
import { AxiosResponse } from 'axios';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

const { Search } = Input;

interface GameListState {
  games: Game[];
  loading: boolean;
  total: number;
  page: number;
}

const emptyGame: Game = {
  id: '',
  nameCn: '',
  platform: '',
  platinum: 0,
  gold: 0,
  silver: 0,
  bronze: 0,
  iconUrl: '',
  smallIconUrl: ''
};

const service: GameService = new GameService();

class GameView extends React.Component<RouteComponentProps, GameListState> {
  state = {
    games: new Array(24).fill(emptyGame),
    loading: true,
    total: 0,
    page:
      new URLSearchParams(this.props.location.search.substring(1)).get('page') === null ?
        1 : Number(new URLSearchParams(this.props.location.search.substring(1)).get('page'))
  };

  getGameList = (pageNum: number) => {
    this.setState({
      games: new Array(24).fill(emptyGame),
      loading: true,
      total: 0,
      page: this.state.page
    });
    service
      .getGames(pageNum, 24)
      .then((response: AxiosResponse) => {
        if (response.data.status === 200) {
          this.setState({
            games: response.data.data.list,
            loading: false,
            total: response.data.data.total
          });
        } else {
          this.handleGetGameListError();
        }
      })
      .catch(error => {
        this.handleGetGameListError();
      });
  };

  handleGetGameListError = () => {
    this.setState({ games: [], loading: false, total: 0 });
  };

  componentWillMount = () => {
    this.getGameList(this.state.page);
  };

  pageChanged = (pageNum: number) => {
    this.props.history.push(`?page=${pageNum}`);
    this.scrollToTop();
    this.getGameList(pageNum);
  };

  scrollToTop = () => {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth'
    });
  };

  render() {
    return (
      <div>
        <div
          className="ant-row-flex ant-row-flex-space-between"
          style={{ width: '100%' }}
        >
          <Search
            enterButton
            placeholder="搜索游戏..."
            style={{ width: '40%' }}
            onSearch={value => console.log(value)}
          />
          <Button icon="filter" type="primary">
            筛选
          </Button>
        </div>
        <Divider />
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 6 }}
          dataSource={this.state == null ? [] : this.state.games}
          renderItem={game => (
            <List.Item>
              <Link to={`/games/${game.id}`}>
                <GameCard data={game} loading={this.state.loading} />
              </Link>
            </List.Item>
          )}
        />
        <div className="ant-row-flex ant-row-flex-center">
          <Pagination
            hideOnSinglePage
            size="small"
            defaultCurrent={this.state.page}
            total={this.state.total}
            pageSize={24}
            onChange={this.pageChanged}
          />
        </div>
      </div>
    );
  }
}

export default GameView;
