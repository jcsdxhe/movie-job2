export const job5Analytics = {
  source: 'job5/data/moviecu.log',
  updatedAt: '2026-07-14 19:35:22',
  range: ['2026-07-10 08:12:05', '2026-07-14 19:35:22'],
  kpis: {
    totalEvents: 81,
    activeUsers: 10,
    involvedMovies: 80,
    scoreEvents: 41,
    clickEvents: 40,
    averageScore: 4.2
  },
  dailyActivity: [
    { name: '07-10', value: 16 },
    { name: '07-11', value: 15 },
    { name: '07-12', value: 15 },
    { name: '07-13', value: 15 },
    { name: '07-14', value: 20 }
  ],
  hourlyActivity: [
    { name: '08时', value: 10 }, { name: '09时', value: 11 },
    { name: '10时', value: 10 }, { name: '11时', value: 10 },
    { name: '14时', value: 10 }, { name: '15时', value: 10 },
    { name: '16时', value: 10 }, { name: '17时', value: 6 },
    { name: '18时', value: 2 }, { name: '19时', value: 2 }
  ],
  actionTypes: [
    { name: '评分', value: 41 },
    { name: '点击', value: 40 }
  ],
  activeUsers: [
    { name: '用户1', value: 10 }, { name: '用户2', value: 9 },
    { name: '用户6', value: 9 }, { name: '用户7', value: 9 },
    { name: '用户3', value: 8 }, { name: '用户8', value: 8 },
    { name: '用户9', value: 8 }, { name: '用户4', value: 7 },
    { name: '用户5', value: 7 }, { name: '用户10', value: 6 }
  ],
  topMovies: [
    { id: 2, value: 2 }, { id: 1, value: 1 }, { id: 10, value: 1 },
    { id: 11, value: 1 }, { id: 12, value: 1 }, { id: 13, value: 1 },
    { id: 14, value: 1 }, { id: 15, value: 1 }, { id: 16, value: 1 },
    { id: 17, value: 1 }
  ],
  topRatedMovies: [
    { id: 1, value: 5 }, { id: 12, value: 5 }, { id: 14, value: 5 },
    { id: 16, value: 5 }, { id: 22, value: 5 }, { id: 24, value: 5 },
    { id: 28, value: 5 }, { id: 33, value: 5 }, { id: 37, value: 5 },
    { id: 4, value: 5 }
  ]
}
