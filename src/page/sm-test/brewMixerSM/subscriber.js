		/// ----------------------------------
		// ---- subscriber junk
		
		// Local subscriber lifecycle notifications.
		
		  const getAuthenticationParams = () => {
			    const { authentication } = configuration
			    const { enabled, username, password, token } = authentication
			    return enabled
			      ? {
			          connectionParams: {
			            username,
			            password,
			            token,
			          },
			        }
			      : {}
			  }
		  
		  const getSocketLocationFromProtocol = () => {
			    return !isSecure
			      ? { protocol: 'ws', port: serverSettings.wsport }
			      : { protocol: 'wss', port: serverSettings.wssport }
			  }


		  const defaultConfiguration = ((useVideo, useAudio) => {
			    let c = {
			      protocol: getSocketLocationFromProtocol().protocol,
			      port: getSocketLocationFromProtocol().port,
			    }
			    if (!useVideo) {
			      c.videoEncoding = red5prosdk.PlaybackVideoEncoder.NONE
			    }
			    if (!useAudio) {
			      c.audioEncoding = red5prosdk.PlaybackAudioEncoder.NONE
			    }
			    return c
			  })(configuration.useVideo, configuration.useAudio)

			  function onSubscriberEvent(event, name) {
//			console.log("subscriber event: " + event.type)
		    if (event.type !== 'Subscribe.Time.Update') {
//		        console.log('[Red5ProSubscriber] ' + event.type + '.');
		        if (event.type === 'Subscribe.VideoDimensions.Change') {
		        	sizeCanvas(event.data.width, event.data.height);
		        	setState(OverlayStates.IDLE);
		        } else if (event.type === 'Subscribe.Stop' || event.type === 'Subscribe.Fail' || event.type === 'Subscribe.Connection.Closed') {
		        	setState(OverlayStates.NOT_RUNNING);
		        }
		    }
		}
		
		
		  const getRegionIfDefined = () => {
			    const region = configuration.streamManagerRegion
			    if (
			      typeof region === 'string' &&
			      region.length > 0 &&
			      region !== 'undefined'
			    ) {
			      return region
			    }
			    return undefined
			  }
		  
		  const getConfiguration = () => {
			    const {
			      host,
			      streamManagerAPI,
			      preferWhipWhep,
			      streamManagerNodeGroup: nodeGroup,
			    } = configuration
			    const { protocol, port } = getSocketLocationFromProtocol()

			    const region = getRegionIfDefined()
			    const params = region
			      ? {
			          region,
			          strict: true,
			        }
			      : undefined

			    const httpProtocol = protocol === 'wss' ? 'https' : 'http'
			    const endpoint = !preferWhipWhep
			      ? `${protocol}://${host}:${port}/as/${streamManagerAPI}/proxy/ws/subscribe/${streamPath}/${streamName}`
			      : `${httpProtocol}://${host}:${port}/as/${streamManagerAPI}/proxy/whep/${streamPath}/${streamName}`

			    var connectionParams = params
			      ? { ...params, ...getAuthenticationParams().connectionParams }
			      : getAuthenticationParams().connectionParams

			    var rtcConfig = {
			      ...configuration,
			      ...defaultConfiguration,
			      endpoint,
			      streamName: streamName,
			      subscriptionId: 'subscriber-' + instanceId,
			      connectionParams: {
			        ...connectionParams,
			        nodeGroup,
			      },
			    }
			    return rtcConfig
			  }		
		
		async function startSubscription() {

		    try {
		        const { RTCSubscriber, WHEPClient } = window.red5prosdk
		        // const { preferWhipWhep, streamName } = configuration
		        
		        const { preferWhipWhep } = configuration
		        const config = getConfiguration()
		        const subscriber = preferWhipWhep ? new WHEPClient() : new RTCSubscriber()
		        subscriber.on('*', onSubscriberEvent)
		        await subscriber.init(config)
		        await subscriber.subscribe()
		        onSubscribeSuccess(subscriber)
		        streamTitle.innerText = streamName
		        targetSubscriber = subscriber
		      } catch (error) {
		    	  // XXX this doesn' work? i need to see the fricken message
//		        var jsonError =
//		          typeof error === 'string' ? error : JSON.stringify(error, null, 2)
		        console.error(
		          '[Red5ProSubscriber] :: Error in access of Edge IP: ' + error + " for stream " + getConfiguration().streamName
		        )
//		        updateStatusFromEvent({
//		          type: red5prosdk.SubscriberEventTypes.CONNECT_FAILURE,
//		        })
//		        onSubscribeFail(jsonError)
		      }

		      /*
			
			// Create a new instance of the WebRTC subcriber.
			var subscriber = new window.red5prosdk.RTCSubscriber();
	
			const wsProtocol = (location.protocol === 'https:') ? "wss" : "ws";
			const wsPort = (location.port) ? location.port : ((location.protocol === 'https:') ? 443 : 5080);

			// Initialize
			subscriber.init({
				protocol: wsProtocol,
				port: wsPort,
				host: host,
				app: streamPath,
				streamName: streamName,
				rtcConfiguration: { 
				iceServers: [{urls: 'stun:stun2.l.google.com:19302'}],
				iceCandidatePoolSize: 2,
				bundlePolicy: 'max-bundle'
				}, // See https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary
				mediaElementId: 'red5pro-subscriber',
				subscriptionId: streamName + Math.floor(Math.random() * 0x10000).toString(16),
				videoEncoding: 'NONE',
				audioEncoding: 'NONE'
			})
			.then(function(subscriber) {
				// `subcriber` is the WebRTC Subscriber instance.
		        subscriber.on('*', function(event){
		          onSubscriberEvent(event);
		        });
				return subscriber.subscribe();
			})
			.then(function(subscriber) {
				// subscription is complete.
				// playback should begin immediately due to
				//   declaration of `autoplay` on the `video` element.
			})
			.catch(function(error) {
				// A fault occurred while trying to initialize and playback the stream.
				console.error(error)
			});
			*/
		}
		// ---- /subscriber junk