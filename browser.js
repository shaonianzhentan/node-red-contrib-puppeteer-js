const puppeteer = require('puppeteer-core');

module.exports = class {

  constructor(config) {
    this.timer = null
    this.config = {
      headless: 'new',
      defaultViewport: { width: 1920, height: 1080 },
      args: ['--start-maximized', '--no-sandbox'],
      ...config
    }
  }

  async launch() {
    this.browser = await puppeteer.launch(this.config);
  }

  async evaluate(url, js, isScreenshot = false) {
    if (!this.browser) {
      await this.launch()
    }
    if (this.timer) clearTimeout(this.timer)

    this.timer = setTimeout(async () => {
      await this.browser.close()
      this.browser = null
    }, 60000)

    const page = await this.browser.newPage();
    // 返回结果
    const response = {
      url,
      payload: null,
      error: null,
      screenshot: null
    }
    try {
      await page.goto(url);
      response.payload = await page.evaluate(async (js) => {
        eval(`window.PUPPETEER_ASYNC_FUNCTION = async () => { ${js} }`)
        return await window.PUPPETEER_ASYNC_FUNCTION()
      }, js);
      // 截图
      if (isScreenshot) {
        response.screenshot = await page.screenshot({
          fullPage: true,
          encoding: 'base64'
        });
      }
    } catch (ex) {
      response.error = ex
    } finally {
      await page.close()
    }
    return response
  }
}