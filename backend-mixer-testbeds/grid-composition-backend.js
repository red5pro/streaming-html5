const request = require('request')
const streamManagerHost = process.env.SM_HOST || 'http://127.0.0.1:7000'
const smToken = process.env.SM_TOKEN || 'abc123'

const ERROR = 'error'
const POLL_INTERVAL = 5000

let activeStreams = {}
let mixerSockets = {}
let managerSockets = {}
let videoWallSockets = {}
let activeCompositions = {}

module.exports = {
    registerWebSocketClient: (ws, params) => {
        console.log('Grid websocket connection open')
        // NOTE: we may want to return only the streams for a specific room
        // to a client. We can have the client specify the room they want for that 
        // and update the logic accordingly
        //ws.room = params['room']
        ws.type = params['type']
        if (Object.prototype.hasOwnProperty.call(params, 'id')) {
            ws.id = params['id']
        }
        else {
            ws.id = null
        }
        if (Object.prototype.hasOwnProperty.call(params, 'event-id')) {
            ws['event-id'] = params['event-id']
        }

        saveWSConnection(ws, params)
        ws.on('message', function (message) {
            console.log('WebSocket message received')
            let json = message
            if (typeof message === 'string') {
                json = JSON.parse(message)
            }
            console.log('Received: ' + JSON.stringify(json, null, 2))

            processWSMessage(ws, json)
        })

        ws.on('close', function () {
            console.log('websocket connection close')
            clearWSData(ws)
        })
    },

    registerPublishedStream: (room, streamName) => {
        const guid = `${room}/${streamName}`
        room = room === "" ? "/" : `/${room}`

        if ((!activeStreams[room] || activeStreams[room].indexOf(streamName) === -1)) {
            console.log(`Grid: add stream: ${guid} to active streams list`)
            if (!activeStreams[room]) {
                activeStreams[room] = []
            }
            activeStreams[room].push(streamName)
        }

        Object.keys(managerSockets).forEach((key) => postActiveStreams(managerSockets[key]))

        console.log(activeStreams)
    },

    unregisterUnpublishedStream: (room, streamName) => {
        console.log(`Grid: remove stream: ${room}/${streamName} from active streams list`)
        room = room === "" ? "/" : `/${room}`
        const streamsInRoom = activeStreams[room]
        if (streamsInRoom) {
            let i = streamsInRoom.length - 1
            while (i >= 0) {
                if (streamsInRoom[i] == streamName) {
                    streamsInRoom.splice(i, 1)
                    break
                }
                i--
            }
            if (i >= 0) {
                Object.keys(managerSockets).forEach((key) => postActiveStreams(managerSockets[key]))
            }
        }

        console.log('Grid: active streams: ', activeStreams)
    }
}


const updateMixerWebSocketConnectedState = (mixerNodeId, eventName, isConnected) => {

    if (!eventName || !mixerNodeId) {
        return
    }

    console.log(`updateMixerWebSocketConnectedState - eventName: ${eventName}, mixerNodeId: ${mixerNodeId}`)
    if (!activeCompositions[eventName]) {
        console.log(`Could not find composition with name: ${eventName}`)
        return
    }

    const mixers = activeCompositions[eventName].mixers
    mixers.forEach((mixer) => {
        if (mixer.id == mixerNodeId) {
            mixer.isWebSocketConnected = isConnected
            console.log(`Set state of mixer: ${mixer.id} to connected`)
        }
    })

    /*
    Object.keys(activeCompositions).forEach((name) => {
        const mixers = activeCompositions[name].mixers
        mixers.forEach((mixer) => {
            if (mixer.id == mixerId) {
                mixer.isWebSocketConnected = isConnected
            }
        })
    })
    */
}

