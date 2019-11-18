import React, { Component } from 'react'
import Link from 'next/link'
import Head from '../components/head'
import MainNav from '../components/mainNav'
import Prices from '../components/prices'
import WebSocket from '../components/webSocket'

import { Container, Row, Col } from 'reactstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

export default class index extends Component {
  constructor() {
    super();

    this.state = {
      prices: {},
      connectToSocket: false
    }
  }

  componentDidMount() {
    this.setState({
      connectToSocket: true
    })
  }

  handleData = data => {
    let prices = {};

    if (!data) {
      this.setState({ prices: {} })

      return;
    }

    if (!data.data) {
      this.setState({ prices: {} })

      return;
    }

    prices = JSON.parse(data.data);

    console.log(prices);

    console.log(Object.keys(prices))

    this.setState({
      prices
    })
  }

  render() {
    const socket = this.state.connectToSocket ? <WebSocket onMessage={this.handleData} /> : '';

    return (
      <div>
        <Head title="Stocks" description="Best marketplace online." />
        <MainNav />

        <Container>
          <Row>
            <Col md="6">
              <Prices prices={this.state.prices} />
            </Col>
            <Col md="6">
                1
            </Col>
          </Row>
        </Container>
        {socket}
     </div>
    )
  }
}
