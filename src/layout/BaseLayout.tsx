import React from "react";
import { Layout, Menu, Icon } from "antd";
import MyRouter from "../router/MyRouter";
import {RouteComponentProps, withRouter} from "react-router";

const { Content, Sider, Footer, Header } = Layout;

class BaseLayout extends React.Component<RouteComponentProps> {

    state = {
        collapse: true
    };

    onCollapse = (collapsed: boolean) => {
        console.log(collapsed);
        this.setState({ collapse:collapsed })
    };

    linkTo = (item: { key: string; }) => {
        this.props.history.push(item.key)
    };

    getCurrentPath() : string {
        return this.props.history.location.pathname === "/" ? "/home" : this.props.history.location.pathname
    }

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapse} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <Menu style={{position:"fixed", width: this.state.collapse ? 80 : 200}}
                          theme="dark" selectedKeys={[this.getCurrentPath()]} mode="inline" onClick={this.linkTo}>
                        <Menu.Item key="/home">
                            <Icon type="home" theme="filled"/>
                            <span>首页</span>
                        </Menu.Item>
                        <Menu.Item key="/games">
                            <Icon type="trophy" theme="filled"/>
                            <span>游戏</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Content style={{padding: "3vh"}}>
                        <MyRouter/>
                    </Content>
                    <Footer/>
                </Layout>
            </Layout>
        )
    }
}

export default withRouter(BaseLayout);