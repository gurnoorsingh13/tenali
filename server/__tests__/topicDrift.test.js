'use strict';
// scripts/check-topic-drift.mjs (issue #233) compares modeMap, the home
// tiles and the server's /<key>-api mounts. These tests run it against a
// temporary copy of those files, change one thing, and check it reacts:
// that is the issue's verification list, automated.

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const REPO = path.resolve(__dirname, '../..');
const SCRIPT = path.join(REPO, 'scripts/check-topic-drift.mjs');
const FILES = [
  'client/src/App.jsx',
  'client/src/features/tiles.js',
  'client/package.json',
  'server/index.js',
  'scripts/topic-drift-allowlist.json',
];

function makeCopy() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'topic-drift-'));
  for (const f of FILES) {
    fs.mkdirSync(path.join(dir, path.dirname(f)), { recursive: true });
    fs.copyFileSync(path.join(REPO, f), path.join(dir, f));
  }
  return dir;
}
const edit = (dir, file, fn) => {
  const p = path.join(dir, file);
  fs.writeFileSync(p, fn(fs.readFileSync(p, 'utf8')));
};
const run = (root) => {
  const r = spawnSync(process.execPath, [SCRIPT, '--root', root], { encoding: 'utf8' });
  return { code: r.status, out: r.stdout + r.stderr };
};

describe('topic drift check', () => {
  let dir;
  beforeEach(() => { dir = makeCopy(); });
  afterEach(() => { fs.rmSync(dir, { recursive: true, force: true }); });

  test('passes on the repository as it is', () => {
    const r = run(REPO);
    expect(r.out).toMatch(/No unexplained drift/);
    expect(r.code).toBe(0);
  });

  test('fails and names the key when a tile is deleted', () => {
    edit(dir, 'client/src/features/tiles.js', (s) => s.replace(/^\s*\{ key: 'bearings',.*\n/m, ''));
    const r = run(dir);
    expect(r.code).toBe(1);
    expect(r.out).toMatch(/"bearings" is in modeMap but has no home tile/);
  });

  test('fails when a modeMap entry has no tile, no route and no allowlist line', () => {
    edit(dir, 'client/src/App.jsx', (s) => s.replace('const modeMap = {', "const modeMap = {\n    'brand-new-topic': BattleApp,"));
    const r = run(dir);
    expect(r.code).toBe(1);
    expect(r.out).toMatch(/"brand-new-topic" is in modeMap but has no home tile/);
    expect(r.out).toMatch(/no server route "\/brand-new-topic-api"/);
  });

  test('fails when a tile opens a mode that does not exist', () => {
    edit(dir, 'client/src/features/tiles.js', (s) => s.replace(
      'export const TILES = [',
      "export const TILES = [\n    { key: 'ghost-topic', name: 'Ghost', subtitle: 'x', color: 'blue' },",
    ));
    const r = run(dir);
    expect(r.code).toBe(1);
    expect(r.out).toMatch(/tile "ghost-topic" opens nothing/);
  });

  test('fails when the server mounts a route nothing uses', () => {
    edit(dir, 'server/index.js', (s) => `${s}\napp.use('/orphan-thing-api', (req, res) => res.end());\n`);
    const r = run(dir);
    expect(r.code).toBe(1);
    expect(r.out).toMatch(/server mounts "\/orphan-thing-api" but no modeMap key uses it/);
  });

  test('an allowlist entry that is no longer needed only warns', () => {
    // Give riddle a home tile: its "noTile" entry goes stale.
    edit(dir, 'client/src/features/tiles.js', (s) => s.replace(
      'export const TILES = [',
      "export const TILES = [\n    { key: 'riddle', name: 'Riddles', subtitle: 'x', color: 'green' },",
    ));
    const r = run(dir);
    expect(r.code).toBe(0);
    expect(r.out).toMatch(/"riddle" in "noTile" is no longer needed/);
  });

  // ── allowlists and aliases ─────────────────────────────────────────────
  test('fails when a client-only entry is removed from the allowlist', () => {
    edit(dir, 'scripts/topic-drift-allowlist.json', (s) => s.replace(/\n\s*"battle": "[^"]*",/, ''));
    const r = run(dir);
    expect(r.code).toBe(1);
    expect(r.out).toMatch(/C {2}"battle" is in modeMap but no server route "\/battle-api"/);
  });

  test('fails when a server-only entry is removed from the allowlist', () => {
    edit(dir, 'scripts/topic-drift-allowlist.json', (s) => s.replace(/\n\s*"darts": "[^"]*",/, ''));
    const r = run(dir);
    expect(r.code).toBe(1);
    expect(r.out).toMatch(/D {2}server mounts "\/darts-api" but no modeMap key uses it/);
  });

  test('warns when a client-only screen gains a server route', () => {
    edit(dir, 'server/index.js', (s) => `${s}\napp.use('/battle-api', (req, res) => res.end());\n`);
    const r = run(dir);
    expect(r.code).toBe(0);
    expect(r.out).toMatch(/"battle" in "clientOnly" is no longer needed/);
  });

  test('an alias whose route is gone says it points nowhere', () => {
    edit(dir, 'server/index.js', (s) => s.replace(/^app\.use\('\/wordcreator-api'.*$/m, ''));
    const r = run(dir);
    expect(r.code).toBe(1);
    expect(r.out).toMatch(/alias "language" -> "wordcreator" points nowhere/);
    expect(r.out).not.toMatch(/"language" in "aliases" is no longer needed/);
  });

  // ── fail loudly instead of checking less ───────────────────────────────
  test('a comment line starting with } inside modeMap does not end it early', () => {
    edit(dir, 'client/src/App.jsx', (s) => s.replace('const modeMap = {', 'const modeMap = {\n    /*\n} not the end of modeMap\n    */'));
    const r = run(dir);
    expect(r.code).toBe(0);
    expect(r.out).toMatch(/Topic drift check: 112 modeMap keys/);
  });

  test('fails loudly when a modeMap line looks like a key but cannot be parsed', () => {
    edit(dir, 'client/src/App.jsx', (s) => s.replace('const modeMap = {', "const modeMap = {\n    wrapped: wrap({\n      inner: BattleApp,\n    }),"));
    const r = run(dir);
    expect(r.code).not.toBe(0);
    expect(r.out).toMatch(/modeMap: 1 key-looking line\(s\) were not parsed \(inner\)/);
  });

  test('fails loudly on an -api route whose path is not a plain string', () => {
    edit(dir, 'server/index.js', (s) => `${s}\nconst p = 'built';\napp.use('/' + p + '-api', (req, res) => res.end());\n`);
    const r = run(dir);
    expect(r.code).not.toBe(0);
    expect(r.out).toMatch(/-api route\(s\) use a path that is not a plain string/);
  });

  test('fails with a clear message if tiles.js starts importing modules', () => {
    edit(dir, 'client/src/features/tiles.js', (s) => `import something from './elsewhere.js';\n${s}`);
    const r = run(dir);
    expect(r.code).not.toBe(0);
    expect(r.out).toMatch(/tiles\.js now imports other modules/);
  });
});
