import React, { Component } from 'react'

import { Table, Spinner } from 'reactstrap'

export default class prices extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2 className="p-4">Stock prices</h2>
        <Table striped>
          <thead>
            <tr>
              <th>Company</th>
              <th>Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.props.prices.Items ? this.props.prices.Items.map(item =>
              <tr key={item.Code}>
                <td>{item.Name}</td>
                <td>{item.Price}</td>
              </tr>
            ) :
            <Spinner className="mx-auto" size="lg" color="secondary" />
            }
          </tbody>
        </Table>

      </div>
    )
  }
}