const saveWSConnection = function (ws) {
    const id = ws.id
    const type = ws.type
    if (ws.type === 'cef' && id != null) {
        const eventId = ws['event-id']
        const mixerPageId = `${id}-${eventId}`
        mixerSockets[mixerPageId] = ws
        updateMixerWebSocketConnectedState(id, eventId, true)
        postMixerComposition(id, eventId)
        Object.keys(managerSockets).forEach((manager) => postActiveComposition(managerSockets[manager]))
    }
    else if (ws.type === 'manager' && id != null) {
        managerSockets[id] = ws
        postActiveComposition(ws)
        postActiveStreams(ws)
    }
    else {
        const error = `unknown type ${type} or id ${id}`
        console.log(error)
        sendError(ws, error)
        return
    }

    console.log(`Registered a ${type} connection`)
}

const postMixerComposition = function (mixerNodeId, eventName) {
    if (!eventName || !mixerNodeId) {
        return
    }

    console.log(`postMixerComposition - eventName: ${eventName}, mixerNodeId: ${mixerNodeId}`)
    if (!activeCompositions[eventName]) {
        console.log(`Could not find composition with name: ${eventName}`)
        return
    }

    const mixers = activeCompositions[eventName].mixers
    mixers.forEach((mixer) => {
        if (mixer.id != mixerNodeId) {
            return
        }

        const streams = mixer.streams
        if (streams && Object.hasOwnProperty.call(streams, 'muted') && Object.hasOwnProperty.call(streams, 'unmuted')) {
            const muted = streams.muted
            const unmuted = streams.unmuted
            const add = [].concat(muted).concat(unmuted)
            const id = `${mixer.id}-${eventName}`
            postCompositionUpdateToMixer(mixerSockets[id], add, [], muted, unmuted)
        }
    })
    /*Object.keys(activeCompositions).forEach((compositionName) => {
        const composition = activeCompositions[compositionName]
        const mixers = composition.mixers
        mixers.forEach((mixer) => {
            const id = mixer.id
            if (mixerId != id) {
                return
            }

            const streams = mixer.streams
            if (streams && Object.hasOwnProperty.call(streams, 'muted') && Object.hasOwnProperty.call(streams, 'unmuted')) {
                const muted = streams.muted
                const unmuted = streams.unmuted
                const add = [].concat(muted).concat(unmuted)
                postCompositionUpdateToMixer(mixerSockets[mixerId], add, [], muted, unmuted)
            }
        })
    })*/
}

const clearWSData = function (ws) {
    if (ws.type === 'cef') {
        updateMixerWebSocketConnectedState(ws.id, ws['event-id'], false)
        Object.keys(managerSockets).forEach((manager) => postActiveComposition(managerSockets[manager]))
        delete mixerSockets[`${ws.id}-${ws['event-id']}`]
    }
    else if (ws.type === 'manager') {
        delete managerSockets[ws.id]
    }
    else if (ws.type === 'videowall') {
        delete videoWallSockets[ws.id]
    }
    else {
        const error = `unknown type ${ws.type}`
        console.log(error)
        sendError(ws, error)
        return
    }

    console.log(`Cleared WebSocket client ${ws.type} with ID ${ws.id}`)
}

// WebSocket API 
const processWSMessage = function (ws, message) {
    if (!Object.prototype.hasOwnProperty.call(message, 'type')) {
        console.log(`The WebSocket message must include a type. Message received: ${message}`)
        return
    }

    const type = message.type
    if (type === 'getActiveStreams') {
        postActiveStreams(ws)
    }
    else if (type === 'createComposition') {
        createComposition(ws, message)
    }
    else if (type === 'getActiveCompositions') {
        postActiveComposition(ws)
    }
    else if (type === 'destroyComposition') {
        destroyComposition(ws, message)
    }
    else if (type === 'compositionUpdate') {
        updateComposition(ws, message)
    }
    else {
        const error = `Unrecognized type ${type}`
        console.log(error)
        sendError(ws, error)
    }
}

