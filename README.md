# Examensprojekt – Freaky Fashion - E-handel

Detta projekt är baserat på en examinerande slutuppgift från min frontendutvecklarutbildning.
Projektet består av en Angular-baserad frontend och en Node.js/Express-baserad backend med databas genom Supabase.

## 📂 Projektstruktur

- **client/** – Angular-applikationen (frontend)
- **server/** – Express-servern och databasen (backend)

## 🚀 Installation

1. Klona projektet
   ```bash
   git clone https://github.com/Chippogriph/e-commerce-portfolio.git
   cd e-commerce-portfolio
   ```

### Frontend

2. Installera beroenden för frontend

   ```bash
   cd client
   npm install

   ```

### Backend

3. Installera beroenden för backend

   ```bash
   cd ../server
   npm install

   ```

### Miljövariabler
Skapa en `.env`-fil i server-mappen med de variabler som projektet förväntar sig.

Exempel på innehåll (byt ut värdena mot dina egna):
```
SUPABASE_URL=your-supabase-project-url
SUPABASE_SECRET_KEY=your-supabase-service-role-key
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-admin-password
```

- `SUPABASE_URL` och `SUPABASE_SECRET_KEY` används av backend för att ansluta till Supabase (service role-nyckeln, inte den publika anon-nyckeln).
- `ADMIN_USERNAME` och `ADMIN_PASSWORD` används av `seedAdmin.js` för att lägga till ett admin-konto.
- Den här filen **ska inte committas** eftersom den innehåller känslig information.

### Databas

Backend använder [Supabase](https://supabase.com/) (Postgres) som databas via `@supabase/supabase-js`.

1. Skapa ett projekt på [supabase.com](https://supabase.com/) och hämta din projekt-URL och service role-nyckel under **Project Settings → API**.
2. Skapa tabellerna `categories`, `products`, `users`, `userFavorites`, `cart`, `orders` och `orderItems` i Supabase (t.ex. via SQL Editor eller Table Editor).
3. Fyll i `.env` enligt exemplet ovan.
4. Skapa ett admin-konto:

   ```bash
   node utils/seedAdmin.js
   ```

## Körning

1. Starta backend-servern

   ```bash
   cd server
   npm start
   ```

2. Starta frontend-applikationen

   ```bash
   cd client
   npm start

   ```

3. Öppna applikationen i webbläsaren
   ```bash
   http://localhost:4200
   ```

## 🛠️ Teknologier

   - Angular
   - Tailwind CSS
   - Node.js / Express
   - Supabase (Postgres)

## 📑 Funktionalitet

   - Visa produkter
   - Visa produkter baserat på kategorier och om det är en nyhet
   - Söka efter produkter
   - Visa och hantera favoriter
   - Lägg till i varukorg
   - Hantera beställning
   - Enkel adminvy för produkter och kategorier
   - Adminhantering, lägga till/ ta bort produkter och kategorier
