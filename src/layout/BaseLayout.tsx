import React from 'react';
import { HomeOutlined, TrophyOutlined, AudioOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router';
import MyRouter from 'router/MyRouter';

const { Content, Header } = Layout;

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
              <HomeOutlined />
              <span>首页</span>
            </Menu.Item>
            <Menu.Item key="games">
              <TrophyOutlined />
              <span>游戏</span>
            </Menu.Item>
            <Menu.Item key="channel">
              <AudioOutlined />
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
