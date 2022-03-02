window.fetch = (url, options) => {
    //console.log('mock fetch ', url)
    const isUpdateNodeGraphRequest = url.match(/streammanager\/api\/4.0\/composition\/event1\/nodegraph/)
    const isCompositionDetailsRequest = url.match(/streammanager\/api\/4.0\/composition\/event1/)
    const isCompositionDetailsEvent2Request = url.match(/streammanager\/api\/4.0\/composition\/event2/)
    const isCompositionListRequest = url.match(/streammanager\/api\/4.0\/composition/)
    const method = options != null ? options.method : null

    const isOriginRequest = url.match(/\?action=broadcast/)
    const isEdgeRequest = url.match(/\?action=subscribe/)
    const compositionListJson = ['event2', 'event3']
    const compositionDetailsJson = {
        "event": "event1",
        "transcodeComposition": "true",
        "mixers": [
            {
                "id": "sm-node-mixer-test-nyc3-1611241570129",
                "location": "nyc3",
                "serverAddress": "57.44.23.21",
                "destination": "87.34.23.21",
                "state": "inservice",
                "destinationMixerName": "",
                "mixerName": "1",
                "path": "live",
                "streamName": "stream1",
                "width": "1280",
                "height": "720",
                "framerate": "30",
                "bitrate": "1500",
                "doForward": "true",
                "audioSampleRate": "48000",
                "audioChannels": "2",
                "submixes": "1",
            }
        ]
    }
    const compositionDetailsEvent2Json = {
        "event": "event2",
        "transcodeComposition": "true",
        "mixers": [
            {
                "id": "sm-node-mixer-test-nyc3-1611241570129",
                "location": "nyc3",
                "serverAddress": "57.44.23.21",
                "destination": "87.34.23.21",
                "state": "inservice",
                "mixerName": "1",
                "path": "live",
                "streamName": "stream1",
                "width": "1280",
                "height": "720",
                "framerate": "30",
                "bitrate": "1500",
                "doForward": "true",
                "audioSampleRate": "48000",
                "audioChannels": "2",
                "submixes": "1",
            }
        ]
    }
    const updateNodeGraphJson = {
    }
    const streamJson = {
        serverAddress: 'localhost',
        scope: 'live',
        name: 'stream1'
    }
    const streamListJson = [
        {
            'type': 'edge',
            'name': 'stream1',
            'scope': 'live',
            'serverAddress': 'localhost',
            'region': 'us-east-1'
        },
        {
            'type': 'edge',
            'name': 'stream1_1',
            'scope': 'live',
            'serverAddress': 'localhost',
            'region': 'us-east-1'
        }
    ]
    let payload
    if (isUpdateNodeGraphRequest) {
        payload = updateNodeGraphJson
    } else if (isCompositionDetailsEvent2Request) {
        payload = compositionDetailsEvent2Json
    } else if (isCompositionDetailsRequest) {
        payload = compositionDetailsJson
    } else if (isCompositionListRequest) {
        payload = method == 'GET' ? compositionListJson : compositionDetailsJson
    } else if (isStreamListRequest) {
        payload = streamListJson
    } else {
        console.log(`Could not mock request on fetch: ${url}`)
    }
    var response = {
        status: 200,
        headers: {
            get: (type) => {
                if (type === 'content-type') return 'application/json'
            }
        },
        json: () => {
            return new Promise(resolve => {
                resolve(payload)
            })
        }
    }
    return new Promise(resolve => {
        resolve(response)
    })
}