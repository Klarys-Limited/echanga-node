const request = require('../request');
class Logs {
  constructor(apiConfigs) {
    this._apiConfigs = apiConfigs;
  }

  /**
   * Getting list of logs per the authenticated user
   */
  user() {
    return new Promise((resolve, reject) => {
       request(this._apiConfigs)
        .get(`/messaging/logs/user`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => reject(error));
    });
  }

  /**
   * Getting list of logs per account
   */
  account() {
    return new Promise((resolve, reject) => {
      request(this._apiConfigs)
        .get(`/messaging/logs/accounts`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => reject(error));
    });
  }

  /**
   * Getting the details of a log for an account/user
   */
  details(id) {
    return new Promise((resolve, reject) => {
      request(this._apiConfigs)
        .get(`/messaging/logs/details/${id}`)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }
}

module.exports = Logs;