const postActiveStreams = function (ws) {
    let list = []
    Object.keys(activeStreams).forEach((key) => {
        if (activeStreams[key].length > 0) {
            list.push({ 'room': key, 'streams': activeStreams[key] })
        }
    })

    const payload = {
        'type': 'activeStreams',
        'list': list
    }

    ws.send(JSON.stringify(payload))
}

const postActiveComposition = function (ws) {
    let list = []
    Object.keys(activeCompositions).forEach((key) => list.push(activeCompositions[key]))

    const payload = {
        'type': 'activeCompositions',
        'list': list
    }

    ws.send(JSON.stringify(payload))
}

const sendError = function (ws, errorMessage) {
    const payload = {
        type: ERROR,
        error: errorMessage
    }
    ws.send(JSON.stringify(payload))
}

const createComposition = function (ws, message) {
    if (!Object.prototype.hasOwnProperty.call(message, 'event') ||
        !Object.prototype.hasOwnProperty.call(message, 'transcodeComposition') ||
        !Object.prototype.hasOwnProperty.call(message, 'digest') ||
        !Object.prototype.hasOwnProperty.call(message, 'mixers') ||
        !Object.prototype.hasOwnProperty.call(message, 'location')
    ) {
        const error = `The "createComposition" message must include event, transcodeComposition, digest, mixers and location fields. Received message ${message}`
        console.log(error)
        sendError(ws, error)
        return
    }

    const eventName = message.event
    const transcodeComposition = message.transcodeComposition
    const digest = message.digest
    const mixers = message.mixers
    const location = message.location

    if (typeof transcodeComposition != 'boolean') {
        const error = `transcodeComposition must be a boolean. Received message: ${message}`
        console.log(error)
        sendError(ws, error)
        return
    }

    if (!Array.isArray(mixers) || mixers.length <= 0) {
        const error = `Mixers must be a non-empty array. Received message: ${message}`
        console.log(error)
        sendError(ws, error)
        return
    }

    if (!digest) {
        const error = `Digest must be provided. Received message: ${message}`
        console.log(error)
        sendError(ws, error)
        return
    }

    if (!Array.isArray(location) || location.length != 1) {
        const error = `location must be an array with one element. Received message: ${message}`
        console.log(error)
        sendError(ws, error)
        return
    }

    // call Stream Manager API to create the composition 
    const url = `${streamManagerHost}/streammanager/api/4.0/composition?accessToken=${smToken}`
    console.log(url)
    const payload = {
        event: eventName,
        transcodeComposition,
        digest,
        mixers,
        location
    }

    makePostJsonRequest(url, payload)
        .then((response) => {
            if (response.event != eventName) {
                const error = `Unexpected event name returned by the stream manager: ${response.event}`
                console.log(error)
                sendError(ws, error)
                return
            }

            console.log(`Created composition ${eventName}, received response: `, response)

            activeCompositions[eventName] = JSON.parse(JSON.stringify(response))

            Object.keys(managerSockets).forEach((key) => {
                postActiveComposition(managerSockets[key])
            })

            pollStreamManagerForCompositionState(eventName)
                .then((response) => {
                    console.log(response)
                    // we are composing; push an activeCompositions message to the managers/editor pages 
                    Object.keys(managerSockets).forEach((key) => {
                        postActiveComposition(managerSockets[key])
                    })
                })
                .catch((error) => {
                    console.log(error)
                    sendError(ws, error)
                })
        })
        .catch((error) => {
            const errorMessage = `Failed to create ${eventName} composition, received Stream Manager error: ` + JSON.stringify(error)
            console.log(errorMessage)
            sendError(ws, errorMessage)
        })
}

