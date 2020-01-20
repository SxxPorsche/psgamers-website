import { lazy } from 'react';

const routes: object[] = [
	{
		path: '/upload',
		pageName: 'Upload',
		component: lazy(() => import('views/upload')),
	},
	{
		path: '/games',
		pageName: 'GameView',
		component: lazy(() => import('views/games/GamesView')),
	},
	{
		path: '/games/:id',
		pageName: 'GameDetailView',
		component: lazy(() => import('views/games/GameDetailView')),
	},
	{
		path: '/',
		pageName: 'HomeView',
		component: lazy(() => import('views/home/HomeView')),
	}
];

export {
	routes,
}
