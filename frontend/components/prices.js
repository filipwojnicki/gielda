import React, { Component } from 'react'

import { Table, Spinner, Row, Col } from 'reactstrap'

export default class prices extends Component {
  constructor(props) {
    super(props);
  }

  generateTable() {
    if (this.props.prices.Items) {
      return (
        <Table striped>
          <thead>
            <tr>
              <th>Company</th>
              <th>Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.props.prices.Items.map(item =>
              <tr key={item.Code}>
                <td>{item.Name}</td>
                <td>{item.Price}</td>
              </tr>
            )}
          </tbody>
        </Table>
      );
    }

    return (<Spinner className="mx-auto" size="lg" color="secondary" />)
  }

  render() {
    return (
      <div>
        <Row className="p-4 h-100 align-items-center">
          <Col>
            <h2>Stock prices</h2>
          </Col>
          <Col className="text-right">
            <span className="">
              {this.props.prices.PublicationDate ? this.props.prices.PublicationDate : ''}
            </span>
          </Col>
        </Row>
        {this.generateTable()}
      </div>
    )
  }
}
