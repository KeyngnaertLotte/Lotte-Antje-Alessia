# Checklist Backend

## Backend API

- [x] De API is gebouwd met NestJS en wordt lokaal gehost via Docker.
- [ ] Er is een bonuspunt als de API extern wordt gehost.

## Database

- [x] Gegevens worden persistent opgeslagen in de meest geschikte datastructuur, bijvoorbeeld MongoDB.

## Realtime

- [x] De backend communiceert in realtime met de frontend en vice versa via de juiste protocollen.

## Autorisatie en Authenticatie

- [x] Firebase of een vergelijkbare service wordt gebruikt voor autorisatie en authenticatie.
- [x] De PKCE-flow wordt toegepast voor beveiligde autorisatie.
- [x] Er zijn minimaal twee rollen: gebruiker en administrator.
- [x] Een admin-account met e-mail "docent@howest.be" en wachtwoord "P@ssword123" is voorzien.

## Kwetsbaarheid

- [x] CORS is ingeschakeld.
- [ ] Er zijn extra beveiligingsmaatregelen tegen Cross Site Forgery (CSRF) en Cross Site Scripting (XSS).

## API Docs

- [x] GraphQL wordt voornamelijk gebruikt, met beperkt gebruik van REST API.
- [x] De API documenteert zichzelf met behulp van een self-documenting library zoals Swagger of GraphiQL / Apollo Playground.
- [ ] Ook statuscodes bij foutcondities worden gedocumenteerd.

## Framework

- [x] Een geschikte projectstructuur is gekozen.
- [x] Een seeder maakt de database automatisch aan bij het opstarten van de applicatie.

## Foutcontrole

- [ ] Het crashen van de applicatie wordt voorkomen door het gebruik van een try/catch-structuur met gedetailleerde logging.
- [ ] Foutboodschappen worden altijd in JSON-formaat naar de frontend gestuurd.

## Source Controle

- [x] Source controle wordt beheerd via GitHub door regelmatig te pushen.

## Staging / Deployment

- [x] De applicatie draait volledig in Docker.
- [x] De Docker image is beschikbaar op DockerHub / Harbor (optioneel).
- [ ] Een geschikte Kubernetes deployment methodiek is gekozen (Canary, blue-green, rolling, enz.) (optioneel).

## Testing

- [ ] Er zijn unittests en integratietests voor de API.
- [ ] Testing maakt deel uit van GitHub Actions / deployment.

## Extra Features

- [ ] Er zijn extra uitbreidingsmogelijkheden geïmplementeerd die niet in de cursus zijn behandeld.
- [ ] Mogelijke extra features zijn response caching en rate limiting, memory caching, API-gateway, interactie met hardware (bijv. MQTT / gRPC), integratie met een cloud AI-service of een aangepast AI-model, en externe deployment.

# Checklist Frontend

## Design

- [x] De frontend heeft een doordacht ontwerp dat een probleem oplost.
- [x] De gebruikerservaring en gebruikersinterface zijn van hoge kwaliteit.
- [x] Er worden correcte design-patterns toegepast.
- [ ] Er is aandacht besteed aan toegankelijkheid (a11y).

## Framework

- [x] Vue.js wordt gebruikt in combinatie met TypeScript.

## Testing

- [x] Er is minstens één goede unit test en één integratietest.
- [ ] Testing maakt deel uit van de deployment pipeline, inclusief snelheidstests en functionele tests.

## Styling

- [x] Tailwind CSS of UnoCSS wordt gebruikt voor styling.
- [ ] Er zijn ghosts, skeletons of loading states voor een betere gebruikerservaring.
- [ ] Input-validatie en foutmeldingen zijn geïmplementeerd.

## PWA (Progressive Web App)

- [x] De web-app kan fullscreen worden gelanceerd en heeft een correcte PWA-setup.
- [x] Er is een relevante service-worker geïmplementeerd.

## Multi-language

- [x] De applicatie is meertalig gemaakt, wat een meerwaarde biedt voor gebruikers.

## Error Logging

- [ ] Fouten worden gelogd, bijvoorbeeld met behulp van services zoals Sentry.io of LogRocket.

## Development Setup

- [ ] CodeClimate wordt gebruikt voor code testing en reviews.
- [ ] Npm-packages worden op een correcte manier gebruikt, zonder onnodige packages en met juiste flags.

## Staging / Deployment

- [x] De frontend draait volledig in Docker.
- [x] Gitflow wordt aangeraden voor versiebeheer.

## Build Optimalisatie

- [x] Vite wordt gebruikt voor een betere levering van JS-bestanden.
- [x] Bestanden worden optimaal geminifieerd voor een snellere levering.

## Eigen Inbreng

- [x] Er is iets kleins uitgewerkt dat niet in de cursus is behandeld, en dit toont zelfstudie en extra inzet.
- [ ] Mogelijke extra's zijn transities tussen schermen, gebruik van Nuxt voor SEO, WebAssembly-implementatie, web worker voor taken buiten de main thread, shared workers voor synchrone werking over meerdere tabs en het gebruik va
