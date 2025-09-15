# Examensprojekt – Freaky Fashion - E-handel

Detta är en examinerande uppgift i min frontendutvecklarutbildning.  
Projektet består av en Angular-baserad frontend och en Node.js/Express-baserad backend med SQLite som databas.

Detta projekt är likt ett tidigare projekt som också heter Freaky Fashion som är byggt med Angular-baserad frontend.  
Skillnaden med detta projekt är dock att fokus har legat mer på backend.

## 📂 Projektstruktur

- **client/** – Angular-applikationen (frontend)
- **server/** – Express-servern och databasen (backend)

## 🚀 Installation & Körning

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

3. Installera beroenden för backend

   ```bash
   cd ../server
   npm install

   ```

4. Starta backend-servern

   ```bash
   cd server
   npm start

   ```

5. Starta frontend-applikationen

   ```bash
   cd client
   npm start

   ```

6. Öppna applikationen i webbläsaren
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