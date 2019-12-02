import React, { Component } from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Api from '../lib/Api'

import toastr from 'toastr'

import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'toastr/build/toastr.min.css'

export default class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      name: '',
      lastname: '',
      credits: 0
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentDidMount() {
    if (this.getCookie('token')) {
      return window.location.href = '/';
    };
  }

  getCookie = (name) => {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  showToaster(data, success) {
    if(!success) {
      if (data.error) {
        if(data.error.hasOwnProperty('details')) {
          let errString = '';

          data.error.details.map(detail => errString += `<li>${detail.message}</li>`);
          return toastr.error(`<ul>${errString}</ul>`);
        }
      }

      return toastr.error(data.text);
    }
    return toastr.success(data.text);
  }

  signUp = async () => {
    const { name, lastname, email, password, credits } = this.state;

    if (this.getCookie('token')) {
      return window.location.href = '/';
    };

    if (name && lastname && email && password && credits && email !== '' && password !== '' && email !== '' && password !== '') {
      const api = new Api(process.env.API_URL);
      const signup = await api.signUp(name, lastname, email, password, credits).catch(error => (error.response) ? this.showToaster(error.response.data, false) : '');

      if (!signup) {
        return this.showToaster({text: 'Internal server error. Please try again later.'}, false);
      }

      if (!signup.data) {
        return this.showToaster({text: 'Internal server error. Please try again later.'}, false);
      }

      let data = signup.data;

      if (data.success) {
        this.showToaster(data, true);
        setTimeout(() => window.location.href = '/signin', 2 * 1000);
        return ;
      }
    } else {
      return this.showToaster({text: 'All fields must be filled.'}, false);
    }
  }

  render() {
    return (
      <div>
        <Head title="Stocks | Sign Up" description="Best marketplace online." />

        <Container className="mx-auto text-center">
          <Row >
            <Col>
              <h1>Sign up</h1>
            </Col>
          </Row>
          <Row className="p-4">
            <Col>
              <Form>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input type="text" name="name" id="name" onChange={this.handleChange} placeholder="Name" />
                </FormGroup>
                <FormGroup>
                  <Label for="lastname">Lastname</Label>
                  <Input type="text" name="lastname" id="lastname" onChange={this.handleChange} placeholder="Lastname" />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input type="email" name="email" id="email" onChange={this.handleChange} placeholder="E-mail" />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input type="password" name="password" id="password" onChange={this.handleChange} placeholder="Password" />
                </FormGroup>
                <FormGroup>
                  <Label for="credits">Your money</Label>
                  <Input type="text" name="credits" id="credits" onChange={this.handleChange} placeholder="Your money" />
                </FormGroup>
                <Button onClick={this.signUp}>Sign up</Button>
              </Form>
            </Col>
          </Row>
          <Link href="/signin">
            <a>Sign in</a>
          </Link>
        </Container>
     </div>
    )
  }
}
