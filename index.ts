import type { Awaitable } from "vitest";

interface HandleFn<T> {
  (ctx: T, next: () => Awaitable<void>): Awaitable<void>;
}

export class ResChain<T> {
  
  /**
   * 按顺序存放链的key
   */
  keyOrder: string[] = [];
  key2FnMap: Map<string, any> = new Map();

  constructor(public ctx: T = {} as T) {}

  add(key: string, callback: HandleFn<T>) {
    if (this.key2FnMap.has(key)) {
      throw new Error(`Chain ${key} already exists`);
    }

    this.keyOrder.push(key);
    this.key2FnMap.set(key, callback);
    return this;
  }

  async run() {
    let index = -1;
    const dispatch = (i: number): Awaitable<void> => {
      if (i <= index) {
        return Promise.reject(new Error('next() called multiple times'));
      }

      index = i;
      const fn = this.key2FnMap.get(this.keyOrder[i]);
      if (!fn) {
        return Promise.resolve(void 0);
      }

      return fn(this.ctx, dispatch.bind(null, i + 1));
    };

    await dispatch(0);
  }
}
