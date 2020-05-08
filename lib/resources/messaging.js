module.exports = {
  quick: (data) => {
    return {
      url: `external/messaging/quick`,
      method: 'POST',
      data: data,
    };
  },
};
