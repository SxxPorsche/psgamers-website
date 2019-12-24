import React, {ReactPropTypes} from "react";
import {List, Input, Divider, Breadcrumb, Dropdown, Button, Pagination} from "antd";
import GameCard, {Game} from "../../components/GameCard/GameCard";
import GameService from "../../service/GameService";
import {AxiosResponse} from "axios";

const { Search } = Input;

interface GameListState {
    games: Game[],
    loading: boolean,
    total: number
}

const emptyGame: Game = {
    nameCn: "",
    platform: "",
    platinum: 0,
    gold: 0,
    silver: 0,
    bronze: 0,
    iconUrl: "",
    smallIconUrl: ""
};

const service: GameService = new GameService();
const loadingState = {
    games: new Array(24).fill(emptyGame),
    loading: true,
    total: 0
};

class GameView extends React.Component<ReactPropTypes, GameListState>{

    state = loadingState;

    constructor(props: ReactPropTypes, state: GameListState){
        super(props, state);
    }

    getGameList = (pageNum: number) => {
        this.setState(loadingState);
        service.getGames(pageNum, 24).then((response: AxiosResponse) => {
            if(response.data.status === 200) {
                this.setState({games:response.data.data.list, loading: false, total:response.data.data.total});
            } else {
                this.handleGetGameListError()
            }
        }).catch(error => {
            this.handleGetGameListError()
        })
    };

    handleGetGameListError = () =>  {
        this.setState({games: [], loading: false, total: 0})
    }

    componentDidMount = () => {
        this.getGameList(1);
    };

    pageChanged = (pageNum : number) => {
        this.scrollToTop();
        this.getGameList(pageNum);
    };

    scrollToTop = () =>{
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth',
        });
    };

    render() {
        return (
            <div>
                <div className="ant-row-flex ant-row-flex-space-between" style={{width:"100%"}}>
                    <Search
                        enterButton
                        placeholder="搜索游戏..."
                        style={{width: "30%"}}
                        onSearch={value => console.log(value)}
                    />
                    <Button icon="filter" type="primary">
                        筛选
                    </Button>
                </div>
                <Divider />
                <List
                    grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl:6}}
                    dataSource={this.state == null ? [] : this.state.games}
                    renderItem={game => (
                        <List.Item>
                            <GameCard data={game} loading={this.state.loading}/>
                        </List.Item>
                    )}/>
                <div className="ant-row-flex ant-row-flex-center">
                    <Pagination hideOnSinglePage size="small" defaultCurrent={1} total={this.state.total} pageSize={24} onChange={this.pageChanged} />
                </div>
            </div>
        )
    }
}

export default GameView;