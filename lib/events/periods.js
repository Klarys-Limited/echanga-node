const request = require('../request');
class Periods {
  constructor(apiConfigs) {
    this._apiConfigs = apiConfigs;
  }

  /**
   * Method for getting list of event period, it been a daily or one time event
   * @returns {Promise<{}>}
   */
  list() {
    return new Promise((resolve, reject) => {
      request(this._apiConfigs)
        .get(`/external/event/period/list`)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }
}

module.exports = Periods;
