import React, { Component } from 'react'

export default class webSocket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ws: null
    };
  }

  componentDidMount() {
    this.connect();
  }

  timeout = 250;

  connect = () => {
    var ws = new WebSocket(process.env['SOCKET_URL']);
    let that = this;
    var connectInterval;

    ws.onopen = () => {
      console.log("connected websocket");

      this.setState({
        ws: ws
      });

      that.timeout = 250;
      clearTimeout(connectInterval);
    };

    ws.onclose = e => {
      this.props.onMessage(null);

      that.timeout = that.timeout + that.timeout;
      connectInterval = setTimeout(this.check, Math.min(10000, that.timeout));
    };

    ws.onerror = err => {
      this.props.onMessage(null);

      ws.close();
    };

    ws.onmessage = data => {
      if (!data) return;
      this.props.onMessage(data);
    }
  };

  check = () => {
    const { ws } = this.state;

    if (!ws || ws.readyState == WebSocket.CLOSED) this.connect();
  };

  render() {
    return(null);
  }
}
