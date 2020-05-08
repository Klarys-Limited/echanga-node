const axios = require('axios');
module.exports = (config) => {
  return axios.create(config);
};