const pollStreamManagerForCompositionState = function (compositionName) {
    return new Promise((resolve, reject) => {
        // call Stream Manager API to get the composition 
        const url = `${streamManagerHost}/streammanager/api/4.0/composition/${compositionName}?accessToken=${smToken}`
        console.log(url)
        makeGetRequest(url)
            .then((response) => {
                console.log(`Received response: `, response)
                const payload = JSON.parse(response)
                if (payload.event != compositionName) {
                    console.log(`Unexpected event name returned by the stream manager: ${payload.event}`)
                    return
                }

                if (!Object.hasOwnProperty.call(activeCompositions, compositionName)) {
                    activeCompositions[compositionName] = JSON.parse(JSON.stringify(payload))
                }

                const mixerData = {}
                const mixers = payload.mixers
                let areAllInService = true
                let areAllComposing = true
                let isPending = false
                let isTerminating = false
                mixers.forEach((mixer) => {
                    const state = mixer.state
                    const serverAddress = mixer.serverAddress
                    const id = `${mixer.id}-${compositionName}`
                    const isWebSocketConnected = Object.hasOwnProperty.call(mixerSockets, id)
                    if (state === 'pending') {
                        isPending |= true
                        areAllComposing &= false
                        areAllInService &= false
                    }
                    else if (state === 'terminating') {
                        isTerminating |= true
                    }
                    else if (state === 'inservice') {
                        areAllComposing &= false
                    }
                    else if (state === 'composing') {
                        areAllInService &= false
                    }

                    mixerData[mixer.id] = {
                        state,
                        serverAddress,
                        isWebSocketConnected
                    }
                })

                updateLocalActiveCompositionData(compositionName, mixerData)

                let message
                if (isTerminating) {
                    message = 'Unexpected state found: At least one Mixer is in terminating state'
                    reject(message)
                    return
                }
                else if (areAllComposing) {
                    message = 'Mixers are composing'
                    resolve(message)
                    return
                }
                else if (isPending) {
                    message = 'At least one Mixer is in pending state'
                    console.log(message)
                }
                else if (areAllInService) {
                    message = 'Mixers are inservice, but at least one Mixer is not in composing state'
                    console.log(message)
                }

                // run again 
                setTimeout((compositionName) => {
                    resolve(pollStreamManagerForCompositionState(compositionName))
                }, POLL_INTERVAL, compositionName)
            })
            .catch((error) => {
                let message = `Failed to get ${compositionName} composition, received Stream Manager error: ${JSON.stringify(error)}`
                reject(message)
            })
    })
}

const updateLocalActiveCompositionData = function (compositionName, mixerData) {
    if (!Object.hasOwnProperty.call(activeCompositions, compositionName)) {
        console.log(`Composition ${compositionName} not found`)
        return
    }

    console.log(compositionName, mixerData)
    const mixers = activeCompositions[compositionName].mixers
    mixers.forEach((mixer) => {
        const mixerNodeId = mixer.id
        if (!Object.hasOwnProperty.call(mixerData, mixerNodeId)) {
            return
        }

        if (Object.hasOwnProperty.call(mixerData[mixerNodeId], 'state')) {
            mixer.state = mixerData[mixerNodeId].state
        }
        if (Object.hasOwnProperty.call(mixerData[mixerNodeId], 'serverAddress')) {
            mixer.serverAddress = mixerData[mixerNodeId].serverAddress
        }
        if (Object.hasOwnProperty.call(mixerData[mixerNodeId], 'isWebSocketConnected')) {
            mixer.isWebSocketConnected = mixerData[mixerNodeId].isWebSocketConnected
        }
    })
    console.log(JSON.stringify(activeCompositions))
}

