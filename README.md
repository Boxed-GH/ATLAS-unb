<div align="center">

<img src="https://github.com/ATLAS-unb/ATLAS-unb/blob/main/atlas67.png?raw=true" width="330" alt="ATLAS Logo">

# ATLAS

**A Simple, fast, and powerfull Proxy, built to bypass network filters**

A browser-style web proxy designed to feel more like a real browser than a traditional proxy hub.

<br>

[![ScramJet](https://img.shields.io/badge/Powered%20by-ScramJet-111111?style=for-the-badge)](https://github.com/MercuryWorkshop/scramjet)
[![BareMux](https://img.shields.io/badge/Transport-BareMux-111111?style=for-the-badge)](https://github.com/)
[![Epoxy](https://img.shields.io/badge/Transport-Epoxy-111111?style=for-the-badge)]([https://github.com/MercuryWorkshop/epoxy-tls])
[![Wisp](https://img.shields.io/badge/Transport-Wisp-111111?style=for-the-badge)](https://github.com/MercuryWorkshop/wisp-protocol)

</div>

---

## About

ATLAS is a browser-style proxy experience built to make proxied browsing feel simple, familiar, and modern.

Instead of being just a page with a URL box and a list of links, ATLAS includes a browser-inspired interface with tabs, navigation, and customization.

The goal is simple:

> **Make the web feel like a browser, not a "proxy hub".**

ATLAS is powered by **ScramJet, BareMux, and Epoxy**.

---

## Features

### 🌐 Browser Experience

- Multiple tabs
- Back, forward, and reload controls
- Browser-style address bar
- customizable search engine
- Favorites and quick links
- Local browsing history
- Persistent local settings
- New-tab homepage
- Browser-style navigation

### 🎮 Games

ATLAS includes a built-in games section with support for **Mercury Education** and other supported game experiences.

### 🛡️ Privacy & Controls

- Customizable panic key
- Educational cloaking profiles
- Local persistence
- Configurable browsing preferences
- Minimal interface focused on browsing

### 🎨 Customization

ATLAS includes settings for:

- Themes
- Search preferences
- Favorite shortcuts
- Cloaking profiles
- Panic key
- Other local preferences

---

## Interface

ATLAS is intentionally designed to stay minimal.

The homepage focuses on three things:

**Search. Browse. Navigate.**

There are no unnecessary dashboards or huge collections of links taking over the screen.

![ATLAS homepage](docs/atlas-home.png)

---

# Installation

### 1. Clone the repository

```bash
git clone https://github.com/rbxfreezyz-cmd/ScramJet-Blank-Template.git
cd ScramJet-Blank-Template
```

### 2. Install dependencies
```bash
pnpm install
```
### 3. Start ATLAS
```bash
pnpm start
```
Open:
http://localhost:8080
**ATLAS can accept either a full URL or a search query through its address/search interface.**
Development

For development:

pnpm dev

Make sure commands are run from the ATLAS project directory.

Architecture

ATLAS keeps the browser interface and proxy infrastructure relatively separate:

public/
├── index.html    → ATLAS interface
├── index.css     → styling
├── index.js      → tabs, navigation, settings, search
└── sw.js         → ScramJet service worker

src/
└── index.js      → Fastify server, Wisp, proxy infrastructure

**Limitations**
## Some websites may not work correctly through a proxy.

Depending on the destination, you may encounter issues with:
```bash
Cookies
Authentication
WebSockets
Embeds
Cross-origin functionality
Anti-proxy protections
Sites that restrict proxy traffic
```

### Transport compatibility also depends on the configuration supported by BareMux.

**Credits**

### ATLAS is built with several open-source projects:

```bash
ScramJet — web proxy engine
BareMux — transport management
Epoxy Transport — proxy transport
Wisp — WebSocket-based transport
Mercury — integrated game and education features
SkyFlare — studio behind ATLAS**
```


<div align="center"> <img src="https://github.com/ATLAS-unb/ATLAS-unb/blob/main/atlas67.png?raw=true" width="55" alt="ATLAS Logo">

## Powered by SkyFlare

**A studio owned and founded by Boxed.**

</div> ```
