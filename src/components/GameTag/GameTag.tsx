import React from 'react';
import { Tag } from 'antd';

interface GameTagProps {
  platform: string;
}

class GameTag extends React.Component<GameTagProps> {
  private getTagColorByPlatform = () => {
    switch (this.props.platform) {
      case 'PS4':
        return '#2f54eb';
      case 'PS3':
        return 'blue';
      case 'PSVITA':
        return '#13c2c2';
    }
    return 'undefined';
  };

  render() {
    return (
      <Tag color={this.getTagColorByPlatform()}>{this.props.platform}</Tag>
    );
  }
}

export default GameTag;
