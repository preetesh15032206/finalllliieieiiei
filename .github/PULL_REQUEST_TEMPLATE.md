## Summary

This PR adds:
- Vitest config and an integration test exercising registration, admin approval, violation logging, and CSV export.
- A GitHub Actions workflow that runs the test suite on push/PR and uploads logs/artifacts.
- Admin UI export controls and server CSV export endpoint.

## How to test locally
- npm install
- npm test

## Notes
- The CI uploads `vitest.log`, `coverage` (if generated), and `junit.xml` (if generated) for easier debugging.
- If tests fail in CI, check the uploaded `vitest.log` artifact for details.

/cc @repo-owner