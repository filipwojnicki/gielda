import WebSocket from 'ws';
import * as InstrumentHistoryController from './controllers/instrumentsHistory';

const websocketList = [];

const FPSocket = new WebSocket('ws://webtask.future-processing.com:8068/ws/stocks?format=json');

FPSocket.on('message', function incoming(data) {
  // console.log(data);

  for (const websocketclient of websocketList) {
    websocketclient.send(data);
  }

  data = data ? JSON.parse(data) : null;

  if (data.Items) {
    return InstrumentHistoryController.logPrices(data.Items, data.PublicationDate);
  }
});

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  websocketList.push(ws);
});
