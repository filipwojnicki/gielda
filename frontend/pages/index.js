import React, { Component } from 'react'
import Link from 'next/link'
import Head from '../components/head'
import MainNav from '../components/mainNav'
import Prices from '../components/prices'
import WebSocket from '../components/webSocket'
import StockPriceChart from '../components/stockPriceChart'
import Wallet from '../components/wallet'

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
      showedChart: false,
      userData: {}
    }
  }

  async componentDidMount() {
    this.setState({
      connectToSocket: true
    })

    const token = this.getCookie('token');

    if (token) {
      const api = new Api(process.env.API_URL);
      const res = await api.checkAuthToken(token).catch(() => {
        this.setCookie('token', token, new Date().setDate(new Date().getDate() - 1));
        return window.location.href = '/signin';
      });

      if (res.data) {
        if (res.data.hasOwnProperty('data')) {
          if (res.data.data) {
            const data = res.data.data;

            if (!data.success) {
              this.setCookie('token', token, new Date().setDate(new Date().getDate() - 1));
              return window.location.href = '/signin';
            }

            if (data.success) {
              this.setState({
                userData: data
              });
              return;
            }
          }
        }
      }
    }
    this.setCookie('token', token, new Date().setDate(new Date().getDate() - 1));
    return window.location.href = '/signin';
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

  setCookie(name, value, exdate) {
    (exdate) && (exdate = new Date(exdate).toUTCString());
    var c_value = escape(value) + ((exdate === null || exdate === undefined) ? "" : "; expires=" + exdate);
    document.cookie = name + "=" + c_value;
  };

  getCookie = (name) => {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  render() {
    const socket = this.state.connectToSocket ? <WebSocket onMessage={this.handleData} /> : '';

    return (
      <div>
        <Head title="Stocks" description="Best marketplace online." />
        <MainNav userData={this.state.userData} />

        <Container>
          <Row>
            <Col md="6">
              <Prices prices={this.state.prices} />
            </Col>
            <Col md="6">
              <Wallet prices={this.state.prices} />
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <Button onClick={this.showChart}>Chart</Button>
              {this.state.showedChart ? <StockPriceChart historicalPrices={this.state.historicalPrices} /> : ''}
            </Col>
            <Col md="6">
              <span className="h2">Available money {(this.state.userData.credits) ? this.state.userData.credits : 0}</span>
            </Col>
          </Row>
        </Container>
        {socket}
     </div>
    )
  }
}
