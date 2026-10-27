#!/usr/bin/env node
/**
 * check-topic-drift.mjs — fails when the three lists that define "which
 * topics exist" disagree in a way nobody has explained (issue #233).
 *
 * A topic is declared in three hand-maintained places:
 *   1. modeMap   — client/src/App.jsx, the screen each mode key opens
 *   2. tiles     — client/src/features/tiles.js, what the home screen shows
 *   3. server    — server/index.js, the '/<key>-api' routes (app.use mounts
 *                  and direct app.get/app.post routes)
 *
 * Checks:
 *   A. every modeMap key has a tile, or an allowlisted reason it does not
 *   B. every tile opens a modeMap key (never allowlisted: a tile to nowhere
 *      is always a bug)
 *   C. every modeMap key has a server mount (directly or via an alias), or
 *      is allowlisted as client-only
 *   D. every server mount is used by a modeMap key (directly or via an
 *      alias), or is allowlisted as server-only
 *
 * Deliberate exceptions live in scripts/topic-drift-allowlist.json, one
 * line of reason each. An allowlist entry that is no longer needed (say a
 * tile was added for it) is reported as a warning, not a failure, so a
 * correct PR elsewhere never turns this check red.
 *
 * A guard that silently checks less is worse than none, so each reader
 * fails loudly instead of guessing: modeMap is read by matching braces, and
 * any key-looking line it could not parse is an error; any server route
 * whose '-api' path is not a plain string literal is an error; and tiles.js
 * must stay importable with no installed dependencies.
 *
 * Usage:  node scripts/check-topic-drift.mjs [--root <repo dir>]
 * No dependencies: Node built-ins only, so CI needs no npm install.
 */

import { readFileSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const rootArg = process.argv.indexOf('--root');
const ROOT = rootArg > -1 ? resolve(process.argv[rootArg + 1]) : resolve(here, '..');

const read = (p) => readFileSync(join(ROOT, p), 'utf8');

/* ── 1. modeMap keys, parsed from App.jsx ─────────────────────────────── */

// Blank out comments, and unless keepStrings is set the punctuation inside
// strings too (keeping newlines, quotes and word characters), so braces in
// them cannot end a block early and commented-out routes are not counted.
function maskCode(src, { keepStrings = false } = {}) {
  let out = '';
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    const n = src[i + 1];
    if (c === '/' && n === '/') {
      while (i < src.length && src[i] !== '\n') { out += ' '; i++; }
      out += src[i] ?? '';
    } else if (c === '/' && n === '*') {
      out += '  '; i += 2;
      while (i < src.length && !(src[i] === '*' && src[i + 1] === '/')) { out += src[i] === '\n' ? '\n' : ' '; i++; }
      out += '  '; i++;
    } else if (c === "'" || c === '"' || c === '`') {
      out += c; i++;
      while (i < src.length && src[i] !== c) {
        if (src[i] === '\\') { out += '  '; i += 2; continue; }
        out += keepStrings || src[i] === '\n' || /[\w-]/.test(src[i]) ? src[i] : ' ';
        i++;
      }
      out += src[i] ?? '';
    } else {
      out += c;
    }
  }
  return out;
}

