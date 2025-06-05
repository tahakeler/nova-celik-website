const fs = require('fs');

const dirs = ['public/svgs', 'public/excel'];
let missing = false;

for (const dir of dirs) {
  if (!fs.existsSync(dir) || fs.readdirSync(dir).length === 0) {
    console.error(`[ASSET ERROR] Missing or empty directory: ${dir}`);
    missing = true;
  }
}

if (missing) {
  process.exit(1);
}
