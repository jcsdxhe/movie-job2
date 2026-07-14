---
name: build-vue-movie-frontend
description: Build, repair, and validate a Vue 3 movie recommendation frontend that connects to an existing backend. Use for student or prototype systems requiring login, movie list/search/filter, details, favorites, ratings, recommendations, API normalization, responsive cinema-style UI, motion, image fallbacks, Vite proxy configuration, and an answer-ready delivery package.
---

# Build a Vue Movie Frontend

## Establish scope

Inspect the existing repository before editing. Preserve unrelated files and changes. Identify:

- required pages and navigation;
- backend endpoints, request methods, field names, response wrappers, and port;
- whether favorites belong in the database or browser storage;
- required screenshots, build artifacts, or presentation material.

Treat the backend as the business-data source. Do not hide a broken integration with fabricated production data. Add a clearly labeled demo mode only when the user needs an offline presentation.

Read [references/api-integration.md](references/api-integration.md) before implementing or repairing API calls. Read [references/qa-and-delivery.md](references/qa-and-delivery.md) before final validation and handoff.

## Design the application boundary

Use Vue 3, Vite, Vue Router, Pinia, and Axios unless the repository already establishes another stack.

Keep responsibilities separate:

1. Put HTTP configuration, response unwrapping, field normalization, and human-readable errors in one API module.
2. Put current user, movie cache, loading/error state, and local favorites in Pinia.
3. Put login protection and post-login redirects in router guards.
4. Keep views focused on rendering and interaction; do not make each component guess backend response shapes.
5. Read the API base URL and backend proxy target from environment variables.

Normalize every movie to one stable UI model. Convert numeric identifiers and ratings to numbers immediately so comparisons, sorting, and formatting remain reliable.

## Build the user journey

Implement the smallest complete journey first:

1. Log in and persist only the minimum user identity needed by the frontend.
2. Load movies and render loading, error, empty, and success states.
3. Search and filter client-side when the backend exposes only a list endpoint.
4. Open a detail route, report the click without blocking page rendering, and show metadata.
5. Submit a 1–5 rating with duplicate-submit protection and visible feedback.
6. Toggle favorites in `localStorage` when no favorites API exists.
7. Load recommendations and sort by predicted score. If the API returns no results, show an honest empty state; use a labeled local fallback only for an explicitly supported demo mode.
8. Add a user settings route for common local preferences and logout when requested.

## Build resilient presentation UI

Use a coherent cinema visual system rather than styling pages independently. Define shared colors, spacing, radius, typography, buttons, cards, and status panels.

Add motion with purpose:

- fade and translate page sections over roughly 150–500 ms;
- stagger movie-card entry with a capped delay;
- lift cards and scale posters slightly on hover;
- animate button and favorite/rating feedback;
- provide skeletons while data loads;
- disable or reduce animation under `prefers-reduced-motion`.

For every remote image, provide a bundled placeholder and replace failed sources in a one-shot error handler. Use lazy loading for card posters. Verify the hero background separately because CSS background-image failures do not trigger an `<img>` error event.

Make layouts usable at desktop presentation width and narrow mobile width. Avoid fixed content widths, clipped navigation, and horizontal category overflow without a usable scroll affordance.

## Integrate safely

Confirm actual requests against the running backend before declaring integration complete. Check browser network records or issue direct requests for:

- login parameter names and success/failure wrappers;
- list response nesting;
- rating content type and timestamp units;
- recommendation score field;
- CORS behavior and the backend port.

Use a Vite `/api` proxy during development when CORS is unavailable. Keep `.env.example` with non-secret placeholders and exclude real secrets. Restart Vite after environment changes.

When the backend is unavailable, distinguish these cases in the UI: connection refused, timeout, authentication failure, empty result, and malformed response.

## Validate and deliver

Run the checks in [references/qa-and-delivery.md](references/qa-and-delivery.md). Fix failures before handoff. Report what was tested and what still depends on another team member.

Commit only intended source and skill files. Exclude `node_modules`, generated builds unless explicitly required, local database runtimes, archives, credentials, screenshots containing private information, and unrelated initial materials.
