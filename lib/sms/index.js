const request = require('../request');
class SMS {
  constructor(apiConfigs) {
    this._apiConfigs = apiConfigs;
  }

  /**
   * Request method for sending quick sms message
   * @param data
   * @returns {Promise<Object>}
   */
  quick(data) {
    return new Promise((resolve, reject) => {
      request(this._apiConfigs)
        .post(`/external/messaging/quick`, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  csv() {}
  /**
   * Request method for sending sms messaging using stored contacts
   * @param data {Object}
   * @returns {Promise<Object>}
   */
  contacts(data) {
    return new Promise((resolve, reject) => {
      request(this._apiConfigs)
        .post(`/external/messaging/contact`, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => reject(error));
    });
  }
}

module.exports = SMS;
