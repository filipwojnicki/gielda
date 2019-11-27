import axios from 'axios';
import qs from 'qs';

export default class Api {
  constructor(apiUrl) {
    this.API_URL = 'http://localhost:8848/api';

    this.token = this.getCookie('token');

    this.apiInstance = axios.create({
      baseURL: this.API_URL,
      timeout: 10000,
      headers: {
        'authorization': (this.token ? this.token : '')
      }
    });

  }

  getCookie = (name) => {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  async getUserWallet() {
    const res = await this.apiInstance
      .get('/instruments/wallet')
      .catch(err => []);

    if (res.status === 200) {
      if (res.data.length) {
        return res.data;
      }
    }

    return [];
  }

  async getChartData() {
    const res = await this.apiInstance
      .get('/instruments/history')
      .catch(err => { throw err });

    if (res.status === 200) {
      if (res.data.historicalPrices.length) {
        return res.data.historicalPrices;
      }
    }

    return [];
  }

  async signIn(email, password) {
    const data = {
      email,
      password
    };

    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url: '/users/signin',
    };

    const res = await this.apiInstance(options)
      .catch(err => { throw err });

    return res;
  }

  async signUp(name, lastname, email, password, credits) {
    const data = {
      email,
      password,
      name,
      lastname,
      credits
    };

    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url: '/users',
    };

    const res = await this.apiInstance(options)
      .catch(err => {
        throw err
      });

    return res;
  }

  async checkAuthToken(token) {
    const data = {
      token
    };

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify(data),
      url: '/users/verifyjwt',
    };

    const res = await this.apiInstance(options)
      .catch(err => {
        throw err
      });

    return res;
  }

}
