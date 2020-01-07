import request from 'utils/request';

class GameService {
  getGames = (pageNum: number, pageSize: number) => {
    return request.get('/api/game-service/v1/game', {
      pageNum,
      pageSize,
    });
  };

  getGameDetail = (id: string) => {
    return request.get(`/api/game-service/v1/game/${id}`);
  };
}

export default GameService;
