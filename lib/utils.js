'use strict';
const xlsx = require('xlsx');
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

  /**
   * Parse excel and csv files
   * @param filename {String}
   * @param sheet {String}
   * @param callback {Function}
   */
  excelParser: (filename, callback, sheet = 'Sheet1') => {
    let workbook = xlsx.readFile(filename);
    let sheetNames = workbook.SheetNames;

    function getNumber() {
      return sheetNames.indexOf(sheet) > -1 ? sheetNames.indexOf(sheet) : 0;
    }

    let worksheet = workbook.Sheets[sheetNames[getNumber()]];
    let data = xlsx.utils.sheet_to_json(worksheet);
    for (let i = 0; i < data.length; i++) {
      callback(data[i]);
    }
  },
});
