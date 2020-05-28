const request = require('../request');

class Scheduling {
  constructor(apiConfigs) {
    this._apiConfigs = apiConfigs;
  }

  /**
   * method for getting list of all scheduled events
   * @returns {Promise<{}>}
   */
  list() {
    return new Promise((resolve, reject) => {
      request(this._apiConfigs)
        .get(`/external/event/manager/list`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => reject(error));
    });
  }

  /**
   * Method for scheduling events to be executed at a later time
   * @param data {Object}
   * @returns {Promise<{}>}
   */
  create(data) {
    return new Promise((resolve, reject) => {
      request(this._apiConfigs)
        .post(`/external/event/manager/create`, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Method for cancelling a scheduled events
   * @param id {Number}
   * @param data {Object}
   */
  cancel(id, data) {
  }
}

module.exports = Scheduling;
