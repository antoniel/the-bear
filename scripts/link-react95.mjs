import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const coreRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '../node_modules/@react95/core');

for (const name of ['esm', 'cjs', 'types']) {
    const linkPath = path.join(coreRoot, name);
    const target = path.join('dist', name);

    if (!fs.existsSync(path.join(coreRoot, target))) {
        console.warn(`[link-react95] skip ${name}: dist folder missing`);
        continue;
    }

    if (fs.existsSync(linkPath)) {
        continue;
    }

    fs.symlinkSync(target, linkPath, 'dir');
    console.log(`[link-react95] ${name} -> ${target}`);
}
