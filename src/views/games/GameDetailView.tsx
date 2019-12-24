import React from "react";
import {RouteComponentProps} from "react-router";

interface GameDetailState{
    id: string
}

class GameDetailView extends React.Component<RouteComponentProps, GameDetailState> {



    componentDidMount () {
        this.setState({

        })
    }

    render () {
        return (
            <div>12312412341234</div>
        )
    }
}

export default GameDetailView;