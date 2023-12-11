# Lotte-Antje-Alessia

## seeding

### Commands

#### Data toevoegen

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

#### Data verwijderen

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

## vertalingen
bij het aanpassen van de vertalingen in de spreadsheet, moet je naar `/packages/pwa` en deze commando runnen
```
npx tsx .\packages\pwa\src\utils\sheets.ts
```

## test frontend

```cmd
$env:FIREBASE_AUTH_EMULATOR_HOST='127.0.0.1:9099'
```

```cmd
$env:VITE_EMULATION='true'
```

```cmd
npm run dev:emulate
```

## ideas

### Bezoekers
-  (Ticket kopen) </br>
-  (Geld op bandje plaatsen voor eten en drinken)
-  ticket zichtbaar
-  Overzicht line-up en podia
-  Favo optreden toevoegen + melding wanneer optreden begint en waar

### Artiesten
- Benodigheden
- Set list
- Agenda wanneer sound check, optreden, opzetten, ...
- Backstage drank en eten
- Vip lijst

### Personeel
- Eigen takenlijst (met podia)
- Uurrooster
- Materiaal benodigdheden
- qr code scanner

## Ideeën
- qr-codes ipv nfc
- kassabeheer, artiestenbeheer, bezoekersbeheer
- personeel: standjes met eten en bezoekers, artiesten en benodigdheden, VIP
