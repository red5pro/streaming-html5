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

export interface HlsJsInstance {
  loadSource(url: string): void
  attachMedia(element: HTMLMediaElement): void
  destroy(): void
  on(event: string, handler: (...args: unknown[]) => void): void
  off(event: string, handler: (...args: unknown[]) => void): void
}

export interface HlsJsConstructor {
  new (config?: object): HlsJsInstance
  isSupported(): boolean
  Events: {
    MANIFEST_PARSED: string
    ERROR: string
  }
}

declare global {
  interface Window {
    Hls?: HlsJsConstructor
  }
}

export async function startHlsJsPlayback(
  video: HTMLVideoElement,
  manifestUrl: string
): Promise<HlsJsInstance> {
  const Hls = window.Hls

  if (!Hls || !Hls?.isSupported()) {
    throw new Error('HLS.js is not supported in this browser')
  }

  const hls = new Hls()

  return new Promise((resolve, reject) => {
    const onError = (...args: unknown[]): void => {
      const data = args[1] as { fatal?: boolean; type?: string } | undefined
      if (data?.fatal) {
        hls.destroy()
        reject(new Error(`HLS.js fatal error: ${data.type ?? 'unknown'}`))
      }
    }

    hls.on(Hls.Events.ERROR, onError)
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      hls.off(Hls.Events.ERROR, onError)
      void video.play().catch(() => {})
      resolve(hls)
    })

    hls.loadSource(manifestUrl)
    hls.attachMedia(video)
  })
}

export function stopHlsJsPlayback(hls: HlsJsInstance | null, video: HTMLVideoElement): void {
  hls?.destroy()

  video.pause()
  video.removeAttribute('src')
  video.load()
}
