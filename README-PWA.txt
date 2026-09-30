Instalacja jako aplikacja (PWA)

1. Wrzuć index.html, manifest.json i sw.js do jednego folderu na hosting HTTPS (np. GitHub Pages, Netlify).
2. Otwórz stronę raz online - Service Worker zapisze pliki w pamięci podręcznej.
3. Od tego momentu aplikacja działa w pełni offline; można ją dodać do ekranu głównego.
4. Po każdej zmianie index.html zmień numer wersji CACHE w sw.js.

Otwarcie index.html bezpośrednio z dysku (file://) też działa offline - bez instalacji PWA.
