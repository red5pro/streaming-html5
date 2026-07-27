import test from 'node:test'
import assert from 'node:assert/strict'
import { publicAssetPrefixFromPath } from '../src/lib/public-path.ts'

test('returns ./ for root and non-src paths', () => {
  assert.equal(publicAssetPrefixFromPath('/'), './')
  assert.equal(publicAssetPrefixFromPath('/dist'), './')
  assert.equal(publicAssetPrefixFromPath('/dist/index.html'), './')
  assert.equal(publicAssetPrefixFromPath('/custom/subdir/page.html'), './')
})

test('returns depth relative to src subtree for nested example pages', () => {
  assert.equal(
    publicAssetPrefixFromPath('/dist/src/examples/brew-mixer/index.html'),
    '../../../'
  )
  assert.equal(
    publicAssetPrefixFromPath('/dist/src/examples/pubnub-client/'),
    '../../../'
  )
  assert.equal(publicAssetPrefixFromPath('/src/examples/whep-basic/index.html'), '../../../')
})

