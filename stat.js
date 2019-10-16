const { Rand } = require('./main.js');
const { pochisq } = require('./chiCalc.js');

function chiSquareTest(param = {size: 256, runs: 256000}) {
  const size = param.size || 256;
  const r = new Rand(size);
  const stats = new Array(size).fill(0);
  const runs = param.runs || 1000 * size;
  for (let i = 0; i < runs; i++) {
    const next = r.gen();
    process.stdout.write(String(next) + ' ');
    //console.log(next, r);
    stats[next]++;
  }
  //console.log();
  let chi2 = 0;
  for (let i = 0; i < size; i++) {
    //console.log(`#${i}: ${stats[i]}`);
    const expected = runs / size;
    const observed = stats[i];
    const diff = expected - observed;
    chi2 += diff * diff / expected;
  }
  console.log(r);
  console.log(`χ² = ${chi2.toFixed(2)} (Q = ${pochisq(chi2, size).toFixed(4)})`);
}

chiSquareTest({size: 10, runs: 100});
