# 光影推荐前端

## 启动

1. 安装 Node.js 18 或更高版本。
2. 在 `movie-frontend` 目录执行 `npm install`。
3. 启动 3 号后端或本项目根目录的本地后端，再执行 `npm run dev`。
4. 浏览器访问 `http://localhost:5173`，演示账号为 `test / 123456`。

本地后端启动命令（在 `job2` 根目录执行）：

```powershell
node scripts/local-backend.mjs
```

## 后端端口

开发环境通过 Vite 代理访问后端。若 `job3/application.yml` 中 `server.port` 不是 `8080`，修改 `.env`：

```env
VITE_API_BASE_URL=/api
VITE_BACKEND_TARGET=http://localhost:你的端口
```

修改后需重新启动前端。生产部署时可将 `VITE_API_BASE_URL` 设置为完整后端地址，或由 Web 服务器转发 `/api`。

## 功能

登录、电影搜索与分类、详情、点击上报、1–5 星评分、个性推荐、本地收藏、用户设置、job5 电影行为可视化大屏和 AI 问答。收藏保存在浏览器 `localStorage`，清理浏览器数据后会消失。

## 千问 AI 配置

AI 问答使用通义千问 `qwen-turbo`，请求由本地后端转发，API Key 不会出现在 Vue 前端代码中。

1. 在千问控制台创建 API Key。
2. 打开 `job2/runtime/qwen-api-key.txt`，删除原有提示文字，只粘贴以 `sk-` 开头的 Key 并保存。
3. 启动本地后端和前端，登录后进入“AI 问答”。

也可以在启动本地后端前设置环境变量 `DASHSCOPE_API_KEY`。本地 Key 文件位于前端 Git 仓库之外，不会被上传到 GitHub。

> GitHub Pages 是纯静态站点，无法安全保存 API Key；公开演示版可以展示 AI 页面，但真实问答应在本地版或配置了服务端环境变量的后端部署中使用。

## job5 数据大屏

“数据大屏”页面使用 `job5/data/moviecu.log` 的统计快照，展示总互动量、活跃用户、涉及电影、平均评分，以及每日活跃、行为类型、小时活跃、用户排行、热门电影和高评分电影六个维度。
