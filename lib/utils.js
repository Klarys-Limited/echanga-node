'use strict';

const utils = (module.exports = {
  /**
   * https://stackoverflow.com/a/2117523
   */
  uuid4: () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  },
  /**
   * Parse and merge protocol and the base url for the request
   * @param protocol {String}
   * @param baseUrl {String}
   * @param basePath {String}
   */
  basePath: (protocol, baseUrl, basePath) => {
    return `${protocol}://${baseUrl}${basePath}`;
  },

});
