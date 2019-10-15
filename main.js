const util = require('util');

class Rand {
  constructor(key = 0, size = 10) {
    this.size = size;
    // Start with a trivial circular permutation
    this.pools = [[], []];
    this.pools.forEach((pool, p) => {
      for (let i = 0; i < size; i++) {
        pool[i] = (i + p + 1) % size;
      }
    });
    this.i = key;
  }
  verify(pool) {
    let n = 1;
    for (let i = pool[0]; i !== 0; i = pool[i]) {
      n++;
    }
    return n === this.size;
  }
  gen() {
    this.switchPermutation(this.pools[0], this.pools[1][this.i]);
    this.switchPermutation(this.pools[1], this.pools[0][this.i]);
    this.i = (this.i + 1) % this.size;
    const next = this.pools[0][this.pools[1][this.i]];
    return next;
  }
  // Reorder, but keep a circular permutation.
  switchPermutation(pool, i) {
    // Assuming a < b < c < d < e < f < g < h:
    // a → b    c → d
    // e → f    g → h
    const a = pool[i];
    const c = pool[a];
    const e = pool[c];
    const g = pool[e];
    this.switch(pool, a, e);
    this.switch(pool, c, g);
    // a → f    c → h
    // e → b    g → d
  }
  switch(pool, a, e) {
    // a → b = pool[a]
    // e → f = pool[e]
    [pool[a], pool[e]] = [pool[e], pool[a]];
    // a → f
    // e → b
  }
  toString() {
    return this.pools.map(pool => pool.map(i => String(i)).join(' ')).join('; ');
  }
  [util.inspect.custom]() { return `Rand {${this.toString()}} [${this.i}]`; }
}

exports.Rand = Rand;
