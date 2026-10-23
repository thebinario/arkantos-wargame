# Challenge Authoring

Each challenge should live under `challenges/owasp-2025/<challenge-id>/` and define:

- Scenario objective
- Vulnerability setup and exploit path
- Checkpoint events emitted to `packages/challenge-sdk`
- Validation rules consumed by `packages/challenge-engine`
