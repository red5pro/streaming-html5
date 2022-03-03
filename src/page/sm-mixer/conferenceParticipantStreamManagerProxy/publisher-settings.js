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
An  example  of  the EULA can be found on our website at: https://account.red5pro.com/assets/LICENSE.txt.

The above copyright notice and this license shall be included in all copies or portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,  INCLUDING  BUT  
NOT  LIMITED  TO  THE  WARRANTIES  OF  MERCHANTABILITY, FITNESS  FOR  A  PARTICULAR  PURPOSE  AND  
NONINFRINGEMENT.   IN  NO  EVENT  SHALL INFRARED5, INC. BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN  AN  ACTION  OF  CONTRACT,  TORT  OR  OTHERWISE,  ARISING  FROM,  OUT  OF  OR  IN CONNECTION 
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
/**
 * The Utility script to manage Publisher Settings section with optional transcoder settings.
 */
(window => {

  // Utility to use forEach on an array in an async manner.
  const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  // The list of resolutions to attempt in the browser to determine what is supported.
  // The supported resolutions can change from browser to browser even with the same camera device selected :/
  const resolutions = [
    {width: 160, height: 120, frameRate: 10, bandwidth: 250000, media: undefined},
    {width: 320, height: 240, frameRate: 15, bandwidth: 300000, media: undefined},
    {width: 352, height: 288, frameRate: 15, bandwidth: 512000, media: undefined},
    {width: 640, height: 360, frameRate: 15, bandwidth: 512000, media: undefined},
    {width: 640, height: 480, frameRate: 15, bandwidth: 512000, media: undefined},
    {width: 854, height: 480, frameRate: 15, bandwidth: 750000, media: undefined},
    {width: 1280, height: 720, frameRate: 30, bandwidth: 1500000, media: undefined},
    {width: 1920, height: 1080, frameRate: 30, bandwidth: 3000000, media: undefined},
    {width: 3840, height: 2160, frameRate: 30, bandwidth: 4500000, media: undefined}
  ].reverse()

  /**
   * Creates and returns a Resolution Table Entry Element.
   *
   * @param {Object} resolution
   *        An entry from the resolutions list above.
   * @param {Number} index
   *        The index of the entry from the resolutions list.
   * @param {Boolean} select
   *        Flag to select the entry within the UI.
   *
   * @return HTMLElement
   */
  const generateResolutionOption = (resolution, index, select) => {
    const res = [resolution.width, resolution.height].join('x')
    const framerate = resolution.frameRate
    const bitrate = resolution.bandwidth / 1000
    const tr = document.createElement('tr')
    const resTD = document.createElement('td')
    const frTD = document.createElement('td')
    const bitrateTD = document.createElement('td')
    const useTD = document.createElement('td')
    const resText = document.createTextNode(res)
    const ftText = document.createTextNode(framerate)
    const bitrateText = document.createTextNode(bitrate)
    const useCheckbox = document.createElement('input')
    useCheckbox.type = 'checkbox'
    useCheckbox.checked = select
    useCheckbox.classList.add('provision-check')
    tr.id = `resolution-${index}`
    tr.classList.add('settings-control')
    tr.appendChild(resTD)
    tr.appendChild(frTD)
    tr.appendChild(bitrateTD)
    tr.appendChild(useTD)
    tr.classList.add('table-row')
    resTD.appendChild(resText)
    frTD.appendChild(ftText)
    bitrateTD.appendChild(bitrateText)
    useTD.appendChild(useCheckbox)
    const entries = [resTD, frTD, bitrateTD, useTD]
    entries.forEach(function (td) {
      td.classList.add('table-entry')
      td.classList.add('table-entry-option')
    })
    return tr
  }

  /**
   * Class to manage the Publisher settings section for a publisher.
   */
  class PublisherSettings {

    constructor (idOrElement, streamName, client = undefined, useABR = false) {
      this.container = (typeof idOrElement === 'string') ? document.querySelector(`#${idOrElement}`) : idOrElement
      this.streamName = streamName
      this.selectedResolution = undefined

      this._client = client
      this._useABR = useABR

      // UI Element Listeners
      const cameraSelect = this.container.querySelector('#camera-select')
      cameraSelect.addEventListener('change', this._onCameraSelect.bind(this))
      const submitProvisionButton = this.container.querySelector('#submit-provision-button')
      submitProvisionButton.addEventListener('click', this._onProvisionSubmit.bind(this))
      const startButton = this.container.querySelector('#broadcast-button')
      startButton.addEventListener('click', this._onBroadcastSubmit.bind(this))

      const resolutionContainer = this.container.querySelector('#resolution-container')

      // Set the UI if we are using transcoding.
      this._setUIForABR(this._useABR)
      // Inflate the display.
      this._inflate(cameraSelect, resolutionContainer)
    }

    /**
     * Sets the UI if determined we are using transcoding for publish session.
     *
     * @param {Boolean} flag
     */
    _setUIForABR (flag) {
      const startButton = this.container.querySelector('#broadcast-button')
      const resolutionSection = this.container.querySelector('#resolution-section')
      if (flag) {
        resolutionSection.classList.remove('hidden')
        startButton.classList.add('hidden')
      } else {
        resolutionSection.classList.add('hidden')
        startButton.classList.remove('hidden')
      }
    }

    /**
     * Event Listener for submitting a provision to the server based on camera settings and resolution selection.
     */
    async _onProvisionSubmit () {
      const nodes = this.container.querySelectorAll('.provision-check')
      const provisionChecks = [].map.call(nodes, node => node)
      const selectedProvisions = provisionChecks.filter(check => check.checked)
      let provisions = []
      selectedProvisions.forEach(check => {
        const entry = check.parentNode.parentNode
        const id = entry.id
        const index = parseInt(id.split('-')[1], 10)
        const resolution = resolutions[index]
        provisions.push(resolution)
      })
      const streams = provisions.map((resolution, index) => {
        const level = index + 1
        return {
          name: `${this.streamName}_${level}`,
          level: level,
          properties: {
            videoWidth: resolution.width,
            videoHeight: resolution.height,
            videoBR: resolution.bandwidth
          }
        }
      })
      const post = {
        meta: {
          stream: streams,
          authentication: {
            username: '',
            password: ''
          },
          georules: {
            regions: ['US', 'UK'],
            restricted: false
          },
          qos: 3
        }
      }
      try {
        console.log(`[Publisher]:: POSTING provisions: ${JSON.stringify(post, null, 2)}`)
        await this.client.onProvisionSubmit(post)
        this._setUIForABR(false)
      } catch (e) {
        throw e
      }
    }

    /**
     * Event listener for request to start a publish session.
     */
    _onBroadcastSubmit () {
      let variant
      // If we are using ABR/Transcoding, we will have selected a resolution.
      // If not, passing undefined will use the GUID stream name.
      if (this.selectedResolution) {
        variant = {...this.selectedResolution, ...{
          name: `${this.streamName}_1`
        }}
      }
      this.client.onStartBroadcast(variant)
    }

    /**
     * Event listener for selection of a camera.
     */
    async _onCameraSelect (event) {
      try {
        const cameraSelect = event.currentTarget
        const resolutionContainer = this.container.querySelector('#resolution-container')
        const selection = cameraSelect.value && cameraSelect.value.length > 0 ? cameraSelect.value : undefined
        const stream = await this._establishInitialStream(cameraSelect, selection)
        if (this._useABR) {
          const {
            selectedStream,
            selectedResolution
          } = await this._displaySupportedResolutions(resolutionContainer, selection)
          this.selectedResolution = selectedResolution
          this.client.onMediaStream(selectedStream)
          return selectedStream
        } else {
          this.client.onMediaStream(stream)
          return stream
        }
      } catch (e) {
        console.error(e)
      }
    }

    /**
     * If using ABR/Transcoding, this will list all lthe supported resolutions of the browser based on the
     * resolutions list.
     * The user will then select which ones to send as the provision and start broadcasting with the top-level one.
     *
     * @param {HTMLElement} container
     *        The element to add the support resolution records to.
     * @param {String} selection
     *        The optionally selected deviceId from the target camera device.
     */
    async _displaySupportedResolutions (container, selection = undefined) {
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }

      if (selection === undefined) {
        return undefined
      }

      let selectedStream
      let selectedResolution
      let count = 0
      await asyncForEach(resolutions, async (resolution, index) => {
        try {
          const constraints = {
            video: {
              deviceId: { exact: selection },
              width: { exact: resolution.width },
              height: { exact: resolution.height }
            }
          }
          // Traversing each resolution from the list and checking if it throws a `gUM` exception.
          // If no exception, it is supported.
          const stream = await navigator.mediaDevices.getUserMedia(constraints)
          if (stream) {
            const option = generateResolutionOption(resolution, index, count++ === 0)
            container.appendChild(option)
            if (!selectedStream) {
              selectedStream = stream
              selectedResolution = resolution
            }
          }
        } catch (e) {
          console.log(`Cannot support camera resolution: ${JSON.stringify(resolution)}`)
          console.error(e)
        }
      })

      if (selectedStream) {
        const settings = selectedStream.getVideoTracks()[0].getSettings()
        console.log(`Using selected stream: ${JSON.stringify(settings, null, 2)}`)
      }
      return { selectedStream, selectedResolution }
    }

    /**
     * Lists the Camera Devices in a select element to allow User to select target camera.
     *
     * @param {HTMLElement} cameraSelect
     *        The select HTML element to add the options to.
     * @param {Array} devices
     *        The list of devices available in the browser through enumerateDevices.
     */
    _listDevices (cameraSelect, devices) {
      const filtered = devices.filter(device => {
        return device.kind === 'videoinput'
      })
      const options = filtered.map((device, index) => {
        const id = device.deviceId
        const label = device.label || `camera ${index}`
        const option = document.createElement('option')
        const text = document.createTextNode(label)
        option.appendChild(text)
        option.value = id
        return option
      })
      while (cameraSelect.firstChild) {
        cameraSelect.removeChild(cameraSelect.lastChild)
      }
      options.forEach(option => {
        cameraSelect.appendChild(option)
      })
    }

    /**
     * Establishes the initial stream based on camera selection.
     *
     * @param {HTMLElement} cameraSelect
     *        The select HTML element with the camera options.
     * @param {String} deviceId
     *        The optionally selected deviceId of a supported camera device.
     */
    async _establishInitialStream (cameraSelect, deviceId = undefined) {
      // If deviceId is undefined, just set to true to begin
      const constraints = {
        audio: true,
        video: deviceId ? { deviceId: { exact: deviceId } } : true
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        const devices = await navigator.mediaDevices.enumerateDevices()
        this._listDevices(cameraSelect, devices)
        stream.getVideoTracks().forEach(track => {
          cameraSelect.value = track.getSettings().deviceId;
        })
        return stream
      } catch (e) {
        throw e
      }
    }

    /**
     * Setup the initial UI.
     *
     * @param {HTMLElement} cameraSelect
     *        The select HTML element to display camera listing options.
     * @param {HTMLElement} resolutionContainer
     *        The parent HTML element to add resolution options to.
     */
    async _inflate (cameraSelect, resolutionContainer) {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        this._listDevices(cameraSelect, devices)
        const selection = cameraSelect.value && cameraSelect.value.length > 0 ? cameraSelect.value : undefined
        const stream = await this._establishInitialStream(cameraSelect, selection)
        if (this._useABR) {
          const {
            selectedStream,
            selectedResolution
          } = await this._displaySupportedResolutions(resolutionContainer, selection)
          this.selectedResolution = selectedResolution
          this.client.onMediaStream(selectedStream)
          return selectedStream
        } else {
          this.client.onMediaStream(stream)
          return stream
        }
      } catch (e) {
        console.error(e)
      }
    }

    get client() {
      return this._client
    }
    set client (c) {
      this._client = c
    }

  }

  window.PublisherSettings = PublisherSettings

})(window)
