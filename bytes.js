const { Rand } = require('./main.js');
const r = new Rand(256);

// For use by the ent program.
function writeBytes(n) {
  const b = Buffer.alloc(n);
  for (let i = 0; i < n; i++) {
    b[i] = r.gen();
  }
  process.stdout.write(b);
}

// Write 1 MiB, wait half a sec, repeat.
function writeAndWait() {
  writeBytes(1048576);
  setTimeout(writeAndWait, 100);
}
writeAndWait();
