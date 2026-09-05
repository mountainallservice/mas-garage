# Changelog

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), wersjonowanie: [SemVer](https://semver.org/).
Kazdy PR dopisuje zmiany do [Unreleased]; przy release przenosimy pod numer wersji z data.

## [Unreleased]
### Added
- Pipeline jakosci: CI (build/lint/typecheck/test/semgrep/audit/licencje), Claude review na PR, szablony dokumentacji
- `docs/ARCHITECTURE.md`, `docs/adr/0001-static-html-no-build-step.md`, `LICENSE`, `docs/GLOSSARY.md`, `.github/pull_request_template.md` — repo czytelne dla obcego bez pytania Kamila

### Changed
- `docs/RUNBOOK.md` wypelniony realnymi danymi (deploy, monitoring, kontakty)
- README: dopisany stack z wersjami, link do ARCHITECTURE.md, badge CI

### Fixed
- `e2e/smoke.spec.ts`: `as any` na `window` zastapione realna deklaracja typu (`declare global`)
- README/package.json/LICENSE/RUNBOOK/ARCHITECTURE/BACKLOG: martwy `garage.masgroup.is` (000, nie odpowiada) zamieniony na zywy `garage.mountaincar.is` (200, zweryfikowane curl + zgodnosc tresci strony)
- `playwright.config.ts`: lokalne (nie-CI) uruchomienie ograniczone do 1 workera — domyslne 6 rownoleglych Chromium na tej maszynie konczylo sie `Test timeout ... while setting up "page"` dla 6/7 testow; przy 1 workerze 7/7 przechodzi w 30.7 s. CI (ubuntu-latest) zostaje bez zmian (pelna rownoleglosc)
