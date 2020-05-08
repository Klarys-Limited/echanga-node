module.exports = {
  create: () => 'external/templates',
  list: () => 'external/templates',
  find: (id) => {
    return {
      url: `external/templates/find/${id}`,
      method: 'GET',
    };
  },
  update: (id) => {
    return {
      url: `external/templates/${id}`,
      method: 'PUT',
    };
  },
};