const destroyComposition = function (ws, message) {
    if (!Object.prototype.hasOwnProperty.call(message, 'event')) {
        const errorMessage = `The "destroyComposition" message must include an event field. Received message ${message}`
        console.log(errorMessage)
        sendError(ws, errorMessage)
        return
    }

    const eventName = message.event
    if (!Object.prototype.hasOwnProperty.call(activeCompositions, eventName)) {
        const errorMessage = `A composition with name ${eventName} was not found.`
        console.log(errorMessage)
        sendError(ws, errorMessage)
        return
    }

    // call Stream Manager API to destroy the composition 
    const url = `${streamManagerHost}/streammanager/api/4.0/composition/${eventName}?accessToken=${smToken}`
    makeDeleteRequest(url)
        .then((response) => {
            console.log(`Composition ${eventName} has been destroyed. Received response: `, JSON.stringify(response))
        })
        .catch((error) => {
            const errorMessage = `Stream Manager returned error when attempting to destroy ${eventName} composition. Received Stream Manager error: ` + JSON.stringify(error)
            console.log(errorMessage)
            sendError(ws, errorMessage)
        })
        .finally(() => {
            delete activeCompositions[eventName]
            Object.keys(managerSockets).forEach((key) => {
                postActiveComposition(managerSockets[key])
                postActiveStreams(managerSockets[key])
            })
        })
}

const updateComposition = function (ws, message) {
    if (!Object.prototype.hasOwnProperty.call(message, 'list') ||
        !Object.prototype.hasOwnProperty.call(message, 'event')
    ) {
        const errorMessage = `The "compositionUpdate" message must include an event and list. Received message ${message}`
        console.log(errorMessage)
        sendError(ws, errorMessage)
        return
    }

    const eventName = message.event
    const list = message.list
    if (!Object.prototype.hasOwnProperty.call(activeCompositions, eventName)) {
        const errorMessage = `Composition ${eventName} not found.`
        console.log(errorMessage)
        sendError(ws, errorMessage)
        return
    }

    list.forEach((compositionUpdate) => {
        if (!Object.prototype.hasOwnProperty.call(compositionUpdate, 'cef-id')) {
            const errorMessage = `cef-id missing. Ignoring object ${compositionUpdate}`
            console.log(errorMessage)
            sendError(ws, errorMessage)
            return
        }

        const mixerNodeId = compositionUpdate['cef-id']
        let isMixerConnected = true
        const mixerPageId = `${mixerNodeId}-${eventName}`
        if (!Object.prototype.hasOwnProperty.call(mixerSockets, mixerPageId)) {
            console.log(`Mixer with id ${mixerPageId} is not connected yet.`)
            isMixerConnected = false
        }

        let add = compositionUpdate.add
        let remove = compositionUpdate.remove
        let mute = compositionUpdate.mute
        let unmute = compositionUpdate.unmute
        if (!Object.prototype.hasOwnProperty.call(compositionUpdate, 'add')) {
            add = []
        }
        if (!Object.prototype.hasOwnProperty.call(compositionUpdate, 'remove')) {
            remove = []
        }
        if (!Object.prototype.hasOwnProperty.call(compositionUpdate, 'mute')) {
            mute = []
        }
        if (!Object.prototype.hasOwnProperty.call(compositionUpdate, 'unmute')) {
            unmute = []
        }

        if (!Array.isArray(add) || !Array.isArray(remove) || !Array.isArray(mute) || !Array.isArray(unmute)) {
            console.log(`add, remove, mute or mute must be arrays. Ignoring object ${compositionUpdate}`)
            return
        }

        if (isMixerConnected) {
            postCompositionUpdateToMixer(mixerSockets[mixerPageId], add, remove, mute, unmute)
        }
        updateLocalCompositionStreamData(mixerNodeId, eventName, add, remove, mute, unmute)
    })

    // send composition update to managers/editors 
    Object.keys(managerSockets).forEach((key) => {
        postActiveComposition(managerSockets[key])
    })
}

const postCompositionUpdateToMixer = function (ws, add, remove, mute, unmute) {
    const type = 'compositionUpdate'
    const payloadForMixer = {
        type,
        add,
        remove,
        mute,
        unmute
    }
    console.log('to mixer', payloadForMixer)
    ws.send(JSON.stringify(payloadForMixer))
}

