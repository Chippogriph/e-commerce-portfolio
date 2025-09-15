# Examensprojekt – Freaky Fashion - E-handel

Detta är en examinerande uppgift i min frontendutvecklarutbildning.  
Projektet består av en Angular-baserad frontend och en Node.js/Express-baserad backend med SQLite som databas.

Detta projekt är likt ett tidigare projekt som också heter Freaky Fashion som är byggt med Angular-baserad frontend.  
Skillnaden med detta projekt är dock att fokus har legat mer på backend.

## 📂 Projektstruktur

- **client/** – Angular-applikationen (frontend)
- **server/** – Express-servern och databasen (backend)

## 🚀 Installation

1. Klona projektet
   ```bash
   git clone https://github.com/Chippogriph/Freaky-Fashion-Backendfocused.git
   cd Freaky-Fashion-Backendfocused
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
För att kunna skapa ett admin-konto med seed-scriptet behöver du skapa en `.env`-fil i server-mappen med de variabler som projektet förväntar sig.  
  
Exempel på innehåll (byt ut värdena mot dina egna):  
ADMIN_USERNAME=your-admin-username  
ADMIN_PASSWORD=your-admin-password  

- `.env` används av `seedAdmin.js` för att lägga till ett admin-konto i databasen.
- Den här filen **ska inte committas** eftersom den innehåller känslig information.


### Databas

Backend använder SQLite via `better-sqlite3`. För att projektet ska fungera korrekt måste databasen skapas och initialiseras med testdata samt ett admin-konto.

1. Skapa en tom SQLite-databas

   ```bash
   node -e "require('better-sqlite3')('db/freaky-fashion.db')"

   ```

2. Skapa tabeller och populera med testdata

   ```bash
   node utils/initDb.js
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
   - SQLite

## 📑 Funktionalitet

   - Visa produkter
   - Visa produkter baserat på kategorier och om det är en nyhet
   - Söka efter produkter
   - Visa och hantera favoriter
   - Lägg till i varukorg
   - Hantera beställning
   - Enkel adminvy för produkter och kategorier
````
