import axios from 'axios';
import Transaction from '../models/transaction';

import * as instrumentService from '../services/instrumentService';
import * as walletService from '../services/walletService';
import * as userService from '../services/userService';

/**
 * Buy instrument.
 *
 * @param {Integer} instrumentId
 * @param {Integer} userId
 */
export async function makeBuy(instrumentId, userId) {
  let instrumentData = await instrumentService.getCurrentInstrument(instrumentId).catch(() => {
    return { error: 'Server error' };
  });

  if (instrumentData.error) {
    return instrumentData;
  }

  instrumentData = instrumentData.toJSON();

  const prices = await getPrices();

  if (!prices.length) {
    return { error: "Server can't get actual prices" };
  }

  const currentPrice = prices.find(item => item.code === instrumentData.code);

  if (!currentPrice) {
    return { error: 'This stock instrument is not supported' };
  }

  if (instrumentData.count <= 0 || instrumentData.count < currentPrice.unit) {
    return { error: `${instrumentData.name} is out of stock` };
  }

  let userData = await userService.getUser(userId).catch(() => {
    return { error: 'Server error' };
  });

  if (userData.error) {
    return userData;
  }

  userData = userData.toJSON();

  if (userData.credits < currentPrice.price) {
    return { error: `You don't have enough money to buy: ${instrumentData.name}.` };
  }

  let walletStatus = await walletService.changeInstrumentValue(instrumentId, userId, currentPrice.unit);

  if (walletStatus.error) {
    return walletStatus;
  }

  walletStatus = walletStatus.toJSON();

  instrumentService.reduceInstrumentCount(instrumentId, instrumentData.count - currentPrice.unit);
  userService.updateUserCredits(userId, truncateDecimals(userData.credits - currentPrice.price, 4));

  new Transaction({
    type: 'BUY',
    wallet_id: walletStatus.id,
    count: currentPrice.unit
  }).save();

  return { success: `Successfully buy: ${instrumentData.name}` };
}

/**
 * Sell instrument.
 *
 * @param {Integer} instrumentId
 * @param {Integer} userId
 */
export async function makeSell(instrumentId, userId) {
  let walletData = await walletService.getCurrentInstrument(instrumentId, userId).catch(() => {
    return { error: 'Server error' };
  });

  if (walletData.error) {
    return walletData;
  }

  walletData = walletData.toJSON();

  let instrumentData = await instrumentService.getCurrentInstrument(instrumentId).catch(() => {
    return { error: 'Server error' };
  });

  if (instrumentData.error) {
    return instrumentData;
  }

  instrumentData = instrumentData.toJSON();

  const prices = await getPrices();

  if (!prices.length) {
    return { error: "Server can't get actual prices" };
  }

  const currentPrice = prices.find(item => item.code === instrumentData.code);

  if (!currentPrice) {
    return { error: 'This stock instrument is not supported' };
  }

  if (walletData.count < currentPrice.unit) {
    return { error: `You don't have enough count of ${instrumentData.name}` };
  }

  let userData = await userService.getUser(userId).catch(() => {
    return { error: 'Server error' };
  });

  if (userData.error) {
    return userData;
  }

  userData = userData.toJSON();

  let walletStatus = await walletService.changeInstrumentValue(instrumentId, userId, -currentPrice.unit);

  if (walletStatus.error) {
    return walletStatus;
  }

  walletStatus = walletStatus.toJSON();

  instrumentService.reduceInstrumentCount(instrumentId, instrumentData.count + currentPrice.unit);
  userService.updateUserCredits(userId, truncateDecimals(userData.credits + currentPrice.price, 4));

  new Transaction({
    type: 'SELL',
    wallet_id: walletStatus.id,
    count: currentPrice.unit
  }).save();

  return { success: `Successfully sell: ${instrumentData.name}` };
}

/**
 * Get prices from external API.
 */
async function getPrices() {
  const prices = await axios.get(process.env.FP_API_URL).catch(() => []);

  if (!prices.data) return [];
  if (!prices.data.items.length) return [];

  return prices.data.items;
}

/**
 * Math truncate function.
 *
 * @param {Number} number
 * @param {Number} digits
 */
function truncateDecimals(number, digits) {
  const multiplier = Math.pow(10, digits),
    adjustedNum = number * multiplier,
    truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

  return truncatedNum / multiplier;
}
