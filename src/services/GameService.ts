import BaseService from './BaseService';

class GameService extends BaseService {
  constructor() {
    super({ host: 'http://129.204.168.25/api/game-service' });
  }

  getGames = (pageNum: number, pageSize: number) => {
    return this.get(`/v1/game?pageNum=${pageNum}&pageSize=${pageSize}`);
  };

  getGameDetail = (id: string) => {
    return this.get(`/v1/game/${id}`);
  };
}

export default GameService;
