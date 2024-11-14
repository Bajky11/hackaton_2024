Possible router structure:

/app
├── /automations
│   ├── page.js                   // Hlavní stránka pro zobrazení seznamu automatizací
│   ├── /[id]
│   │   ├── page.js               // Detailní zobrazení jedné automatizace podle ID
│   │   └── logs.js               // Stránka s logy pro konkrétní automatizaci
│   └── dashboard.js              // Přehledová stránka s grafy a statistikami pro automatizace
│                       ? spojil bych s hl stránkou  
├── /runners
│   ├── page.js                   // Hlavní stránka pro zobrazení seznamu runnerů
│   ├── /[id]
│   │   └── page.js               // Detailní zobrazení jednoho runneru podle ID
│   └── performance.js            // Stránka s metrikami a výkonem jednotlivých runnerů
├── /jobs
│   ├── page.js                   // Hlavní stránka pro zobrazení seznamu úloh (jobs)
│   └── /[id]
│       └── page.js               // Detailní zobrazení jedné úlohy podle ID
├── /metrics
│   ├── page.js                   // Hlavní stránka pro zobrazení přehledu metrik
│   └── /[runnerId]
│       └── page.js               // Detailní metriky pro konkrétní runner
├── /dashboard
│   └── page.js                   // Hlavní dashboard aplikace s přehlednými grafy a statistikami
├── layout.js                     // Layout pro strukturu stránek ve složce /app
└── page.js                       // Výchozí přesměrování na dashboard nebo úvodní stránka
