# ScramJet Atlas proxy

## Instalacion

```bash
git clone https://github.com/rbxfreezyz-cmd/ScramJet-Blank-Template.git
cd ScramJet-Blank-Template
pnpm install
pnpm start
```

Abre `http://localhost:8080`. Atlas acepta una URL completa o una consulta de búsqueda. Scramjet registra `public/sw.js`, configura BareMux con Wisp y carga el destino dentro del iframe, por lo que el servidor debe ejecutarse sobre HTTPS en producción (o en `localhost` durante desarrollo).

## Configurar el proxy

El transporte Wisp se anuncia en `public/index.js` usando `/wisp/`; el servidor de `src/index.js` atiende esa ruta y sirve los archivos de Scramjet, Epoxy y BareMux. Para publicar el proxy detrás de un dominio, configura un reverse proxy que reenvíe HTTP y WebSocket a `localhost:8080`, conserva la ruta `/wisp/` y define `PORT` si necesitas otro puerto:

```bash
PORT=8080 pnpm start
```

Usa HTTPS y WebSocket seguro (`wss`) fuera de localhost. La lista `hostname_blacklist` de `src/index.js` es el lugar para bloquear destinos no deseados.