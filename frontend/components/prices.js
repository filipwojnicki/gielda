import React, { Component } from 'react'

import { Table, Spinner, Row, Col } from 'reactstrap'
import Time from 'react-time-format'

export default class prices extends Component {
  constructor(props) {
    super(props);
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
