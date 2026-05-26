import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const distRoot = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    '../node_modules/@react95/core/dist'
);

/** Turbopack/Lightning CSS chokes on url('data:...width='7'...'). */
function patchSvgDataUrls(css) {
    return css.replace(
        /url\('(data:image\/svg\+xml,[\s\S]*?)'\)/g,
        (_, data) => `url("${data.replace(/'/g, '%27')}")`
    );
}

function patchDir(dir) {
    if (!fs.existsSync(dir)) {
        return;
    }

    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            patchDir(fullPath);
            continue;
        }

        if (!entry.name.endsWith('.vanilla.css')) {
            continue;
        }

        const original = fs.readFileSync(fullPath, 'utf8');
        const patched = patchSvgDataUrls(original);

        if (patched !== original) {
            fs.writeFileSync(fullPath, patched);
            console.log(`[patch-react95-css] ${path.relative(distRoot, fullPath)}`);
        }
    }
}

patchDir(path.join(distRoot, 'esm'));
patchDir(path.join(distRoot, 'cjs'));
