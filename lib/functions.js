const axios = require('axios');

/**
 * Fetches data from a URL and returns it as a buffer.
 * @param {string} url - The URL to fetch.
 * @param {object} [options] - Optional axios config overrides.
 * @returns {Promise<Buffer>} - The response data as a buffer.
 */
async function getBuffer(url, options = {}) {
  try {
    const response = await axios({
      method: 'get',
      url: url,
      headers: {
        DNT: 1,
        'Upgrade-Insecure-Requests': 1,
      },
      responseType: 'arraybuffer',
      ...options,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Extracts the IDs of group admins from a list of participants.
 * @param {Array} participants - List of participant objects.
 * @returns {Array} - Array of admin IDs.
 */
function getGroupAdmins(participants) {
  const admins = [];
  for (const participant of participants) {
    if (participant.isAdmin !== null) {
      admins.push(participant.id);
    }
  }
  return admins;
}

/**
 * Generates a random string by concatenating a random number and a suffix.
 * @param {string} suffix - The suffix to append.
 * @returns {string} - The generated random string.
 */
function getRandom(suffix) {
  return '' + Math.floor(Math.random() * 10000) + suffix;
}

/**
 * Converts a large number into a human-readable string with suffixes.
 * e.g., 1500 -> "1.5K"
 * @param {number} number - The number to convert.
 * @returns {string|number} - The formatted string or original number.
 */
function h2k(number) {
  const units = ['', 'K', 'M', 'B', 'T', 'P', 'E'];
  const order = Math.floor(Math.log10(Math.abs(number)) / 3);
  if (order === 0) return number;
  const unitName = units[order];
  const scaled = number / Math.pow(10, order * 3);
  let formatted = scaled.toFixed(1);
  if (/\.0$/.test(formatted)) {
    formatted = formatted.slice(0, -2); // Remove trailing .0
  }
  return formatted + unitName;
}

/**
 * Checks if a string is a valid URL.
 * @param {string} text - The string to check.
 * @returns {boolean} - True if valid URL, else false.
 */
function isUrl(text) {
  const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/gi;
  return urlRegex.test(text);
}

/**
 * Converts a JavaScript object into a pretty JSON string.
 * @param {object} obj - The object to convert.
 * @returns {string} - Pretty JSON string.
 */
function Json(obj) {
  return JSON.stringify(obj, null, 2);
}

/**
 * Converts milliseconds runtime into a formatted string.
 * @param {number} ms - Runtime in milliseconds.
 * @returns {string} - Formatted runtime string.
 */
function runtime(ms) {
  ms = Number(ms);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);

  const dayStr = days > 0 ? days + (days === 1 ? ' day, ' : ' days, ') : '';
  const hourStr = hours > 0 ? hours + (hours === 1 ? ' hour, ' : ' hours, ') : '';
  const minuteStr = minutes > 0 ? minutes + (minutes === 1 ? ' minute, ' : ' minutes, ') : '';
  const secondStr = seconds > 0 ? seconds + (seconds === 1 ? ' second' : ' seconds') : '';

  return dayStr + hourStr + minuteStr + secondStr;
}

/**
 * Returns a promise that resolves after a delay.
 * @param {number} ms - Milliseconds to sleep.
 * @returns {Promise}
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Fetches JSON data from a URL.
 * @param {string} url - The URL to fetch.
 * @param {object} [options] - Optional axios config overrides.
 * @returns {Promise<object>} - The parsed JSON response.
 */
async function fetchJson(url, options = {}) {
  try {
    const response = await axios({
      method: 'GET',
      url: url,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
                      'AppleWebKit/537.36 (KHTML, like Gecko) ' +
                      'Chrome/95.0.4638.69 Safari/537.36',
      },
      ...options,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

module.exports = {
  getBuffer,
  getGroupAdmins,
  getRandom,
  h2k,
  isUrl,
  Json,
  runtime,
  sleep,
  fetchJson,
};
