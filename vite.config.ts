/*
Copyright © 2015 Infrared5, Inc. All rights reserved.

The accompanying code comprising examples for use solely in conjunction with Red5 Pro (the "Example Code")
is  licensed  to  you  by  Infrared5  Inc.  in  consideration  of  your  agreement  to  the  following
license terms  and  conditions.  Access,  use,  modification,  or  redistribution  of  the  accompanying
code  constitutes your acceptance of the following license terms and conditions.

Permission is hereby granted, free of charge, to you to use the Example Code and associated documentation
files (collectively, the "Software") without restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The Software shall be used solely in conjunction with Red5 Pro. Red5 Pro is licensed under a separate end
user  license  agreement  (the  "EULA"),  which  must  be  executed  with  Infrared5,  Inc.
An  example  of  the EULA can be found on our website at: https://account.red5.net/assets/LICENSE.txt.

The above copyright notice and this license shall be included in all copies or portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,  INCLUDING  BUT
NOT  LIMITED  TO  THE  WARRANTIES  OF  MERCHANTABILITY, FITNESS  FOR  A  PARTICULAR  PURPOSE  AND
NONINFRINGEMENT.   IN  NO  EVENT  SHALL INFRARED5, INC. BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN  AN  ACTION  OF  CONTRACT,  TORT  OR  OTHERWISE,  ARISING  FROM,  OUT  OF  OR  IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import { defineConfig, Plugin } from 'vite'
import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'fs'
import { dirname, join, posix, relative, resolve } from 'path'

const projectRoot = __dirname
const pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf8'))
const version = pkg.version

function htmlDirPublicPrefix(htmlFileAbsolute: string): string {
  const rel = relative(projectRoot, htmlFileAbsolute).replace(/\\/g, '/')
  const dir = posix.dirname(rel)
  if (dir === '.' || dir === '') return './'
  const depth = dir.split('/').filter(Boolean).length
  return '../'.repeat(depth)
}

function relativePublicHtmlAssets(): Plugin {
  return {
    name: 'relative-public-html-assets',
    apply: 'build',
    transformIndexHtml(html, ctx) {
      const prefix = htmlDirPublicPrefix(ctx.filename)
      let out = html.replace(
        /(\s(?:href|src)=(["']))\/((?:style|libs|assets|script)\/)/gi,
        (_, lhs, quote, tail) => `${lhs}${quote}${prefix}${tail}`
      )
      out = out.replace(/href=["']\/["']/g, `href="${prefix}index.html"`)
      return out
    },
  }
}

function wasmMimeType(): Plugin {
  const setWasmContentType = (
    req: { url?: string },
    res: { setHeader: (name: string, value: string) => void },
    next: () => void
  ): void => {
    const path = req.url?.split('?')[0] ?? ''
    if (path.endsWith('.wasm')) {
      res.setHeader('Content-Type', 'application/wasm')
    }
    next()
  }

  return {
    name: 'wasm-mime-type',
    configureServer(server) {
      server.middlewares.use(setWasmContentType)
    },
    configurePreviewServer(server) {
      server.middlewares.use(setWasmContentType)
    },
  }
}

function defineVersion(): Plugin {
  return {
    name: 'replace-version',
    enforce: 'post', // run after other transforms
    // run for TS/JS/etc files
    transform(code: string, id: string) {
      if (!/\.(ts|tsx|js|jsx)$/.test(id)) return null
      if (!code.includes('__VERSION__')) return null
      return {
        code: code.replace(/__VERSION__/g, version),
        map: null,
      }
    },
    // also handle any emitted assets/chunks just in case
    generateBundle(_, bundle) {
      for (const fileName of Object.keys(bundle)) {
        const chunk = bundle[fileName] as any
        if (chunk && typeof chunk.code === 'string') {
          chunk.code = chunk.code.replace(/__VERSION__/g, version)
        }
        if (chunk && typeof chunk.source === 'string') {
          chunk.source = chunk.source.replace(/__VERSION__/g, version)
        }
      }
    },
  }
}

function copyWhipCastlabsWorker(): Plugin {
  let outDir = resolve(projectRoot, 'dist')
  const scripts = [
    'src/examples/whip-castlabs/encrypt-worker.js',
    'src/examples/whip-castlabs/encrypt-worker-wrapper.js',
  ]
  return {
    name: 'copy-whip-castlabs-worker',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      for (const script of scripts) {
        const source = resolve(projectRoot, script)
        if (!existsSync(source)) return
        const target = resolve(outDir, script)
        mkdirSync(dirname(target), { recursive: true })
        copyFileSync(source, target)
      }
    },
  }
}

export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : './',
  plugins: [wasmMimeType(), relativePublicHtmlAssets(), defineVersion(), copyWhipCastlabsWorker()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@public': resolve(__dirname, 'public'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'transcoder-form-only': resolve(__dirname, 'src/examples/transcoder-form-only/index.html'),
        'transcoder-form-and-publish': resolve(
          __dirname,
          'src/examples/transcoder-form-and-publish/index.html'
        ),
        'transcoder-form-publish-amf': resolve(
          __dirname,
          'src/examples/transcoder-form-publish-amf/index.html'
        ),
        'proxy-subscriber': resolve(__dirname, 'proxy-subscriber.html'),
        'proxy-subscriber-all-edge': resolve(__dirname, 'proxy-subscriber-all-edge.html'),
        'proxy-subscriber-amount': resolve(__dirname, 'proxy-subscriber-amount.html'),
        'proxy-publisher': resolve(__dirname, 'proxy-publisher.html'),
        'proxy-screenshare': resolve(__dirname, 'proxy-screenshare.html'),
        'data-channel': resolve(__dirname, 'data-channel.html'),
        'whip-whep-basic': resolve(__dirname, 'src/examples/whip-whep/index.html'),
        'whip-basic': resolve(__dirname, 'src/examples/whip-basic/index.html'),
        'rtc-publisher': resolve(__dirname, 'src/examples/rtc-publisher/index.html'),
        'rtc-subscriber': resolve(__dirname, 'src/examples/rtc-subscriber/index.html'),
        'whip-amf': resolve(__dirname, 'src/examples/whip-amf/index.html'),
        'whip-connection-params': resolve(
          __dirname,
          'src/examples/whip-connection-params/index.html'
        ),
        'whip-supported-resolutions': resolve(
          __dirname,
          'src/examples/whip-supported-resolutions/index.html'
        ),
        'whip-codec-preference': resolve(
          __dirname,
          'src/examples/whip-codec-preference/index.html'
        ),
        'whip-audio-constraints': resolve(
          __dirname,
          'src/examples/whip-audio-constraints/index.html'
        ),
        'whip-data-channel': resolve(__dirname, 'src/examples/whip-data-channel/index.html'),
        'message-channel': resolve(__dirname, 'src/examples/message-channel/index.html'),
        'pubnub-client': resolve(__dirname, 'src/examples/pubnub-client/index.html'),
        'whip-castlabs': resolve(__dirname, 'src/examples/whip-castlabs/index.html'),
        'whip-remote-call': resolve(__dirname, 'src/examples/whip-remote-call/index.html'),
        'whip-media-source-swap': resolve(
          __dirname,
          'src/examples/whip-media-source-swap/index.html'
        ),
        'whip-mute-api': resolve(__dirname, 'src/examples/whip-mute-api/index.html'),
        'whip-live-encoding': resolve(__dirname, 'src/examples/whip-live-encoding/index.html'),
        'whip-resiliency': resolve(__dirname, 'src/examples/whip-resiliency/index.html'),
        'whip-screenshare': resolve(__dirname, 'src/examples/whip-screenshare/index.html'),
        'whip-social-pusher': resolve(__dirname, 'src/examples/whip-social-pusher/index.html'),
        'whep-basic': resolve(__dirname, 'src/examples/whep-basic/index.html'),
        'hls-subscriber': resolve(__dirname, 'src/examples/hls-subscriber/index.html'),
        'whep-cluster': resolve(__dirname, 'src/examples/whep-cluster/index.html'),
        'whep-connection-params': resolve(
          __dirname,
          'src/examples/whep-connection-params/index.html'
        ),
        'whep-interstitial': resolve(__dirname, 'src/examples/whep-interstitial/index.html'),
        'whep-reconnect': resolve(__dirname, 'src/examples/whep-reconnect/index.html'),
        'whep-renegotiation': resolve(__dirname, 'src/examples/whep-renegotiation/index.html'),
        'whep-standby': resolve(__dirname, 'src/examples/whep-standby/index.html'),
        'whep-switch-streams': resolve(__dirname, 'src/examples/whep-switch-streams/index.html'),
        'whep-manual-stream': resolve(__dirname, 'src/examples/whep-manual-stream/index.html'),
        'whep-codec-preference': resolve(
          __dirname,
          'src/examples/whep-codec-preference/index.html'
        ),
        'whep-audio-playback': resolve(__dirname, 'src/examples/whep-audio-playback/index.html'),
        'brew-mixer': resolve(__dirname, 'src/examples/brew-mixer/index.html'),
        'whep-live-seek': resolve(__dirname, 'src/examples/whep-live-seek/index.html'),
        'whep-amf': resolve(__dirname, 'src/examples/whep-amf/index.html'),
        'whep-data-channel': resolve(__dirname, 'src/examples/whep-data-channel/index.html'),
        'whep-castlabs': resolve(__dirname, 'src/examples/whep-castlabs/index.html'),
        'whep-castlabs-watermark': resolve(
          __dirname,
          'src/examples/whep-castlabs-watermark/index.html'
        ),
        'whep-remote-call': resolve(__dirname, 'src/examples/whep-remote-call/index.html'),
        'whep-mute-api': resolve(__dirname, 'src/examples/whep-mute-api/index.html'),
      },
    },
  },
}))
