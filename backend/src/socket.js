import WebSocket from 'ws';

import * as wsc from './lib/webSocketClient';

import * as InstrumentHistoryController from './controllers/instrumentsHistory';

import { verifyJWTToken } from './utils/jwt';

const websocketList = [];

const FPSocket = new wsc.WebSocketClient();

FPSocket.open(process.env.SOCKET_URL);

FPSocket.onmessage = function(data) {
  for (const websocketclient of websocketList) {
    websocketclient.send(data);
  }

  data = data ? JSON.parse(data) : null;

  if (data.Items) {
    if (!data.Items.length) return;

    return InstrumentHistoryController.logPrices(data.Items, data.PublicationDate);
  }
};

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', async (ws, req) => {
  if (!req.headers.cookie) {
    ws.terminate();

    return;
  }

  const cookies = parseCookies(req);

  if (!cookies.token || typeof cookies.token !== 'string' || cookies.token === '') {
    ws.terminate();

    return;
  }

  const tokenData = await verifyJWTToken(cookies.token).catch(() => {
    ws.terminate();

    return;
  });

  if (tokenData) {
    if (
      tokenData.name === 'JsonWebTokenError' ||
      tokenData.name === 'NotBeforeError' ||
      tokenData.name === 'TokenExpiredError'
    ) {
      ws.terminate();

      return;
    }
    websocketList.push(ws);
  }
});

/**
 * Get cookie value.
 *
 * @param {Object} request
 */
function parseCookies(request) {
  const list = {},
    rc = request.headers.cookie;

  rc &&
    rc.split(';').forEach(function(cookie) {
      const parts = cookie.split('=');

      list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

  return list;
}
