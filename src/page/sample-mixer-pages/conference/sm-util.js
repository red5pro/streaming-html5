/**
 * Various utility requests related to Stream Manager integration.
 */
(window => {

  /**
   * Returns if stream name is available on the stream manager.
   */
  const getIsAvailable = async (url, streamName) => {
    try {
      const isAvailable = await window.getIsStreamAvailable(url, streamName, true)
      return isAvailable
    } catch (e) {
      console.error(e)
      return false
    }
  }

  /**
   * Requests stream list from stream manager and filters on scope/app.
   */
  const getStreamList = async (url, scope) => {
    try {
      const list = await window.getStreamList(url)
      const filtered = list.filter(item => {
        return item.scope === scope && item.type === 'edge'
      })
      return filtered
    } catch (e) {
      throw e
    }
  }

  /**
   * Request to get Origin data to broadcast on stream manager proxy.
   */
  const getOrigin = async (host, context, streamName, transcode = false) => {
    try {
      let url = `https://${host}/streammanager/api/4.0/event/${context}/${streamName}?action=broadcast`
      if (transcode) {
        url += '&transcode=true'
      }
      const result = await fetch(url)
      const json = await result.json()
      if (json.errorMessage) {
        throw new Error(json.errorMessage)
      }
      return json
    } catch (e) {
      throw e
    }
  }


  /**
   * Request to get Origin data to broadcast for conference stream manager proxy.
   */
  const getOriginForConference = async (host, context) => {
    try {
      let url = `https://${host}/streammanager/api/4.0/event/${context}/join`
      const result = await fetch(url)
      const json = await result.json()
      if (json.errorMessage) {
        throw new Error(json.errorMessage)
      }
      return json
    } catch (e) {
      throw e
    }
  }


  /**
   * Request to get Edge on stream managaer to consume stream from stream manager proxy.
   */
  const getEdge = async (host, context, streamName) => {
    try {
      const url = `https://${host}/streammanager/api/4.0/event/${context}/${streamName}?action=subscribe`
      const result = await fetch(url)
      const json = await result.json()
      if (json.errorMessage) {
        throw new Error(json.errorMessage)
      }
      return json
    } catch (e) {
      throw e
    }
  }

  /**
   * Request to post a transcode provision detailing variants.
   */
  const postTranscode = async (host, context, streamName, provision, smPass = '123xyz') => {
    try {
      const url = `https://${host}/streammanager/api/4.0/admin/event/meta/${context}/${streamName}?accessToken=${smPass}`
      const result = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(provision)
      })
      const json = await result.json()
      if (json && json.errorMessage) {
        throw new Error(json.errorMessage)
      }
      return json
    } catch (e) {
      throw e
    }
  }

  const postProvision = async (host, provision, smPass = '123xyz') => {
    const {
      context,
      name
    } = provision
    try {
      const url = `https://${host}/streammanager/api/4.0/admin/event/meta/${context}/${name}?accessToken=${smPass}`
      const result = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(provision)
      })
      const json = await result.json()
      if (json && json.errorMessage) {

        if (json.errorMessage.indexOf('Provision already exists') < 0) {
          throw new Error(json.errorMessage)
        }
        else {
          console.log('Provision already exists')
        }
      }


      return json
    } catch (e) {
      throw e
    }
  }

  window.streamManagerUtil = {
    getIsStreamAvailable: getIsAvailable,
    getStreamList: getStreamList,
    getOrigin: getOrigin,
    getOriginForConference: getOriginForConference,
    getEdge: getEdge,
    postTranscode: postTranscode,
    postProvision: postProvision
  }

})(window)
