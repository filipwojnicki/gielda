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
}
