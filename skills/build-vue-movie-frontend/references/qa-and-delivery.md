# QA and delivery checklist

## Functional checks

- Test login success, invalid credentials, refresh persistence, protected-route redirect, and logout.
- Test movie loading, retry, empty state, search, type filter, rating sort, and popularity sort.
- Test detail navigation, unknown IDs, click reporting, poster failure, favorite toggle, and rating submission.
- Test duplicate-submit prevention and visible success/failure feedback.
- Test favorites persistence, removal, clear-all, and empty state.
- Test recommendation ordering, incomplete recommendation rows, no results, and service failure.
- Test settings changes and ensure purely local settings are labeled accurately.

## Presentation checks

- Inspect at a typical projector/laptop width and at a narrow phone width.
- Verify navigation, category tabs, cards, dialogs, long names, and long descriptions do not clip.
- Confirm every poster and hero has a fallback or acceptable background.
- Confirm skeletons do not cause severe layout shifts.
- Enable reduced-motion at least once and verify the site remains usable.

## Technical checks

- Run the production build.
- Check the browser console for uncaught errors and Vue warnings.
- Inspect network requests for paths, methods, payload encoding, status, and response shape.
- Reload a nested route when using history mode; configure server fallback or use hash history for static hosting.
- Verify `.env.example`, `.gitignore`, and the documented startup commands.

## Handoff

Provide:

- source files and lockfile;
- environment configuration instructions;
- the backend endpoint contract and assumed port;
- test account only when it is a non-sensitive demonstration account;
- a short list of completed pages and interactions;
- known dependencies on backend/database/recommendation services;
- screenshots or a demo URL only when requested.

Never include `node_modules`, local database binaries, credentials, unrelated starter archives, or private browser data.
