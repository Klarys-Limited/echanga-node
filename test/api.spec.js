const expect = require('chai').expect;
const nock = require('nock');
const Echanga = require('../lib/echanga');

const sms = Echanga(
  'cjGebhwu7qNbpN7DAMtBf90CXW90zanx/bSnMXSR/wxsd6lMRO5oP5YfJrauvRWprkZo/3Uk57QDrvnBKueSuQH46q5OTA5tCS1ZsLSILr' +
    'f+Abdky8R9nt7cb0q3BAUmzUbMjKJXQUT+q7vfobui0OXhZrsVt8xNnJTKel29AbD5o4bu8LDvLlcSYXUz0CfjotsHGazoIOcR9b74lqtwwutUPEw+fH8pBYYVQvTvNKqJDQWmcrU0nc2yUiAMcaJk0wWVlroBg8WJlb5gCFtMlAFD22PuZrDN/59pkXaAFR4='
);
const mockApi = nock('https://api.echanga.com/v1/', {
  'ech-api-key':
    'cjGebhwu7qNbpN7DAMtBf90CXW90zanx/bSnMXSR/wxsd6lMRO5oP5YfJrauvRWprkZo/3Uk57QDrvnBKueSuQH46q5OTA5tCS1ZsLSILr' +
    'f+Abdky8R9nt7cb0q3BAUmzUbMjKJXQUT+q7vfobui0OXhZrsVt8xNnJTKel29AbD5o4bu8LDvLlcSYXUz0CfjotsHGazoIOcR9b74lqtwwutUPEw+fH8pBYYVQvTvNKqJDQWmcrU0nc2yUiAMcaJk0wWVlroBg8WJlb5gCFtMlAFD22PuZrDN/59pkXaAFR4=',
});
describe('Testing the Echanga template module', function () {
  it('should list all templates', function (done) {
    mockApi.get(`/external/templates`).reply(200, [
      {
        id: 2,
        name: 'Test',
        mytemplates: 'This is my template',
      },
      {
        id: 1,
        name: 'From Library 2',
        mytemplates: 'it is created by the node js library',
      },
    ]);
    sms.templates().list().then(response => {
      expect(response.data).to.be.a("array")
    })
    done();
  });

  it('should create a new template', function (done) {
    mockApi
      .post(`/external/templates`, {
        name: 'Test',
        mytemplates: 'this is my sample template',
      })
      .reply(200, {
        name: 'Test',
        mytemplates: 'this is my sample template',
      });
    done();
  });

  it('should update a created template using id', function (done) {
    mockApi
      .put(`/external/templates/1`, {
        name: 'From Library 2',
        mytemplates: 'it is created by the node js library',
      })
      .reply(200, {
        name: 'From Library 2',
        mytemplates: 'it is created by the node js library',
      });
    done();
  });

  it('should find the details of a template', function (done) {
    mockApi.get(`/external/templates/1`).reply(200, {
      id: 1,
      name: 'From Library 2',
      mytemplates: 'it is created by the node js library',
    });
    done();
  });
});

describe('Testing the Echanga sms module', function () {
  it('should send an sms using the quick method', function (done) {
    mockApi
      .post(`/external/messaging/quick`, {
        type: '0',
        message:
          'A quick message to see how good my calculation is. I am here on a test pilot',
        destination: '233200746417',
        sentby: 'KlarysLtd',
      })
      .reply(200, {
        type: '0',
        message:
          'A quick message to see how good my calculation is. I am here on a test pilot',
        destination: '233200746417',
        sentby: 'KlarysLtd',
      });
    done();
  });

  it('should send sms using the stored contacts', function (done) {
    mockApi
      .post(`/external/messaging/contacts`, {
        type: '0',
        message:
          'A quick message to see how good my calculation is. I am here on a test pilot',
        message_contacts: [
          { firstname: 'Jane', lastname: 'Doe', phone: '233200746417' },
        ],
        sentby: 'KlarysLtd',
      })
      .reply(200, {
        id: 1,
        type: '0',
        message:
          'A quick message to see how good my calculation is. I am here on a test pilot',
        message_contacts: [
          { firstname: 'Jane', lastname: 'Doe', phone: '233200746417' },
        ],
        sentby: 'KlarysLtd',
      });
    done();
  });
});

describe('Testing the Echanga events type module', function () {
  it('should list all the types of an event created by the user', function (done) {
    mockApi.get(`/external/events/my/list`).reply(200, [
      {
        id: 1,
        event: 'telles',
        description: 'et wth wth',
      },
    ]);
    done();
  });
});

describe('Testing the Echanga event periods module', function () {
  it('should list all event period associated with the action', function (done) {
    mockApi.get(`/external/event/period/list`).reply(200, [
      {
        event_period: 'wrfw4fg',
        event_description: 'wfwgwe e qe eqgweg eg wfw',
      },
    ]);
    done();
  });
});
