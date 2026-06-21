# GitHub Pages beállítás ingyenes fiókkal

A legegyszerűbb ingyenes megoldás: **publikus GitHub repo + noindex meta tag**.

Ez azt jelenti, hogy az oldal technikailag bárki számára elérhető, aki tudja a linket, de a rendszer kéri a keresőket, hogy ne indexeljék. Ez nem titkosítás, de családi, nem érzékeny tartalomhoz általában elég.

## Lépések

1. Hozz létre egy új GitHub repót, például: `flora-fejlodesi-tudastar`.
2. Töltsd fel a ZIP teljes tartalmát a repo gyökerébe.
3. A repo legyen **public**, ha ingyenes GitHub Pages oldalt szeretnél.
4. Menj ide: `Settings → Actions → General`, és engedélyezd a workflow-k futását, ha kell.
5. Push után lefut a `Deploy MkDocs site` workflow.
6. Utána: `Settings → Pages` → source legyen a `gh-pages` branch.
7. A kész oldal a GitHub által adott linken fog megjelenni.

!!! warning "Nem valódi titkosítás"
    A `noindex` nem jelszóvédelem. Csak azt jelzi a keresőknek, hogy ne indexeljék az oldalt. Ha a linket elküldöd valakinek, ő látni fogja.
