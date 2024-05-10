
import { test, expect } from 'vitest';
import { ResChain } from '..';

test('hello', async () => {
  const resChain = new ResChain();

  resChain.add('key1', async (ctx: any, next: any) => {
    console.log('key1 called');
    await next();
    console.log('key1 end');
  })

  resChain.add('key2', async(ctx: any, next: any) => {
    console.log('key2 called');
    await new Promise(resolve => {
      setTimeout(() => {
        resolve(void 0);
      }, 1000);
    })
    await next();
    console.log('key2 end');
  });

  resChain.add('key3', async (ctx: any, next: any) => {
    console.log('key3 called');
    await new Promise(resolve => {
      setTimeout(() => {
        resolve(void 0);
      }, 2000);
    })
    await next();
  });

  resChain.add('key4', (ctx: any, next: any) => {
    console.log('key4 called');
    next();
    console.log('key4 end');
  });

  await resChain.run();
  console.log('end');

  expect(true).toBe(true);
});
