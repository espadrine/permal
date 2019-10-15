const { Rand } = require('./main.js');

// For use by the ent program.
function writeBytes(n) {
  const r = new Rand(0, 256);
  for (let i = 0; i < n; i++) {
    process.stdout.write(Buffer.from([r.gen()]));
  }
}
writeBytes(256000);
