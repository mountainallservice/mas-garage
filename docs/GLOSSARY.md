# GLOSSARY — mas-garage

Repo bez domeny biznesowej złożonej (brak bazy/klientów/zleceń) — słowniczek ogranicza się do
konwencji nazewniczych faktycznie użytych w kodzie.

| Termin w kodzie | Znaczenie / reguła |
|---|---|
| id z sufiksem `-en` / `-pl` / `-is` | wariant językowy tego samego węzła treści (np. `f1a-en`, `f1a-pl`, `f1a-is`); dokładnie jeden wariant widoczny naraz |
| `installApp()` | funkcja inline w `index.html` obsługująca prompt instalacji PWA (`beforeinstallprompt`) |
| `#installBtn` | przycisk instalacji; `hidden` dopóki przeglądarka nie zaoferuje promptu |
| `CACHE` (`sw.js`) | nazwa bieżącej wersji cache offline shellu; podbij przy zmianie listy `SHELL` |
| `wa.me/3548888005` | numer WhatsApp warsztatu — jedyny kanał konwersji, zaszyty per sekcja/język |
| partner club / perks | sekcja z listą firm partnerskich oferujących wzajemne zniżki klientom Mountain Car |
| Meta Pixel `Lead` | zdarzenie konwersji wysyłane przy kliknięciu linku WhatsApp/telefon |
