const request = require('../request');
class Templates {
  constructor(apiConfigs) {
    this._apiConfigs = apiConfigs;
  }

  /**
   * Method for getting list of created templates
   */
  list() {
    return new Promise((resolve, reject) => {
      request(this._apiConfigs)
        .get(`/external/templates`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Method for getting a single template
   * @param id
   */
  find(id) {
    return new Promise((resolve, reject) => {
      request(this._apiConfigs)
        .get(`/external/templates/find/${id}`)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }
  /**
   * Method for creating template
   */
  create(data) {
    return new Promise((resolve, reject) => {
      request(this._apiConfigs)
        .post(`/external/templates`, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Method for updating a template
   * @param id
   * @param data
   * @returns Promise<Object>
   */
  update(id, data) {
    return new Promise((resolve, reject) => {
      request(this._apiConfigs)
        .put(`/external/templates/${id}`, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  /**
   * Method for deleting a  template
   */
  delete(id) {
    return new Promise((resolve, reject) => {
      request(this._apiConfigs)
        .delete(`/external/templates/${id}`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

module.exports = Templates;
