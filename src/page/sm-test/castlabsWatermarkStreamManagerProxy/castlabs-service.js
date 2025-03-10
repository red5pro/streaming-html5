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

const authenticationUrl = `https://auth.castlabs.com/api/v1/keypair/credentialexchange`
const watermarkUrl = `https://watermark.castlabs.com/get_overlay`

const port = 8088
const corsProxyUrl = `http://localhost:${port}`
const corsAuthUrl = `${corsProxyUrl}/credentialexchange`
const corsGetOverlayUrl = `${corsProxyUrl}/get_overlay`

const base64ToUint8Array = (base64) => {
  const binary = atob(base64)
  const len = binary.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; ++i) bytes[i] = binary.charCodeAt(i)

  return bytes
}

const hmac = async (key, message, algorithm = 'SHA-256') => {
  const keyData = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: algorithm },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', keyData, message)
  return new Uint8Array(signature)
}

const hmacSha1Base64 = async (key, message) => {
  const signature = await crypto.subtle.sign(
    'HMAC',
    await crypto.subtle.importKey(
      'raw',
      key,
      { name: 'HMAC', hash: 'SHA-1' },
      false,
      ['sign']
    ),
    new TextEncoder().encode(message)
  )
  return btoa(String.fromCharCode(...new Uint8Array(signature)))
}

const getSigningKey = async (secretAccessKey, userUrn, timestamp) => {
  const enc = new TextEncoder()
  const secretToken = await hmac(
    enc.encode(`castLabs ${secretAccessKey}`),
    enc.encode(timestamp)
  )
  const userToken = await hmac(secretToken, enc.encode(userUrn))
  return await hmac(userToken, enc.encode('castLabs-api_auth'))
}

class ServiceImpl {
  useMock = true
  bearerToken = null

  constructor(useMock) {
    this.useMock = useMock
  }

  async authenticate(settings) {
    const { accessKey, secretKey, organizationUrn, userUrn } = settings

    const timestamp = new Date().toISOString()
    const tsShort = timestamp.split('T')[0]
    const body = JSON.stringify({
      access_key_id: accessKey,
      timestamp,
    })
    const signingKey = await getSigningKey(secretKey, userUrn, tsShort)
    const signature = await hmacSha1Base64(signingKey, body)

    const url = this.useMock ? corsAuthUrl : authenticationUrl
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Castlabs-Keypair-Signature': signature,
      },
      body,
    })
    const json = await response.json()
    const { access_token } = json
    if (!access_token) {
      throw new Error('Access token missing.')
    }
    this.bearerToken = access_token
    return {
      Authorization: `Bearer ${access_token}`,
      Organization: organizationUrn,
    }
  }

  async getOverlays(settings) {
    const { watermarkId, numOverlays } = settings

    const authPayload = await this.authenticate(settings)
    const { Authorization, Organization } = authPayload

    const payload = {
      wm_id: Number(watermarkId).toString(16),
      bit_profile: '13',
      strength: '4',
      sp_density: numOverlays > 1 ? '75' : '100',
      pixel_density: numOverlays > 1 ? '75' : '100',
      format: 'pnga',
    }

    const url = this.useMock ? corsGetOverlayUrl : watermarkUrl
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization,
        Organization,
      },
      body: JSON.stringify(payload),
    })
    const json = await response.json()
    const { overlay } = json
    if (!overlay) {
      throw new Error('Overlay missing')
    }

    return base64ToUint8Array(overlay)
  }
}

const service = new ServiceImpl(false)
export default service
