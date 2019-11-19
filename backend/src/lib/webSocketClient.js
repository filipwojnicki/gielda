import WebSocket from 'ws';
import logger from './utils/logger';

/**
 * Extended WebSocket functionality, the most important is reconnect.
 *
 * SOURCE: https: //github.com/websockets/ws/wiki/Websocket-client-implementation-for-auto-reconnect.
 */
export function WebSocketClient() {
  this.autoReconnectInterval = 5 * 1000; // ms
}

WebSocketClient.prototype.open = function(url) {
  this.url = url;
  this.instance = new WebSocket(this.url);
  this.instance.on('open', () => {
    this.onopen();
  });
  this.instance.on('close', e => {
    switch (e.code) {
      case 1000: // CLOSE_NORMAL
        logger.info('WebSocket: closed');
        break;
      default:
        // Abnormal closure
        this.reconnect(e);
        break;
    }
    this.onclose(e);
  });
  this.instance.on('error', e => {
    switch (e.code) {
      case 'ECONNREFUSED':
        this.reconnect(e);
        break;
      default:
        this.onerror(e);
        break;
    }
  });
};
WebSocketClient.prototype.send = function(data, option) {
  try {
    this.instance.send(data, option);
  } catch (e) {
    this.instance.emit('error', e);
  }
};
WebSocketClient.prototype.reconnect = function() {
  this.instance.removeAllListeners();
  const that = this;

  setTimeout(function() {
    that.open(that.url);
  }, this.autoReconnectInterval);
};
WebSocketClient.prototype.onopen = function(e) {
  logger.info('WebSocketClient: open', e);
};
// WebSocketClient.prototype.onmessage = function (data, flags, number) {
//  console.log("WebSocketClient: message", arguments);
// }
WebSocketClient.prototype.onerror = function(e) {
  logger.error('WebSocketClient: error', e);
};
WebSocketClient.prototype.onclose = function(e) {
  logger.info('WebSocketClient: closed', e);
};
