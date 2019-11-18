import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff, faCog } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'

import Link from 'next/link'

export default class MainNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Navbar className="mainNav" color="dark" dark expand="lg">
        <Container fluid={false}>
          <NavbarBrand href="#">Stocks</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse className="flex-grow-1 text-right" isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto flex-nowrap">
              <NavItem>
                <NavLink disabled={true} href="#">Logged in as John Doe</NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink disabled={true} href="#">
                  <FontAwesomeIcon icon={faCog} />
                </NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink disabled={true} href="#">
                  <FontAwesomeIcon icon={faPowerOff} />
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}
