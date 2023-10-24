# node-red-contrib-puppeteer-js
运行JavaScript代码并返回结果


input
```js
{
  url: 'https://www.npmjs.com',
  payload: `
    const sleep = (s) => new Promise((resolve) => setTimeout(resolve, s * 1000));
    await sleep(2)
    return 123  
  `
}

```

```js
'data:image/png;base64,' + msg.screenshot
```

## 相关文档

- https://pptr.dev