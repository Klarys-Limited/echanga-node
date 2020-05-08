const request = require('../request');
class Types {
  constructor(apiConfigs) {
    this._apiConfigs = apiConfigs;
  }

  /**
   * Method for getting list of all created event types
   * @returns {Promise<{}>}
   */
  list() {
    return new Promise((resolve, reject) => {
      request(this._apiConfigs)
        .get(`/external/events/my/list`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Method for finding the details of an event type
   * @param id {Number}
   * @returns {Promise<{}>}
   */
  find(id) {
    return new Promise((resolve, reject) => {
      request(this._apiConfigs)
        .get(`/external/events/my/find/${id}`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => reject(error));
    });
  }

  /**
   * Method for creating an event type
   * @param data {Object}
   * @returns {Promise<{}>}
   */
  create(data) {
    return new Promise((resolve, reject) => {
      request(this._apiConfigs)
        .post(`/external/events/my/create`, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => reject(error));
    });
  }

  /**
   * Method for updating an event type
   * @param id {Number}
   * @param data {Object}
   * @returns {Promise<{}>}
   */
  update(id, data) {
    return new Promise((resolve, reject) => {
      request(this._apiConfigs)
        .put(`/external/events/my/${id}`, data)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  /**
   * Method for deleting an event type
   * @param id {Number}
   * @returns {Promise<{}>}
   */
  delete(id) {
    return new Promise((resolve, reject) => {
      request(this._apiConfigs)
        .delete(`/external/events/my/${id}`)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }
}

module.exports = Types;
