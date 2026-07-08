#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs'
import { extname, relative, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'

const ROOT = process.cwd()
const SCRIPT_DIR = resolve(ROOT, 'scripts')
const EXCLUSIONS_FILE = resolve(SCRIPT_DIR, 'license-header-exclusions.txt')

const LICENSE_BY_EXT = {
  '.js': resolve(SCRIPT_DIR, 'LICENSE.js'),
  '.ts': resolve(SCRIPT_DIR, 'LICENSE.js'),
  '.html': resolve(SCRIPT_DIR, 'LICENSE.html'),
  '.css': resolve(SCRIPT_DIR, 'LICENSE.css'),
}

const DEFAULT_EXCLUSIONS = [
  'public/libs/**',
  'node_modules/**',
  'dist/**',
  '.git/**',
]

function toPosix(p) {
  return p.replaceAll('\\', '/')
}

function readText(path) {
  return readFileSync(path, 'utf8')
}

function readExclusions() {
  const extra = existsSync(EXCLUSIONS_FILE)
    ? readText(EXCLUSIONS_FILE)
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith('#'))
    : []

  return [...DEFAULT_EXCLUSIONS, ...extra]
}

function globToRegex(pattern) {
  const normalized = toPosix(pattern)
  const escaped = normalized.replace(/[.+^${}()|[\]\\]/g, '\\$&')
  const regexBody = escaped.replaceAll('**', '::DOUBLE_STAR::').replaceAll('*', '[^/]*')
  const withDoubleStar = regexBody.replaceAll('::DOUBLE_STAR::', '.*')
  return new RegExp(`^${withDoubleStar}$`)
}

function buildMatchers(patterns) {
  return patterns.map((pattern) => globToRegex(pattern))
}

function isExcluded(filePath, matchers) {
  const rel = toPosix(relative(ROOT, filePath))
  return matchers.some((matcher) => matcher.test(rel))
}

function getTrackedFiles() {
  const result = spawnSync('git', ['ls-files'], { cwd: ROOT, encoding: 'utf8' })
  if (result.status !== 0) {
    throw new Error(result.stderr || 'Failed to run `git ls-files`.')
  }
  return result.stdout
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => resolve(ROOT, line))
}

function getStagedFiles() {
  const result = spawnSync(
    'git',
    ['diff', '--cached', '--name-only', '--diff-filter=ACMR'],
    { cwd: ROOT, encoding: 'utf8' }
  )
  if (result.status !== 0) {
    throw new Error(result.stderr || 'Failed to run `git diff --cached`.')
  }
  return result.stdout
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => resolve(ROOT, line))
}

function isTargetFile(filePath) {
  return Object.prototype.hasOwnProperty.call(LICENSE_BY_EXT, extname(filePath))
}

function checkFileHeader(filePath) {
  const ext = extname(filePath)
  const licensePath = LICENSE_BY_EXT[ext]
  if (!licensePath) return true

  const expectedHeader = readText(licensePath).trim()
  const content = readText(filePath)
  return content.startsWith(expectedHeader)
}

function main() {
  const stagedOnly = process.argv.includes('--staged')
  const exclusions = readExclusions()
  const exclusionMatchers = buildMatchers(exclusions)

  const files = stagedOnly ? getStagedFiles() : getTrackedFiles()
  const candidates = files.filter(
    (filePath) => isTargetFile(filePath) && !isExcluded(filePath, exclusionMatchers)
  )

  const failures = candidates.filter((filePath) => !checkFileHeader(filePath))

  if (failures.length === 0) {
    console.log(
      `License header check passed (${candidates.length} file${candidates.length === 1 ? '' : 's'} checked).`
    )
    process.exit(0)
  }

  console.error('\nLicense header check failed. Missing or incorrect header at top of:')
  failures.forEach((filePath) => {
    console.error(` - ${toPosix(relative(ROOT, filePath))}`)
  })
  console.error(
    '\nExpected headers come from scripts/LICENSE.js, scripts/LICENSE.html, and scripts/LICENSE.css.'
  )
  console.error(`Exclusions are configured in ${toPosix(relative(ROOT, EXCLUSIONS_FILE))}.`)
  process.exit(1)
}

main()
