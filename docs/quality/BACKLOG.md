# Quality backlog — mas-garage

Świadomie odłożone przy PG v3 github-ready (2026-09-05). Nie blokuje merge'a tego PR.

| # | Co | Dlaczego odłożone | Ryzyko jak zostanie |
|---|---|---|---|
| 1 | `eslint.config.mjs` (strict baseline) dodany przez bootstrap, ale nie podpięty pod `npm run lint` | Repo lintuje markup przez `html-validate` (właściwe narzędzie dla `index.html`); pełny TS/React eslint strict jest pomyślany pod projekty z `src/`, tutaj jedyny TS to `e2e/` + `playwright.config.ts` — podpinanie osobnego stack'u lintera dla 2 plików to koszt bez proporcjonalnego zwrotu. `tsc -b` i tak sprawdza typy w tych plikach. | Niskie — brak `src/`, nowy kod TS pojawia się rzadko (tylko e2e) |
| 2 | Mechanizm deployu `garage.mountaincar.is` nieudokumentowany w repo (brak `vercel.json`/`CNAME`/workflow deploy) | Nie widoczny z kodu; wymaga zajrzenia do panelu hostingu, do czego ten agent nie ma dostępu | Średnie — `docs/RUNBOOK.md` ma ślepą plamę na "jak wdrożyć ręcznie po awarii CI"; **do uzupełnienia przez Kamila jednym zdaniem** |
| 3 | `docs/adr/0000-template.md` zostaje w repo obok realnego `0001-...` | To sam szablon do kopiowania przy następnym ADR, nie dług | — |

## Co NIE jest długiem (świadomie tak zostaje)
- Brak frameworka/bundlera — to jest decyzja, nie zaległość. Patrz `docs/adr/0001-static-html-no-build-step.md`.
- Brak testów jednostkowych — nie ma logiki domenowej do testowania w izolacji (cała "logika" to DOM + link `wa.me`); e2e Playwright pokrywa to, co faktycznie może się zepsuć.
