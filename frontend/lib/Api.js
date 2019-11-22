import axios from 'axios';
import qs from 'qs';

export default class Api {
  constructor(apiUrl) {
    this.API_URL = 'http://localhost:8848/api';

    axios.defaults.baseURL = this.API_URL;
  }

  async getChartData() {
    const res = await axios
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
      url: '/api/users',
    };

    const res = await axios(options)
      .catch(err => {
        throw err
      });

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

    console.log(data)

    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url: '/users',
    };

    const res = await axios(options)
      .catch(err => {
        throw err
      });

    console.log(res);

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
      url: '/auth/checkToken',
    };

    const res = await axios(options)
      .catch(err => {
        throw err
      });

    return res;
  }

}
