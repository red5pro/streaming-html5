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
(function(window, document, red5prosdk) {
  'use strict';

  const serverSettings = (() => {
    const settings = sessionStorage.getItem('r5proServerSettings')
    try {
      return JSON.parse(settings)
    }
    catch (e) {
      console.error('Could not read server settings from sessionstorage: ' + e.message)
    }
    return {}
  })()

  const configuration = (() => {
    const conf = sessionStorage.getItem('r5proTestBed')
    try {
      return JSON.parse(conf)
    }
    catch (e) {
      console.error('Could not read testbed configuration from sessionstorage: ' + e.message)
    }
    return {}
  })()

  red5prosdk.setLogLevel(configuration.verboseLogging ? red5prosdk.LOG_LEVELS.TRACE : red5prosdk.LOG_LEVELS.WARN)


  let targetPublisher

  const updateStatusFromEvent = window.red5proHandlePublisherEvent; // defined in src/template/partial/status-field-publisher.hbs
  const streamTitle = document.getElementById('stream-title');
  const statisticsField = document.getElementById('statistics-field');
  const bitrateField = document.getElementById('bitrate-field');
  const packetsField = document.getElementById('packets-field');
  const resolutionField = document.getElementById('resolution-field');

  const protocol = serverSettings.protocol
  const isSecure = protocol == 'https'
  const getSocketLocationFromProtocol = () => {
    return !isSecure
      ? {protocol: 'ws', port: serverSettings.wsport}
      : {protocol: 'wss', port: serverSettings.wssport}
  }

  let bitrate = 0
  let packetsSent = 0
  let frameWidth = 0
  let frameHeight = 0

  const updateStatistics = (b, p, w, h) => {
    statisticsField.classList.remove('hidden');
    bitrateField.innerText = b === 0 ? 'N/A' : Math.floor(b);
    packetsField.innerText = p;
    resolutionField.innerText = (w || 0) + 'x' + (h || 0);
  }

  const onBitrateUpdate = (b, p) => {
    bitrate = b;
    packetsSent = p;
    updateStatistics(bitrate, packetsSent, frameWidth, frameHeight);
  }

  const onResolutionUpdate = (w, h) => {
    frameWidth = w;
    frameHeight = h;
    updateStatistics(bitrate, packetsSent, frameWidth, frameHeight);
  }

  const onPublisherEvent = event => {
    console.log('[Red5ProPublisher] ' + event.type + '.');
    updateStatusFromEvent(event);
  }
  const onPublishFail = message => {
    console.error('[Red5ProPublisher] Publish Error :: ' + message);
  }
  const onPublishSuccess = publisher => {
    console.log('[Red5ProPublisher] Publish Complete.');
    try {
      const pc = publisher.getPeerConnection();
      const stream = publisher.getMediaStream();
      window.trackBitrate(pc, onBitrateUpdate, onResolutionUpdate);
      statisticsField.classList.remove('hidden');
      stream.getVideoTracks().forEach(function (track) {
        const settings = track.getSettings();
        onResolutionUpdate(settings.width, settings.height);
      });
    }
    catch (e) {
      // no tracking for you!
    }
  }
  const onUnpublishFail = (message) => {
    console.error('[Red5ProPublisher] Unpublish Error :: ' + message);
  }
  const onUnpublishSuccess = () => {
    console.log('[Red5ProPublisher] Unpublish Complete.');
  }

  const getAuthenticationParams = () => {
    let auth = configuration.authentication;
    return auth && auth.enabled
      ? {
        connectionParams: {
          username: auth.username,
          password: auth.password,
          token: auth.token
        }
      }
      : {};
  }

  const getUserMediaConfiguration = () => {
    return {
      mediaConstraints: {
        audio: configuration.useAudio ? configuration.mediaConstraints.audio : false,
        video: configuration.useVideo ? configuration.mediaConstraints.video : false
      }
    };
  }

  const getRTMPMediaConfiguration = () => {
    return {
      mediaConstraints: {
        audio: configuration.useAudio ? configuration.mediaConstraints.audio : false,
        video: configuration.useVideo ? {
                width: configuration.cameraWidth,
                height: configuration.cameraHeight
              } : false
      }
    }
  }

  const unpublish = () => {
    return new Promise(function (resolve, reject) {
      const publisher = targetPublisher;
      publisher.unpublish()
        .then(function () {
          onUnpublishSuccess();
          resolve();
        })
        .catch(function (error) {
          const jsonError = typeof error === 'string' ? error : JSON.stringify(error, 2, null);
          onUnpublishFail('Unmount Error ' + jsonError);
          reject(error);
        });
    });
  }

  const authParams = getAuthenticationParams()
  const mediaConfig = getUserMediaConfiguration()
  const config = {...configuration,
    ...authParams,
    ...mediaConfig,
    streamMode: configuration.recordBroadcast ? 'record' : 'live'
  }

  const start = async () => {
    try {
      const rtcConfig = {...config, 
        protocol: 'wss',// getSocketLocationFromProtocol().protocol,
        port: 443,// getSocketLocationFromProtocol().port,
        streamName: config.stream1,
      }
      const protocol = rtcConfig.protocol === 'ws' ? 'http' : 'https'
      const { host, port, app, streamName } = rtcConfig
      const baseUrl = `${protocol}://${host}:${port}`
      const whipUrl = `${baseUrl}/${app}/whip/endpoint/${streamName}`
      // If you want to keep all the internal default settings for a Publisher,
      //  you would just send the `whipUrl` and reference to the target `video` element
      //  in the constructor call:
      // targetPublisher = new red5prosdk.WHIPClient(whipUrl, document.querySelector('#red5pro-publisher'))

      // Since we have additionally settings that may differ from the default configuration for a Publisher
      //  we will use the API similar to an `RTCPublisher` with empty constructor args:

      targetPublisher = await new red5prosdk.WHIPClient().init(rtcConfig)
      targetPublisher.on('*', onPublisherEvent)
      targetPublisher.publish()
      onPublishSuccess(targetPublisher)

    } catch (error) {
      const jsonError = typeof error === 'string' ? error : JSON.stringify(error, null, 2)
      console.error('[Red5ProPublisher] :: Error in publishing - ' + jsonError)
      onPublishFail(jsonError)
      if (targetPublisher) {
        targetPublisher.off('*', onPublisherEvent) 
      }
      targetPublisher = undefined
    }
  }

  start()

  let shuttingDown = false;
  const shutdown = () => {
    if (shuttingDown) return;
    shuttingDown = true;
    const clearRefs = () => {
      if (targetPublisher) {
        targetPublisher.off('*', onPublisherEvent);
      }
      targetPublisher = undefined;
    }
    unpublish().then(clearRefs).catch(clearRefs);
    window.untrackBitrate();
  }
  window.addEventListener('pagehide', shutdown);
  window.addEventListener('beforeunload', shutdown);

})(this, document, window.red5prosdk);

