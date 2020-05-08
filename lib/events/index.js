const Types = require('./types');
const Periods = require('./periods');
const Scheduling = require('./scheduling');
class Events {
  constructor(apiConfigs) {
    this._apiConfigs = apiConfigs;
  }

  /**
   * Event types CRUD operations here
   * @returns {Types}
   */
  types() {
    return new Types(this._apiConfigs);
  }

  /**
   * Event periods operations here
   * @returns {Periods}
   */
  periods() {
    return new Periods(this._apiConfigs);
  }

  /**
   * Scheduling of events operations here
   * @returns {Scheduling}
   */
  scheduling() {
    return new Scheduling(this._apiConfigs);
  }
}

module.exports = Events;
