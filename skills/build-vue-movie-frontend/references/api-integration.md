# API integration patterns

## Stable UI model

Normalize common backend aliases into:

```js
{
  movieid: Number(raw.movieid ?? raw.movieId ?? raw.id),
  moviename: raw.moviename ?? raw.movieName ?? raw.name ?? raw.title,
  picture: raw.picture ?? raw.poster ?? raw.image ?? '',
  averating: Number(raw.averating ?? raw.avgRating ?? raw.rating ?? 0),
  numrating: Number(raw.numrating ?? raw.numRating ?? raw.hot ?? 0),
  description: raw.description ?? raw.introduction ?? '暂无剧情简介',
  typelist: raw.typelist ?? raw.typeList ?? raw.genres ?? '',
  director: raw.director ?? '暂无信息',
  leadactors: raw.leadactors ?? raw.leadActors ?? '暂无信息',
  releasetime: raw.releasetime ?? raw.releaseTime ?? ''
}
```

Keep aliases in this adapter, not in components.

## Response wrappers

Backends commonly return the payload directly or under `data`, `result`, `rows`, `list`, or `records`. Unwrap deliberately and reject malformed values instead of silently converting every failure to an empty list.

## Typical contract

| Purpose | Request | Important checks |
|---|---|---|
| Login | `GET /api/login` | Query parameter names, false/null responses, user ID field |
| Movie list | `GET /api/movie/list` | List wrapper and numeric conversion |
| Click report | `GET /api/movie/click` | User ID and movie ID; do not block detail rendering |
| Add rating | `POST /api/rating/add` | JSON vs form encoding, rating range, timestamp seconds vs milliseconds |
| Recommendations | `GET /api/rec/list` | User ID, prediction field, descending sort, joining incomplete movie rows |

The exact running backend overrides this table.

## Error strategy

Configure one Axios instance with a finite timeout. Convert technical failures into short actionable messages while retaining the original error for debugging. Do not treat HTTP 200 as business success without checking the backend's `success`, `code`, or equivalent field.

## Development proxy

Use a relative browser URL and proxy it during development:

```env
VITE_API_BASE_URL=/api
VITE_BACKEND_TARGET=http://localhost:8080
```

Configure Vite to forward `/api` to `VITE_BACKEND_TARGET`. If the backend already includes an `/api` context path, confirm whether the proxy must preserve or rewrite that prefix.