const updateLocalCompositionStreamData = function (id, eventName, add, remove, mute, unmute) {
    console.log(JSON.stringify(activeCompositions))
    console.log(id, eventName, add, remove, mute, unmute)
    const composition = activeCompositions[eventName]
    const mixers = composition.mixers
    mixers.filter(mixer => mixer.id == id).forEach((mixer) => {
        if (!Object.prototype.hasOwnProperty.call(mixer, 'streams')) {
            // first update so we don't have any existing data
            const muteMap = {}
            const unmuteMap = {}
            mute.forEach((stream) => muteMap[stream] = stream)
            unmute.forEach((stream) => unmuteMap[stream] = stream)
            console.log(muteMap, unmuteMap)
            add.forEach((stream) => {
                if (!Object.prototype.hasOwnProperty.call(muteMap, stream) &&
                    !Object.prototype.hasOwnProperty.call(unmuteMap, stream)
                ) {
                    // default to unmuted 
                    unmute.push(stream)
                }
            })

            mixer.streams = {
                'muted': mute,
                'unmuted': unmute
            }
        }
        else {
            // general update with existing data
            // new ones 
            const muteMap = {}
            const unmuteMap = {}
            mute.forEach((stream) => muteMap[stream] = stream)
            unmute.forEach((stream) => unmuteMap[stream] = stream)
            // existing ones 
            const currentMuteMap = {}
            const currentUnmuteMap = {}
            mixer.streams.muted.forEach((stream) => currentMuteMap[stream] = stream)
            mixer.streams.unmuted.forEach((stream) => currentUnmuteMap[stream] = stream)

            console.log(muteMap, unmuteMap, currentMuteMap, currentUnmuteMap)

            remove.forEach((stream) => {
                if (Object.prototype.hasOwnProperty.call(currentMuteMap, stream)) {
                    delete currentMuteMap[stream]
                }
                else if (Object.prototype.hasOwnProperty.call(currentUnmuteMap, stream)) {
                    delete currentUnmuteMap[stream]
                }
            })

            add.forEach((stream) => {
                if (!Object.prototype.hasOwnProperty.call(muteMap, stream) &&
                    !Object.prototype.hasOwnProperty.call(unmuteMap, stream)
                ) {
                    // default to unmuted 
                    unmute.push(stream)
                }
            })

            mute.forEach((stream) => {
                if (!Object.prototype.hasOwnProperty.call(currentMuteMap, stream)) {
                    currentMuteMap[stream] = stream
                    delete currentUnmuteMap[stream]
                }
            })

            unmute.forEach((stream) => {
                if (!Object.prototype.hasOwnProperty.call(currentUnmuteMap, stream)) {
                    currentUnmuteMap[stream] = stream
                    delete currentMuteMap[stream]
                }
            })

            mixer.streams.muted = Object.keys(currentMuteMap)
            mixer.streams.unmuted = Object.keys(currentUnmuteMap)
        }
    })

    console.log(JSON.stringify(activeCompositions))
}


const makePostJsonRequest = async function (url, payload) {
    return new Promise((resolve, reject) => {
        request.post(
            url,
            {
                json: payload
            },
            function (error, response, body) {
                if (!error && response.statusCode < 300) {
                    console.log('success')
                    resolve(body)
                }
                else {
                    console.log(error)
                    reject(error)
                }
            }
        )
    })
}

const makeGetRequest = async function (url) {
    return new Promise((resolve, reject) => {
        request.get(
            url,
            function (error, response, body) {
                if (!error && response.statusCode < 300) {
                    resolve(body)
                }
                else {
                    console.log(error)
                    reject(error)
                }
            }
        )
    })
}

const makeDeleteRequest = async function (url) {
    return new Promise((resolve, reject) => {
        request.delete(
            url,
            function (error, response, body) {
                if (!error && response.statusCode < 300) {
                    resolve(body)
                }
                else {
                    console.log(error)
                    reject(error)
                }
            }
        )
    })
}