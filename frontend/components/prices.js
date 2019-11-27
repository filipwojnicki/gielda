import React, { Component } from 'react'

import { Table, Spinner, Row, Col, Button } from 'reactstrap'
import Time from 'react-time-format'

import toastr from 'toastr'

import Api from '../lib/Api'

export default class prices extends Component {
  constructor(props) {
    super(props);
  }

  buyInstrument = async (instrumentCode, instrumentPrice) => {
    const findCode = this.props.instrumentsDetails.find(item => item.code === instrumentCode);

    const api = new Api(process.env.API_URL);
    const buyRes = await api.buyInstrument(findCode.id).catch(err => console.log(err));

    if (buyRes.data.success) {
      this.props.onSuccessfullyBuy(instrumentPrice);
      return toastr.success(buyRes.data.success);
    } else if (buyRes.data.error) {
      return toastr.error(buyRes.data.error);
    }
  }

  render() {
    return (
      <div>
        <Row className="p-4 h-100 align-items-center">
          <Col>
            <h2>Stock prices</h2>
          </Col>
          <Col className="text-right">
            <span>
              {this.props.prices.PublicationDate ? <Time value={this.props.prices.PublicationDate} /> : ''}
            </span>
          </Col>
        </Row>
        {this.props.prices.Items ?
          <Table striped>
            <thead>
              <tr>
                <th>Company</th>
                <th>Value</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.props.prices.Items.sort((a, b) => a.Name.localeCompare(b.Name)).map(item =>
                <tr key={item.Code}>
                  <td>{item.Name}</td>
                  <td>{item.Price}</td>
                  <td>{this.props.instrumentsDetails ? <Button color="info" onClick={() => this.buyInstrument(item.Code, item.Price)}>Buy</Button> : ''}</td>
                </tr>
              )}
            </tbody>
          </Table>
        :
          <Spinner className="mx-auto" size="lg" color="secondary" />
        }
      </div>
    )
  }
}
