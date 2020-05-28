const request = require('../request');

class Logs {
  constructor(apiConfigs) {
    this._apiConfigs = apiConfigs;
  }

  /**
   * Getting list of logs per the authenticated user/accounts
   */
  user() {
    return new Promise((resolve, reject) => {
      return request(this._apiConfigs)
        .get(`/messaging/logs/user`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => reject(error));
    });
  }
}

module.exports = Logs;