function readModeMap() {
  const src = read('client/src/App.jsx');
  const masked = maskCode(src);
  const open = masked.search(/const modeMap = \{/);
  if (open < 0) throw new Error('Could not find `const modeMap = {` in client/src/App.jsx');
  // Walk to the brace that closes `const modeMap = {`, tracking depth.
  const body0 = masked.indexOf('{', open) + 1;
  let depth = 1;
  let end = body0;
  for (; end < masked.length && depth > 0; end++) {
    if (masked[end] === '{') depth++;
    else if (masked[end] === '}') depth--;
  }
  if (depth !== 0) throw new Error('modeMap in client/src/App.jsx has no closing brace');
  const block = masked.slice(body0, end - 1);

  // Keys are the `key:` at the start of an entry at depth 0 of the block.
  const keys = new Set();
  const keyRe = /(?:^|[,{\n])\s*(?:'([\w-]+)'|"([\w-]+)"|([A-Za-z_$][\w$]*))\s*:/y;
  let d = 0;
  for (let k = 0; k < block.length; k++) {
    const c = block[k];
    if (c === '{' || c === '(' || c === '[') d++;
    else if (c === '}' || c === ')' || c === ']') d--;
    if (d === 0 && (k === 0 || c === ',' || c === '\n')) {
      keyRe.lastIndex = k === 0 ? 0 : k;
      const m = keyRe.exec(block);
      if (m) keys.add(m[1] || m[2] || m[3]);
    }
  }
  if (keys.size === 0) throw new Error('modeMap parsed as empty; has its format changed?');

  // Fail loudly if a line inside the block looks like an entry we did not read.
  const looksLikeKey = [...block.matchAll(/^\s*(?:'([\w-]+)'|"([\w-]+)"|([A-Za-z_$][\w$]*))\s*:/gm)].map((m) => m[1] || m[2] || m[3]);
  const missed = looksLikeKey.filter((k) => !keys.has(k));
  if (missed.length) {
    throw new Error(`modeMap: ${missed.length} key-looking line(s) were not parsed (${missed.join(', ')}); the parser no longer matches App.jsx, so the check would silently cover less.`);
  }
  return keys;
}

/* ── 2. tile keys, imported from tiles.js (pure data) ─────────────────── */

async function readTiles() {
  // CI imports tiles.js with no npm install, which only works while it is
  // plain ESM data. Say so clearly instead of failing on a missing module.
  const pkg = JSON.parse(read('client/package.json'));
  if (pkg.type !== 'module') {
    throw new Error('client/package.json no longer has "type": "module", so tiles.js cannot be imported directly; update readTiles() in scripts/check-topic-drift.mjs.');
  }
  const imports = read('client/src/features/tiles.js').match(/^\s*import\s.+$/gm);
  if (imports) {
    throw new Error(`client/src/features/tiles.js now imports other modules (${imports[0].trim()}), which the drift check cannot load without installing dependencies; keep it pure data or update readTiles().`);
  }
  const mod = await import(pathToFileURL(join(ROOT, 'client/src/features/tiles.js')).href);
  const entries = [
    ...(mod.TILES || []),
    ...(mod.FEATURED_TILES || []),
    mod.MATH_LAB_ENTRY,
    mod.GEOCRAFT_ENTRY,
  ].filter(Boolean);
  return new Set(entries.map((t) => t.key));
}

/* ── 3. server mounts, parsed from index.js ───────────────────────────── */

function readServerMounts() {
  const src = maskCode(read('server/index.js'), { keepStrings: true });
  const prefixes = new Set();
  const unreadable = [];
  // Every app.use/get/post/... call whose first argument mentions -api.
  for (const m of src.matchAll(/app\.(use|get|post|put|patch|delete|all)\(\s*([^,)]*)/g)) {
    const arg = m[2].trim();
    if (!/-api\b/.test(arg)) continue;
    const lit = /^(['"])\/([\w-]+)-api(?:\/[\w/-]*)?\1$/.exec(arg);
    if (lit) prefixes.add(lit[2]);
    else unreadable.push(`app.${m[1]}(${arg}`);
  }
  if (unreadable.length) {
    throw new Error(`server/index.js: ${unreadable.length} -api route(s) use a path that is not a plain string (${unreadable.slice(0, 3).join('; ')}), so the check cannot tell which prefix they serve.`);
  }
  if (prefixes.size === 0) throw new Error('No -api routes found in server/index.js; has its format changed?');
  return prefixes;
}

/* ── compare ──────────────────────────────────────────────────────────── */

const allow = JSON.parse(read('scripts/topic-drift-allowlist.json'));
const section = (name) => allow[name] || {};
const aliases = section('aliases');        // modeMap key -> server prefix
const noTile = section('noTile');          // modeMap key reachable another way
const clientOnly = section('clientOnly');  // modeMap key with no server route
const serverOnly = section('serverOnly');  // server prefix with no modeMap key

const modes = readModeMap();
const tiles = await readTiles();
const server = readServerMounts();
const serverFor = (key) => aliases[key] || key;
const usedPrefixes = new Set([...modes].map(serverFor));

const errors = [];
const warnings = [];
const sorted = (xs) => [...xs].sort();

// A. modes without a tile
for (const k of sorted(modes)) {
  if (!tiles.has(k) && !noTile[k]) {
    errors.push(`A  "${k}" is in modeMap but has no home tile. Add a tile in client/src/features/tiles.js, or add it to "noTile" in the allowlist with the way students reach it.`);
  }
}
// B. tiles without a mode
for (const k of sorted(tiles)) {
  if (!modes.has(k)) {
    errors.push(`B  tile "${k}" opens nothing: there is no "${k}" key in modeMap (client/src/App.jsx).`);
  }
}
// C. modes without a server route
for (const k of sorted(modes)) {
  if (!server.has(serverFor(k)) && !clientOnly[k]) {
    errors.push(`C  "${k}" is in modeMap but no server route "/${serverFor(k)}-api" is mounted in server/index.js. Mount one, or add it to "clientOnly" (or "aliases") in the allowlist.`);
  }
}
// D. server routes nothing uses
for (const p of sorted(server)) {
  if (!usedPrefixes.has(p) && !serverOnly[p]) {
    errors.push(`D  server mounts "/${p}-api" but no modeMap key uses it. Add the screen, remove the route, or add it to "serverOnly" in the allowlist.`);
  }
}

// Stale or unknown allowlist entries: warn only.
const stale = (name, keys, stillNeeded) => {
  for (const k of Object.keys(keys)) {
    if (!stillNeeded(k)) warnings.push(`"${k}" in "${name}" is no longer needed and can be removed from the allowlist.`);
  }
};
stale('noTile', noTile, (k) => modes.has(k) && !tiles.has(k));
stale('clientOnly', clientOnly, (k) => modes.has(k) && !server.has(serverFor(k)));
stale('serverOnly', serverOnly, (p) => server.has(p) && !usedPrefixes.has(p));
for (const [k, target] of Object.entries(aliases)) {
  if (!server.has(target)) warnings.push(`alias "${k}" -> "${target}" points nowhere: server/index.js has no "/${target}-api" route.`);
  else if (!modes.has(k) || server.has(k)) warnings.push(`"${k}" in "aliases" is no longer needed and can be removed from the allowlist.`);
}

/* ── report ───────────────────────────────────────────────────────────── */

const both = [...modes].filter((k) => tiles.has(k) && server.has(serverFor(k))).length;
console.log(`Topic drift check: ${modes.size} modeMap keys, ${tiles.size} tiles, ${server.size} server routes; ${both} appear in all three.`);
console.log(`Allowlisted: ${Object.keys(noTile).length} without a tile, ${Object.keys(clientOnly).length} client-only, ${Object.keys(serverOnly).length} server-only, ${Object.keys(aliases).length} aliases.`);

if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  warnings.forEach((w) => console.log(`  ⚠ ${w}`));
}
if (errors.length) {
  console.error(`\n${errors.length} unexplained mismatch(es):`);
  errors.forEach((e) => console.error(`  ✗ ${e}`));
  console.error('\nSee scripts/topic-drift-allowlist.json for deliberate exceptions (issue #233).');
  process.exit(1);
}
console.log('\n✓ No unexplained drift.');
