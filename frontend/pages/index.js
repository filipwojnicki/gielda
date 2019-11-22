import React, { Component } from 'react'
import Link from 'next/link'
import Head from '../components/head'
import MainNav from '../components/mainNav'
import Prices from '../components/prices'
import WebSocket from '../components/webSocket'
import StockPriceChart from '../components/stockPriceChart'

import Api from '../lib/Api'

import { Container, Row, Col, Button } from 'reactstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

export default class index extends Component {
  constructor() {
    super();

    this.state = {
      prices: {},
      historicalPrices: {},
      connectToSocket: false,
      showedChart: false
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

    if (this.state.showedChart) {
      this.getChartData();
    }

    prices = JSON.parse(data.data);

    this.setState({
      prices
    })
  }

  showChart = async () => {
    if(!this.state.showedChart) {
      await this.getChartData();
    }

    this.setState({
      showedChart: !this.state.showedChart
    });
  }

  getChartData = async () => {
    const api = new Api(process.env.API_URL);
    const chartData = await api.getChartData().catch(error => console.log(error));

    this.setState({
      historicalPrices: chartData
    });
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
          <Row>
            <Col md="6">
              <Button onClick={this.showChart}>Chart</Button>
              {this.state.showedChart ? <StockPriceChart historicalPrices={this.state.historicalPrices} /> : ''}
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
