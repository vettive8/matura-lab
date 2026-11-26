# Atlas Matura

[Atlas po polsku i angielsku / Live bilingual atlas](https://mervive.com/learn/matura/mapa/)

## Wersja odniesienia

[Wydanie v0.1.0 z nagraniem](https://github.com/vettive8/matura-lab/releases/tag/v0.1.0) pokazuje publiczną stronę przed kolejną rundą zmian. Tag wskazuje kod działający w chwili nagrania. Przy zgłoszeniu problemu podaj adres strony, język, rozmiar ekranu oraz czas w nagraniu, jeśli problem jest tam widoczny.

## Review baseline

Use the [v0.1.0 release and walkthrough](https://github.com/vettive8/matura-lab/releases/tag/v0.1.0) to compare later changes in readability, navigation and learning flow. The recording follows the layers, chapter and exam panels, an albumin experiment, the studio, library, topic and concept directories, the medical curriculum, and the language and theme controls.

To inspect what changed since the recording, run `git diff v0.1.0..HEAD -- dist cloudflare.mjs`. The browser app lives in `dist/`, and `cloudflare.mjs` maps its public URLs. Individual image credits and licences are in `dist/media.js` and displayed with the images.
