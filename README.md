# 光影推荐前端

## 启动

1. 安装 Node.js 18 或更高版本。
2. 在 `movie-frontend` 目录执行 `npm install`。
3. 启动 3 号后端，再执行 `npm run dev`。
4. 浏览器访问 `http://localhost:5173`，演示账号为 `test / 123456`。

## 后端端口

开发环境通过 Vite 代理访问后端。若 `job3/application.yml` 中 `server.port` 不是 `8080`，修改 `.env`：

```env
VITE_API_BASE_URL=/api
VITE_BACKEND_TARGET=http://localhost:你的端口
```

修改后需重新启动前端。生产部署时可将 `VITE_API_BASE_URL` 设置为完整后端地址，或由 Web 服务器转发 `/api`。

## 功能

登录、电影搜索与分类、详情、点击上报、1–5 星评分、个性推荐和本地收藏。收藏保存在浏览器 `localStorage`，清理浏览器数据后会消失。
