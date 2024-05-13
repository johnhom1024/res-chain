# &#128640; res-chain

![alt text](logo.png)

责任链工具。

基于`Koa`洋葱模型实现。可用于业务中多重判断传递的解决方案。支持异步和同步。

## 解决的问题

当遇到一大坨的if-else判断时，我们可以考虑使用责任链模式来解决。

## 使用方式

与`Koa`的中间件调用方式类似。

### &#128260; 同步模式下：

```js
import { ResChain } from 'res-chain';

const resChain = new ResChain();

resChain.add('key1', (_, next) => {
  console.log('key1');
  next();
});


resChain.add('key2', (_, next) => {
  console.log('key2');
  // 这里没有调用next，则不会执行key3
});

resChain.add('key3', (_, next) => {
  console.log('key3');
  next();
});

// 执行职责链
resChain.run(); // => 将会按顺序输出 key1 key2
```

### &#9203; 异步模式下：

```js
import { ResChain } from 'res-chain';

const resChain = new ResChain();

resChain.add('async1', async (_, next) => {
  console.log('async1');
  await next();
});


resChain.add('async2', async (_, next) => {
  console.log('async2')
  // 这里可以执行一些异步处理函数
  await new Promise((resolve, reject) => {
    setTimeOut(() => {
      resolve();
    }, 1000)
  });

  await next();
});


resChain.add('key3', async (_, next) => {
  console.log('key3');
  await next();
});


// 执行责任链
await resChain.run();

console.log('finished');

// 先输出 async1 async2 然后停顿了1秒钟之后，才输出async3 finished
```

> &#128679; 需要注意：如果是异步模式，则链上的每个回调函数必须要 await next()，因为next函数代表下一个环的异步函数。
