'use strict';

const http = require('http');
const https = require('https');
const utils = require('./utils');

const { basePath } = utils;
const DEFAULT_PROTOCOL = 'https';
const DEFAULT_HOST = 'api.echanga.com';
const DEFAULT_BASE_PATH = '/v1/';
const DEFAULT_API_VERSION = null;
const DEFAULT_TIMEOUT = 60000;
const Templates = require('./templates/index');
const SMS = require('./sms/index');
const Events = require('./events/index');

let requestConfigs = {};

const ALLOWED_DEFAULT_OPTIONS = ['timeout', 'httpAgent', 'host', 'keepAlive'];

/**
 * Get version from package.json if not set
 */
Echanga.PACKAGE_VERSION = require('../package').version;

Echanga.prototype = {
  _parseConfig(config) {
    let parsedConfigs = {};
    const isObject = typeof config === 'object';
    if (config === null || config === undefined) return {};
    if (isObject) {
      const values = Object.keys(config).filter((key) => {
        return !ALLOWED_DEFAULT_OPTIONS.includes(key);
      });
      if (values.length > 0) {
        return new Error(`Option may contain fields that's not allowed`);
      } else {
        parsedConfigs = config;
      }
    }
    return parsedConfigs;
  },
  _setAPI(apiConfigs) {
    requestConfigs = apiConfigs;
  },

  /**
   * SMS Module
   */
  messaging() {
    return new SMS(requestConfigs);
  },
  /**
   * Template module
   */
  templates() {
    return new Templates(requestConfigs);
  },
  /**
   * Event module
   */
  events() {
    return new Events(requestConfigs);
  },
};

/**
 * Constructor configuration for the Echanga sms service
 * @param key {String}
 * @param config {Object}
 * @constructor
 */
function Echanga(key, config = {}) {
  // check the config and then create an instance if not created
  if (!(this instanceof Echanga)) {
    return new Echanga(key, config);
  }

  const props = this._parseConfig(config);
  this._api = {
    baseURL:
      props.host || basePath(DEFAULT_PROTOCOL, DEFAULT_HOST, DEFAULT_BASE_PATH),
    timeout: props.timeout || DEFAULT_TIMEOUT,
    headers: {
      'ech-api-key': key,
    },
    httpAgent: new http.Agent({ keepAlive: props.keepAlive || true }),
    httpsAgent: new https.Agent({ keepAlive: props.keepAlive || true }),
  };
  this._setAPI(this._api);
}

module.exports.Echanga = Echanga;
module.exports = Echanga;
