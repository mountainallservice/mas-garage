# RUNBOOK — operacje i awarie

## Podstawy
- Produkcja: https://garage.mountaincar.is
- Hosting: **[NIEPEWNE]** — brak `vercel.json`/`netlify.toml`/`CNAME`/workflow deployu w repo;
  zweryfikuj aktywny panel hostingu przed pierwszym incydentem i dopisz tutaj.
- Repo: github.com/kamiljan11/mas-garage
- Sekrety: brak — statyczna strona, zero env, zero backendu.

## Deploy
- Standard: merge do `main` → redeploy przez panel hostingu (mechanizm auto-deploy nie jest
  zakodowany w repo — zweryfikuj w dashboardzie, patrz sekcja "Podstawy").
- Ręczny: skopiuj zawartość repo (bez `node_modules`, `e2e/`, `docs/`) na hosting statyczny.
  Brak kroku `build` — to, co w repo, to dokładnie to, co ląduje na serwerze.

## Rollback (cel: <5 min)
```bash
git revert <sha-zlego-commita> && git push   # -> redeploy automatyczny (jesli hosting go ma)
# albo: przywroc poprzedni deploy w panelu hostingu
```

## Monitoring
- Bledy runtime: brak backendu -> brak Sentry; jedyne bledy to JS w konsoli przegladarki
  (lapane przez `e2e/smoke.spec.ts` w CI, nie w produkcji na zywo).
- Healthcheck: `curl -I https://garage.mountaincar.is` — 200 = strona wstaje.
- CI: zakladka Actions w repo (Quality Gate + E2E smoke musza byc zielone).

## Typowe awarie
| Objaw | Pierwszy krok |
|---|---|
| Strona nie wstaje po deploy | rollback (wyzej), potem debug na branchu; sprawdz panel hostingu |
| Przycisk instalacji PWA nie dziala | sprawdz `beforeinstallprompt` w konsoli — czesc przegladarek (iOS Safari) nigdy go nie emituje, to nie jest bug |
| Stara tresc wraca po zmianie | podbij `CACHE` w `sw.js` (stale-while-revalidate trzyma poprzednia wersje do czasu odswiezenia) |
| Link WhatsApp nie otwiera czatu | sprawdz numer `3548888005` w `index.html` (wa.me) i czy nie zmienil sie format |
| Domena/DNS | panel ISNIC / rejestratora domeny mountaincar.is |

## Kontakty
- Wlasciciel: MAS Group / Kamil Jan, mountainallservice@gmail.com
- Klient: Mountain Car Garage (Gosia), kontakt operacyjny przez WhatsApp +354 888 8005
