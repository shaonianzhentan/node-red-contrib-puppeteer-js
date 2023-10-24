module.exports = function (RED) {

  RED.nodes.registerType("eval-js", function (config) {
    RED.nodes.createNode(this, config);

    const puppeteer = RED.nodes.getNode(config.puppeteer);

    const node = this;
    node.on('input', async function (msg) {
      let url = config.url
      let js = config.js
      // 使用配置项
      if (!url) url = msg.url
      if (!js) js = msg.payload

      if (url && js) {
        this.status({ fill: "blue", shape: "ring", text: "正在执行代码" });
        const response = await puppeteer.browser.evaluate(url, js, config.screenshot)
        // 出现异常
        if (response.error) {
          this.status({ fill: "red", shape: "ring", text: response.error });
        } else {
          this.status({ fill: "green", shape: "ring", text: "执行成功返回结果" });
        }
        node.send(response);
      } else {
        this.status({ fill: "red", shape: "ring", text: "缺少必要参数" });
      }
    });
  });
}