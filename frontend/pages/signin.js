import React, { Component } from 'react'
import Link from 'next/link'
import Head from '../components/head'

import Api from '../lib/Api'

import toastr from 'toastr'

import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'toastr/build/toastr.min.css'

export default class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    }
  }

  componentDidMount() {
    if (this.getCookie('token')) {
      return window.location.href = '/';
    }
  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  getCookie = (name) => {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  setCookie(name, value, exdate) {
    (exdate) && (exdate = new Date(exdate).toUTCString());
    var c_value = escape(value) + ((exdate === null || exdate === undefined) ? "" : "; expires=" + exdate);
    document.cookie = name + "=" + c_value;
  };

  showToaster(data, success) {
    if (!success) {
      if (data.error) {
        if (data.error.hasOwnProperty('details')) {
          let errString = '';

          data.error.details.map(detail => errString += `<li>${detail.message}</li>`);
          return toastr.error(`<ul>${errString}</ul>`);
        }
      }

      return toastr.error(data.text);
    }
    return toastr.success(data.text);
  }

  signIn = async () => {
    const { email, password } = this.state;

    if (this.getCookie('token')) {
      return window.location.href = '/';
    }

    if (email && password && email !== '' && password !== '') {
      const api = new Api(process.env.API_URL);
      const data = await api.signIn(email, password).catch(error => (error.response) ? this.showToaster(error.response.data, false) : '');

      if (!data) {
        return this.showToaster({ text: 'Internal server error. Please try again later.'}, false);
      }

      if (!data.data) {
        return this.showToaster({ text: 'Internal server error. Please try again later.'}, false);
      }

      const token = (data.data.token) ? data.data.token : '';

      if (token !== '') {
        this.setCookie('token', token, new Date().setDate(new Date().getDate() + 7))
        return window.location.href = '/';
      }
    } else {
      return this.showToaster({ text: 'All fields must be filled.'}, false);
    }
  }

  render() {
    return (
      <div>
        <Head title="Stocks | Sign In" description="Best marketplace online." />

        <Container className="mx-auto text-center">
          <Row >
            <Col>
              <h1>Sign in</h1>
            </Col>
          </Row>
          <Row className="p-4">
            <Col>
              <Form>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input type="email" name="email" id="email" onChange={this.handleChange} placeholder="E-mail" />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input type="password" name="password" id="password" onChange={this.handleChange} placeholder="Password" />
                </FormGroup>
                <Button onClick={this.signIn}>Sign In</Button>
              </Form>
            </Col>
          </Row>
          <Link href="/signup">
            <a>Sign up</a>
          </Link>
        </Container>
     </div>
    )
  }
}
