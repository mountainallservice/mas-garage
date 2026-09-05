# ADR-0001 — Czysty HTML/JS, bez frameworka i bez bundlera

Data: 2026-09-05 | Status: przyjęte (widoczne w repo od pierwszego commita)

**Kontekst:** Strona ma jeden cel: gość na lotniskowym wifi albo w garażu z 2 kreskami zasięgu
ma zobaczyć telefon/godziny otwarcia i kliknąć WhatsApp w kilka sekund. Odbiorca to landing +
PWA, nie aplikacja ze stanem — brak formularzy zapisywanych po stronie serwera, brak logowania.

**Decyzja:** Jeden ręcznie pisany `index.html` (~1870 linii, inline CSS + inline vanilla JS),
`sw.js` jako service worker i `manifest.webmanifest` do instalowalności. Zero kroku budowania —
to, co w repo, to dokładnie to, co ląduje na serwerze.

**Rozważone alternatywy:**
- *React/Vite (wzorzec reszty floty MAS)* — odrzucone: bundler + hydratacja to koszt bez zwrotu
  dla jednej statycznej strony; wolniejszy TTFB/TTI na słabym łączu, którego strona ma unikać.
- *Statyczny generator (Astro/11ty)* — odrzucone: dodaje krok budowania i zależności dla treści,
  która i tak zmienia się rzadko i ręcznie (nowy partner, nowa cena).

**Konsekwencje:**
- Zero `npm run build`, zero `node_modules` na produkcji, deploy = skopiowanie plików.
- i18n bez biblioteki (sufiksy `-en`/`-pl`/`-is` na id) — tania przy 3 językach, nie skaluje się
  do więcej niż garści języków ani do treści zarządzanej przez CMS.
- TypeScript i lint (`tsc -b`, `html-validate`) łapią tylko błędy w narzędziach (Playwright,
  markup) — **nie ma typechecku samego `index.html`**; literówka w JS inline wyjdzie dopiero na
  testach e2e albo w konsoli przeglądarki.
- Bez frameworka nie ma reużywalnych komponentów — powtarzalne bloki (np. CTA WhatsApp) są
  kopiowane ręcznie w kilku miejscach `index.html`; zmiana treści CTA wymaga edycji w każdym.

**Pułapki dla przyszłego siebie:**
- Zanim dodasz drugą podstronę albo formularz zapisywany po stronie serwera — to sygnał, że ten
  ADR wygasł i czas na framework/build step (patrz `pg/paradigm.md`, sekcja "sygnały refaktoru").
- `sw.js` cache'uje po nazwie (`CACHE = 'mcg-v1'`) — zmiana zawartości `SHELL` bez podbicia wersji
  zostawia starym użytkownikom nieaktualne assety.
