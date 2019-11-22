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

  logout = () => {
    this.setCookie('token', '', new Date().setDate(new Date().getDate() - 1));
    return window.location.href = '/signin';
  }

  setCookie(name, value, exdate) {
    (exdate) && (exdate = new Date(exdate).toUTCString());
    var c_value = escape(value) + ((exdate === null || exdate === undefined) ? "" : "; expires=" + exdate);
    document.cookie = name + "=" + c_value;
  };

  render() {
    return (
      <Navbar className="mainNav" color="dark" dark expand="lg">
        <Container fluid={false}>
          <NavbarBrand href="#">Stocks</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse className="flex-grow-1 text-right" isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto flex-nowrap">
              <NavItem>
                <NavLink disabled={true} href="#">Logged in as {`${(this.props.userData.name) ? this.props.userData.name : ''} ${(this.props.userData.lastname) ? this.props.userData.lastname : ''}`}</NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink disabled={true} href="#">
                  <FontAwesomeIcon icon={faCog} />
                </NavLink>
              </NavItem> */}
              <NavItem className="cursor-pointer" onClick={this.logout}>
                <NavLink disabled={true} href="#">
                  <FontAwesomeIcon icon={faPowerOff} />
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
        <style global jsx>{`
          .cursor-pointer:hover {
            cursor: pointer !important;
          }
      `}</style>
      </Navbar>
    )
  }
}
