const request = require('../request');
const { excelParser } = require('../utils');
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

  /**
   * Request method for sending csv/excel sms messages
   * @param data {Object}
   */
  excel(data) {
    let req = {
      sentby: data.sentby,
      type: data.type,
      message: data.message,
    };
    if (data.hasOwnProperty('file')) {
      let message_contacts = [];
      excelParser(data.file, function (contact) {
        let obj = {
          firstname: contact.firstname,
          lastname: contact.lastname,
          phone: `233${contact.phone.toString().slice(-9)}`,
        };
        message_contacts.push({ ...obj });
      });
      req.message_contacts = message_contacts;
    } else if (data.hasOwnProperty('message_contacts')) {
      req.message_contacts = data.message_contacts;
    }
    return new Promise((resolve, reject) => {
      request(this._apiConfigs)
        .post(`/external/messaging/csv`, req)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }
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
