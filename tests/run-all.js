#!/usr/bin/env node

/**
 * Sprint Judicial — Test Runner
 * Ejecuta todas las validaciones del proyecto.
 * Uso: npm test  o  node tests/run-all.js
 */

const { execSync } = require('child_process');
const path = require('path');

const TESTS = [
  { name: 'Estructura de archivos', script: 'tests/test-structure.js' },
  { name: 'HTML semántico y accesibilidad', script: 'tests/test-accessibility.js' },
  { name: 'SEO y meta tags', script: 'tests/test-seo.js' },
  { name: 'CSS validación', script: 'tests/test-css.js' },
  { name: 'Links internos', script: 'tests/test-links.js' },
];

const ROOT = path.resolve(__dirname, '..');
let passed = 0;
let failed = 0;
let errors = [];

console.log('\n========================================');
console.log('  Sprint Judicial — Test Suite');
console.log('========================================\n');

for (const test of TESTS) {
  try {
    const output = execSync(`node ${test.script}`, { cwd: ROOT, encoding: 'utf-8', timeout: 30000 });
    const lines = output.trim().split('\n');
    const passCount = (output.match(/PASS/g) || []).length;
    const failCount = (output.match(/FAIL/g) || []).length;
    passed += passCount;
    failed += failCount;

    const status = failCount > 0 ? '❌' : '✅';
    console.log(`${status} ${test.name} (${passCount} passed, ${failCount} failed)`);

    if (failCount > 0) {
      const failLines = lines.filter(l => l.includes('FAIL'));
      failLines.forEach(l => {
        console.log(`   ${l}`);
        errors.push(`[${test.name}] ${l.trim()}`);
      });
    }
  } catch (err) {
    failed++;
    console.log(`❌ ${test.name} — ERROR: ${err.message.split('\n')[0]}`);
    errors.push(`[${test.name}] ${err.message.split('\n')[0]}`);
  }
}

console.log('\n========================================');
console.log(`  Resultados: ${passed} passed, ${failed} failed`);
console.log('========================================\n');

if (errors.length > 0) {
  console.log('Errores encontrados:');
  errors.forEach(e => console.log(`  - ${e}`));
  console.log('');
  process.exit(1);
}

process.exit(0);
