## SPUŠTENÍ APLIKACE

* cd banan
* npm run dev

## Technické detaily
ROUTER APLIKACE

- V složce src/app
- Funguje tak, že co složka, to route.

  - /app/page.tsx = http://localhost:3000/
  - /app/auth/login/page.tsx = http://localhost:3000/auth/login
  - /app/app/dashboard/page.tsx = http://localhost:3000/app/dashboard

- Speciální složka [id] umožnuje vložit dynamický parametr id (parametr může mít libovolný název)
  - /app/app/sas/[id]/page.tsx = http://localhost:3000/app/sas/SAS_GIORGIO (kde id = SAS_GIORGIO)

API

- NEXT.js umožnuje vytvářet vlastní API v rámci jedné aplikace
- Api routy jsou ve složce src/pages
- Lze provolávat například v Postmanovi
- Funguje to tak, že co složka to API route
  - /pages/api/auth/login.js = http://localhost:3000/api/auth/login (přijímá HTTP metody (POST, GET, ...))

DATABAZE

- V projektu běží SQLite databáze
- Tvorba databáze a její schéma je v souboru db.json
- data v souboru database.sqlite (nemazat a PŘIDAT DO GITU)
