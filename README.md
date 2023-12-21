# Lotte-Antje-Alessia

## Hoe start je de applicatie op?

### Credentials Firebase

- Maak een nieuw project aan op Firebase.
- Genereer een nieuwe private key. (project settings > service accounts > generate new private key)
- Sla het bestand op in het project.

### Env files

#### API

- Maak een .env-bestand aan in de root van de api folder.

```env
GOOGLE_APPLICATION_CREDENTIALS=<pad naar het private key bestand>

URL_FRONTEND= http://localhost:5173
DB_HOST=mongodb
DB_PORT=27027
DB_NAME=api

WS_PORT=3004

NODE_ENV=dev
```

#### PWA

- Maak een .env-bestand aan in de root van de pwa folder.
- Gebruik (firebase > Project settings > General > SDK setup and configuration > Config), en converteer handmatig naar env syntax.
  
```env
VITE_FIREBASE_API_KEY=<api key firebase>
VITE_FIREBASE_AUTH_DOMAIN=<auth domain firebase>
VITE_FIREBASE_PROJECT_ID=<project id firebase>
VITE_FIREBASE_STORAGE_BUCKET=<storage bucket firebase>
VITE_FIREBASE_MESSAGING_SENDER_ID=<messaging sender id firebase>
VITE_FIREBASE_APP_ID=<app id firebase>
VITE_FIREBASE_MEASUREMENT_ID=<measurement id firebase>
VITE_BACKEND_URL="http://[::1]:8000/graphql"
```

## Database

- Start de database op met docker-compose up van de file docker-compose.yml in de folder infrastructure.

## Seeding

### Voeg data toe aan de database

Voeg data toe bezoekers, personeel, artiesten, taak, materiaal, users.

```cmd
npx nestjs-command seed:database:bezoekers
```

```cmd
npx nestjs-command seed:database:personeel
```

```cmd
npx nestjs-command seed:database:artiesten
```

```cmd
npx nestjs-command seed:database:taak
```

```cmd
npx nestjs-command seed:database:materiaal
```

```cmd
npx nestjs-command seed:database:users
```

### Verwijder data uit de database

Verwijder data bezoekers, personeel, artiesten, taak, materiaal, users.

```cmd
npx nestjs-command seed:reset:bezoekers
```

```cmd
npx nestjs-command seed:reset:personeel
```

```cmd
npx nestjs-command seed:reset:artiesten
```

```cmd
npx nestjs-command seed:reset:taak
```

```cmd
npx nestjs-command seed:reset:materiaal
```

```cmd
npx nestjs-command seed:reset:users
```

## Vertalingen

Bij het aanpassen van de vertalingen in de spreadsheet, moet je naar `/packages/pwa` en dit commando runnen.

```cmd
npx tsx .\packages\pwa\src\utils\sheets.ts
```

## Test frontend

Voer volgende commando's uit in de root van het project.

```cmd
$env:FIREBASE_AUTH_EMULATOR_HOST='127.0.0.1:9099'
```

```cmd
$env:VITE_EMULATION='true'
```

```cmd
npm run dev:emulate
```

## Test backend

```cmd
npx jest <filename>
```

## e2e test

instellen van node env variabele

```cmd
$env:NODE_ENV='dev'    
```

```cmd
npm run test:e2e -w api
```

## Docker production

- Maak een .env.production.local file aan voor zowel de api als de pwa. Kopieer de inhoud van de .env file.
- Genereer een nieuwe private key bij firebase.(project settings > service accounts > generate new private key)
- Pas de ```GOOGLE_APPLICATION_CREDENTIALS``` in de .env.production.local file in de api folder aan naar de locatie van het private key bestand.
- Pas ook ```NODE_ENV=dev```aan naar ```NODE_ENV=production```
- In de .env.production.local file in de pwa folder moet je niets aanpassen.
- Voer het commando ```docker compose up``` uit op de file docker-compose-production.yml in de folder infrastructure.
- De seeding data wordt automatisch toegevoegd aan de database.
- Start het project op.
