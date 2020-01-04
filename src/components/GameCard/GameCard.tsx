import React from 'react';
import { Card, Progress, Skeleton } from 'antd';
import classnames from 'classnames';
import GameTag from 'components/GameTag/GameTag';
import IconFont from 'components/IconFont/IconFont';
import SkeletonImage from 'components/SkeletonImage/SkeletonImage';
import styles from './index.css';

export interface Game {
  id: string;
  nameCn: string;
  platform: string;
  platinum: number;
  gold: number;
  silver: number;
  bronze: number;
  iconUrl: string;
  smallIconUrl: string;
}

interface GameProps {
  data: Game;
  loading?: boolean;
}

class GameCard extends React.Component<GameProps, GameState> {
  render() {
    return (
      <div>
        <Card
          hoverable
          cover={
            <SkeletonImage
              loading={this.props.loading}
              backgroundColor="black"
              src={this.props.data.iconUrl}
            />
          }
        >
          <div className="ant-row-flex ant-row-flex-space-between">
            <div style={{ width: '60%' }}>
              <Skeleton
                loading={this.props.loading}
                active
                title={false}
                paragraph={{ rows: 2 }}
              >
                <h4 className={styles['game-name']}>{this.props.data.nameCn}</h4>
                <div style={{ position: 'absolute', right: '5px', top: '5px' }}>
                  {this.props.data.platform !== undefined &&
                    this.props.data.platform.split(',').map(platform => {
                      return <GameTag platform={platform} key={platform} />;
                    })}
                </div>
                <div className={styles['trophy-group']}>
                  <span className={classnames(styles.trophy, styles.platinum)}>
                    <IconFont unicode="&#xe77f;" />
                    {this.props.data.platinum}
                  </span>
                  <span className={classnames(styles.trophy, styles.gold)}>
                    <IconFont unicode="&#xe77f;" />
                    {this.props.data.gold}
                  </span>
                  <span className={classnames(styles.trophy, styles.silver)}>
                    <IconFont unicode="&#xe77f;" />
                    {this.props.data.silver}
                  </span>
                  <span className={classnames(styles.trophy, styles.bronze)}>
                    <IconFont unicode="&#xe77f;" />
                    {this.props.data.bronze}
                  </span>
                </div>
              </Skeleton>
            </div>
            <div className={styles['progress-container']}>
              <Progress
                type="circle"
                percent={this.props.loading ? 0 : 30}
                width={50}
              />
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default GameCard;
