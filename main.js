const util = require('util');

class Rand {
  constructor(size = 10) {
    this.size = size;
    // Start with a trivial circular permutation
    this.perm = [];
    this.rand = [];
    for (let i = 0; i < size; i++) {
      this.perm[i] = this.rand[i] = i;
    }
    this.i = 0;
  }
  gen() {
    // Constraint: a perm must contain all possibilities, so that picking one at
    // random gives an equiprobable result in the chosen alphabet.
    // Constraint: must switch this number with a random slot.
    const a0 = this.i;
    const a1 = this.rand[this.i];
    [this.perm[a0], this.perm[a1]] = [this.perm[a1], this.perm[a0]];
    const next = this.perm[this.i];
    this.rand[this.i] = (next + a1) % this.size;
    this.i = (this.i + 1) % this.size;
    return next;
  }
  toString() {
    return [this.perm, this.rand].map(list => list.map(i => String(i)).join(' ')).join('; ');
  }
  [util.inspect.custom]() { return `Rand {${this.toString()}} [${this.i}]`; }
}

exports.Rand = Rand;
