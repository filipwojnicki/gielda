import React, { Component } from 'react'
import { Table, Spinner, Row, Col, Button } from 'reactstrap'

import toastr from 'toastr'

import Api from '../lib/Api'

export default class wallet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userWallet: []
    };
  }

  componentDidMount() {
    this.getUserWallet();
  }

  getUserWallet = async () => {
    const api = new Api(process.env.API_URL);
    const walletData = await api.getUserWallet().catch(err => console.log(err));

    if(!walletData.length) return;

    this.setState({
      userWallet: walletData
    });
  }

  generateWalletTable = (wItem, i) => {
    let currentPriceData = this.props.prices.Items.find(item => item.Code === wItem.instrument.code);

    console.log(wItem.count, currentPriceData.Price);

    return (
      <tr key={i}>
        <td>{wItem.instrument.name}</td>
        <td>{currentPriceData.Price} </td>
        <td>{wItem.count}</td>
        <td>{this.truncateDecimals((wItem.count / currentPriceData.Unit) * currentPriceData.Price, 4)} </td>
        <td><Button color="info" onClick={() => this.sellInstrument(wItem.instrument.id, currentPriceData.Price)}>Sell</Button></td>
      </tr>
    );
  }

  truncateDecimals(number, digits) {
    var multiplier = Math.pow(10, digits),
      adjustedNum = number * multiplier,
      truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

    return truncatedNum / multiplier;
  }

  sellInstrument = async (instrumentId, price) => {
    const api = new Api(process.env.API_URL);
    const sellRes = await api.sellInstrument(instrumentId).catch(err => console.log(err));

    if (sellRes.data.success) {
      this.props.onSuccessfullySell(price);
      this.getUserWallet();
      return toastr.success(sellRes.data.success);
    } else if (sellRes.data.error) {
      return toastr.error(sellRes.data.error);
    }
  }

  render() {
    return (
      <div>
        <Row className="p-4 h-100 align-items-center">
          <Col>
            <h2>My wallet</h2>
          </Col>
        </Row>
        {this.props.prices.Items ?
          this.state.userWallet ?
            <Table striped>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Unit price</th>
                  <th>Amount</th>
                  <th>Value</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.userWallet.sort((a, b) => a.instrument.name.localeCompare(b.instrument.name)).map(this.generateWalletTable)}
              </tbody>
            </Table>
          :
          'Wallet is empty'
          :
          <Spinner className="mx-auto" size="lg" color="secondary" />
        }
      </div>
    )
  }
}
