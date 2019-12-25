import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import MyRouter from '../router/MyRouter';
import { RouteComponentProps, withRouter } from 'react-router';

const { Content, Sider, Footer, Header } = Layout;

class BaseLayout extends React.Component<RouteComponentProps> {
  state = {
    collapse: true
  };

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapse: collapsed });
  };

  linkTo = (item: { key: string }) => {
    this.props.history.push(`/${item.key}`);
  };

  getCurrentPath(): string {
    return this.props.history.location.pathname === '/'
      ? 'home'
      : this.props.history.location.pathname.split('/')[1];
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header
          style={{
            position: 'fixed',
            zIndex: 1,
            width: '100%',
            background: '#315e8c',
            padding: 0,
            height: 46
          }}
        >
          <Menu
            theme="dark"
            selectedKeys={[this.getCurrentPath()]}
            mode="horizontal"
            onClick={this.linkTo}
          >
            <Menu.Item key="home">
              <Icon type="home" theme="filled" />
              <span>首页</span>
            </Menu.Item>
            <Menu.Item key="games">
              <Icon type="trophy" theme="filled" />
              <span>游戏</span>
            </Menu.Item>
            <Menu.Item key="channel">
              <Icon type="audio" theme="filled" />
              <span>频道</span>
            </Menu.Item>
          </Menu>
        </Header>
        <Layout style={{ marginTop: 46 }}>
          <Layout>
            <Content style={{ padding: '3vh 2vw' }}>
              <MyRouter />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(BaseLayout);
