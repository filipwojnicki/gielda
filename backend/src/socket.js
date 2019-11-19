import WebSocket from 'ws';

import * as wsc from './lib/webSocketClient';

import * as InstrumentHistoryController from './controllers/instrumentsHistory';

const websocketList = [];

const FPSocket = new wsc.WebSocketClient();

FPSocket.open(process.env.SOCKET_URL);

FPSocket.onmessage = function(data) {
  for (const websocketclient of websocketList) {
    websocketclient.send(data);
  }

  data = data ? JSON.parse(data) : null;

  if (data.Items) {
    return InstrumentHistoryController.logPrices(data.Items, data.PublicationDate);
  }
};

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  // TODO: socket authorization
  websocketList.push(ws);
});
