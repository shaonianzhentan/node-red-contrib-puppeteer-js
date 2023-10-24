const Browser = require('../browser')

module.exports = function (RED) {
  RED.nodes.registerType('puppeteer-js', function (config) {
    RED.nodes.createNode(this, config);

    this.browser = new Browser(
      Object.assign({
        executablePath: config.path
      }, config.config ? JSON.parse(config.config) : {})
    )
  })
}