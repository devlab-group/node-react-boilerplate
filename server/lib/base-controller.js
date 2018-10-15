/**
 * BaseController.
 *
 * The base class for controllers
 */
class BaseController {
  constructor(app, options) {
    this.options = options
    this.app = app
  }

  /**
   * Getter to the App registered services (aka api)
   */
  get api() {
    return this.app.api
  }
};

module.exports = BaseController
