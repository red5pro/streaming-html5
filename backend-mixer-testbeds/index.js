const WebSocketServer = require('ws').Server
const http = require('http')
const https = require('https')
const express = require('express')
const request = require('request')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
let port = process.env.PORT || 8001
const fs = require('fs');
const streamManagerHost = process.env.SM_HOST || 'http://127.0.0.1:7000'
const restAdminToken = process.env.REST_ADMIN_TOKEN || '123abcz'
const smToken = process.env.SM_TOKEN || 'abc123'
const ERROR = 'error'
const POLL_INTERVAL = 5000

let cert
let key

const useSSL = streamManagerHost != 'http://127.0.0.1:7000';
if (useSSL) {
  cert = fs.readFileSync('/etc/letsencrypt/live/nex-118-test-azure-mixer.red5.net/fullchain.pem')
  key = fs.readFileSync('/etc/letsencrypt/live/nex-118-test-azure-mixer.red5.net/privkey.pem')
  port = 443
}

app.use(bodyParser.json())
app.use(cors())
app.options('*', cors())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.post('*', function (request, response, next) {
  if (!request.body || !request.body.username || !request.body.password || !request.body.token) {
    const error = 'Username, password or token not found in POST request'
    console.log(error)
    request.status(400).send(error)
    return
  }

  next();
})

// RTA authenticate credentials
app.post('/validateCredentials', function (request, response) {
  console.log('\nValidate call');
  console.log(request.body);

  let room = ""
  let token = ""
  let username = request.body.username
  let password = request.body.password
  if (request.body.token) {
    try {
      console.log(decodeURIComponent(request.body.token))
      const authToken = JSON.parse(decodeURIComponent(request.body.token))

      if (authToken.room) {
        room = authToken.room
      }
      if (authToken.token) {
        token = authToken.token
      }
    } catch (error) {
      console.log(error)
    }
  }
  let streamName = request.body.streamID
  let userType = request.body.type
  let roomMap = streamList.hasOwnProperty(room) ? streamList[room] : undefined
  let excludedMap = excludedList.hasOwnProperty(room) ? excludedList[room] : undefined
  let credentialsMap = publisherCredentialsMap.hasOwnProperty(room) ? publisherCredentialsMap[room] : undefined

  if (userType === "publisher") {
    if ((!roomMap || roomMap.indexOf(streamName) === -1) &&
      (!excludedMap || excludedMap.indexOf(streamName) === -1)) {
      console.log('Add stream: ' + streamName)
      console.log(roomMap)
      if (!roomMap) {
        streamList[room] = []
      }
      streamList[room].push(streamName)
    }
    if (!credentialsMap) {
      credentialsMap = {}
      publisherCredentialsMap[room] = credentialsMap
    }

    credentialsMap[streamName] = { username, password, token }
    console.log(credentialsMap)
    console.log(streamList[room])

    for (var i in clients) {
      if (clients[i].room != room) {
        continue
      }
      postActiveList(clients[i], room, streamList[room])
    }
  }

  // response for valid request
  response.status(200).send({ "result": true });

  // response for invalid request
  //response.status(400).send({"result":false});
});

// RTA invalidate credentials
app.post('/invalidateCredentials', function (request, response) {
  console.log('\nInvalidate call');
  console.log(request.body);

  let room = ""
  let token = ""
  let username = request.body.username
  let password = request.body.password
  if (request.body.token) {
    const authToken = request.body.token
    if (authToken.room) {
      room = authToken.room
    }
    if (authToken.token) {
      token = authToken.token
    }
  }

  let index = -1
  let streamName = request.body.streamID
  let roomMap = streamList.hasOwnProperty(room) ? streamList[room] : undefined
  let excludedMap = excludedList.hasOwnProperty(room) ? excludedList[room] : undefined
  let conferenceMap = conferenceList.hasOwnProperty(room) ? conferenceList[room] : undefined
  let presenter = presenterList.hasOwnProperty(room) ? presenterList[room] : undefined
  let credentialsMap = publisherCredentialsMap.hasOwnProperty(room) ? publisherCredentialsMap[room] : undefined
  if (roomMap) {
    index = roomMap.indexOf(streamName)
    if (index > -1) {
      console.log('Remove stream: ' + streamName)
      roomMap.splice(index, 1)
    }
  }
  if (conferenceMap) {
    index = conferenceMap.indexOf(streamName)
    if (index > -1) {
      console.log('Remove conference stream: ' + streamName)
      conferenceMap.splice(index, 1)
    }
  }
  if (presenter) {
    if (presenter === streamName) {
      presenter[room] = undefined
    }
  }
  if (credentialsMap && credentialsMap.hasOwnProperty(streamName)) {
    //console.log('Remove token: ' + userIdMap[streamName])
    delete credentialsMap[streamName]
  }
  if (excludedMap && roomMap.length <= 0) {
    console.log('delete excluded list')
    delete excludedList[room]
  }
  for (var i in clients) {
    if (clients[i].room != room) {
      continue
    }
    postActiveList(clients[i], room, streamList[room])
  }

  // response for valid request
  response.status(200).send({ "result": true });

  // response for invalid request
  //response.status(400).send({"result":false});
});

let server
if (useSSL) {
  let options = {
    cert: cert,
    key: key
  };

  server = https.createServer(options, app);
}
else {
  server = http.createServer(app)
}
server.listen(port)
console.log('Mock Socket Server running on ' + port + '.')

let clients = []
let publisherCredentialsMap = {} // by room for stream suppression
let streamList = {} // by room
let excludedList = {} // by room
let presenterList = {} // by room
let conferenceList = {} // by room

const postActiveStreams = function (ws) {
  let list = []
  Object.keys(activeStreams).forEach((key) => {
    if (activeStreams[key].length > 0 && key == ws.room) {
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
  console.log('post active composition')
  let list = []
  Object.keys(activeCompositions).forEach((key) => {
    const composition = activeCompositions[key]
    const roomName = getCompositeStreamRoomFromPayload(composition)
    if (roomName == ws.room || ((roomName + '_wr') == ws.room)) {
      list.push(composition)
    }
  })

  const payload = {
    'type': 'activeCompositions',
    'room': ws.room,
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

let activeStreams = {}
let mixerSockets = {}
let activeCompositions = {}
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
  const payload = {
    event: eventName,
    transcodeComposition,
    digest,
    mixers,
    location
  }

  const compositeStreamRoomName = getCompositeStreamRoomFromPayload(payload)
  if (!compositeStreamRoomName) {
    const error = `Multiple mixers with empty "destinationMixerName" found. Only one mixer, the final one, can have empty "destinationMixerName"`
    console.log(error)
    sendError(ws, error)
    return
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

      for (var i in clients) {
        if (clients[i].isHost &&
          (clients[i].room == compositeStreamRoomName || clients[i].room == compositeStreamRoomName + '_wr')) {
          postActiveComposition(clients[i])
        }
      }

      pollStreamManagerForCompositionState(eventName)
        .then((response) => {
          console.log(response)
          // we are composing; push an activeCompositions message to the managers/editor pages 
          for (var i in clients) {
            if (clients[i].isHost && (clients[i].room == compositeStreamRoomName || clients[i].room == compositeStreamRoomName + '_wr')) {
              postActiveComposition(clients[i])
            }
          }
        })
        .catch((error) => {
          console.log(error)
        })
    })
    .catch((error) => {
      const errorMessage = `Failed to create ${eventName} composition, received Stream Manager error: ` + JSON.stringify(error)
      console.log(errorMessage)
      sendError(ws, errorMessage)
    })
}

const getCompositeStreamRoomFromPayload = function (compositionPayload) {
  if (!compositionPayload || !compositionPayload.hasOwnProperty('mixers')) {
    return undefined
  }

  const mixers = compositionPayload.mixers
  const matches = mixers.filter(mixer => mixer.destinationMixerName == "")
  if (matches.length != 1) {
    return undefined
  }

  return matches[0].path
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
          const errorMessage = `Unexpected event name returned by the stream manager: ${payload.event}`
          reject(errorMessage)
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
          const isWebSocketConnected = Object.hasOwnProperty.call(mixerSockets, mixer.id)
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
    const errorMessage = `Composition ${compositionName} not found`
    console.log(errorMessage)
    return
  }

  console.log(compositionName, mixerData)
  const mixers = activeCompositions[compositionName].mixers
  mixers.forEach((mixer) => {
    const mixerId = mixer.id
    if (!Object.hasOwnProperty.call(mixerData, mixerId)) {
      return
    }

    if (Object.hasOwnProperty.call(mixerData[mixerId], 'state')) {
      mixer.state = mixerData[mixerId].state
    }
    if (Object.hasOwnProperty.call(mixerData[mixerId], 'serverAddress')) {
      mixer.serverAddress = mixerData[mixerId].serverAddress
    }
    if (Object.hasOwnProperty.call(mixerData[mixerId], 'isWebSocketConnected')) {
      mixer.isWebSocketConnected = mixerData[mixerId].isWebSocketConnected
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
      const compositeStreamRoomName = getCompositeStreamRoomFromPayload(activeCompositions[eventName])
      console.log(`Composition ${eventName} has been destroyed. Received response: `, JSON.stringify(response))
      delete activeCompositions[eventName]
      for (var i in clients) {
        if (clients[i].isHost && (clients[i].room == compositeStreamRoomName || clients[i].room == compositeStreamRoomName + '_wr')) {
          postActiveComposition(clients[i])
          postActiveStreams(clients[i])
        }
      }
    })
    .catch((error) => {
      const errorMessage = `Failed to destroy ${eventName} composition, received Stream Manager error: ` + JSON.stringify(error)
      console.log(errorMessage)
      sendError(ws, errorMessage)
    })
}

var postActiveList = function (ws, room, list) {
  var obj = {
    type: 'active',
    room: room,
    screenshareName: getScreenshareName(list),
    streams: list
  }
  ws.send(JSON.stringify(obj))
}

var postExcludedList = function (ws, room, list) {
  var obj = {
    type: 'excluded',
    room: room,
    streams: list
  }
  ws.send(JSON.stringify(obj))
}

var postConferenceList = function (ws, room, list) {
  var presenterName = presenterList[room]
  var obj = {
    type: 'conference',
    presenter: presenterName,
    room: room,
    streams: list
  }
  ws.send(JSON.stringify(obj))
}

var updateStreamListFromMessage = function (payload, ws) {
  var index = -1
  var room = payload.room
  var streamName = payload.streamName
  var roomMap = streamList.hasOwnProperty(room) ? streamList[room] : undefined
  var excludedMap = excludedList.hasOwnProperty(room) ? excludedList[room] : undefined
  var conferenceMap = conferenceList.hasOwnProperty(room) ? conferenceList[room] : undefined

  if (!roomMap) {
    streamList[room] = []
    roomMap = streamList[room]
  }
  if (!excludedMap) {
    excludedList[room] = []
    excludedMap = excludedList[room]
  }
  if (!conferenceMap) {
    conferenceList[room] = []
    conferenceMap = conferenceList[room]
  }

  if (payload.type === 'post') {
    if ((roomMap.indexOf(streamName) === -1) &&
      (excludedMap.indexOf(streamName) === -1)) {
      console.log('Add stream: ' + streamName)
      ws.room = room
      ws.stream_name = streamName
      streamList[room].push(streamName)
    }
  } else if (payload.type === 'delete') {
    index = roomMap.indexOf(streamName)
    if (index > -1) {
      console.log('Remove stream: ' + streamName)
      roomMap.splice(index, 1)
    }
    index = excludedMap.indexOf(streamName)
    if (index > -1) {
      console.log('Remove excluded stream: ' + streamName)
      excludedMap.splice(index, 1)
    }
    index = conferenceMap.indexOf(streamName)
    if (index > -1) {
      console.log('Remove conference stream: ' + streamName)
      conferenceMap.splice(index, 1)
    }
    if (presenterList[room] === streamName) {
      presenterList[room] = conferenceMap.length > 0 ? conferenceMap[0] : undefined
    }
  } else if (payload.type === 'exclude') {
    // StreamName will come in as top-level GUID.
    // Note [TODO]: We need to shut down all variants.
    // The terminateClient call will take care of this by shutting down 
    // all clients that have published with a certain token
    let credentialsMap = publisherCredentialsMap.hasOwnProperty(room) ? publisherCredentialsMap[room] : undefined
    if (credentialsMap && credentialsMap.hasOwnProperty(streamName)) {
      var credentials = credentialsMap[streamName]
      if (streamManagerHost !== '') {
        broadcastTerminateClient(credentials, '')
      }
      else {
        terminateClient('127.0.0.1', credentials)
      }
    }
    else {
      console.warn('Could NOT find the token for stream ' + streamName + ' in room ' + room)
      console.log(publisherCredentialsMap)
    }

    if (!excludedMap) {
      excludedList[room] = []
    }
    excludedList[room].push(streamName)

    if (roomMap) {
      index = roomMap.indexOf(streamName)
      if (index > -1) {
        console.log('Remove stream: ' + streamName)
        roomMap.splice(index, 1)
      }
    }
    index = conferenceMap.indexOf(streamName)
    if (index !== -1) {
      console.log('Remove conference stream: ' + streamName)
      conferenceMap.splice(index, 1)
    }
    if (presenterList[room] === streamName) {
      presenterList[room] = conferenceMap.length > 0 ? conferenceMap[0] : undefined
    }
    excludedList[room].push(streamName)
  } else if (payload.type === 'promote') {
    index = conferenceMap.indexOf(streamName)
    if (index === -1 &&
      (excludedMap.indexOf(streamName) === -1)) {
      console.log('Promote stream: ' + streamName)
      if (conferenceMap.length === 0) {
        presenterList[room] = streamName
      }
      conferenceMap.push(streamName)
    }
  } else if (payload.type === 'demote') {
    index = conferenceMap.indexOf(streamName)
    if (index !== -1) {
      console.log('Demote stream: ' + streamName)
      conferenceMap.splice(index, 1)
    }
    if (presenterList[room] === streamName) {
      presenterList[room] = conferenceMap.length > 0 ? conferenceMap[0] : undefined
    }
  } else if (payload.type === 'presenter') {
    presenterList[room] = streamName
  } else if (payload.type === 'order') {
    console.log('RECEIVED ORDER')
    var order = payload.order
    if (index !== order && conferenceMap.length > order) {
      conferenceMap.splice(index, 1)
      conferenceMap.splice(order, 0, streamName)
    }
  }
  else {
    console.log(`Unrecognized type ${payload.type}`)
    return
  }

  if (payload.type === 'exclude') {
    var i
    for (i in clients) {
      if (clients[i].room != room) {
        continue
      }
      postExcludedList(clients[i], room, excludedList[room])
    }
  }
  for (i in clients) {
    if (clients[i].room != room) {
      continue
    }

    postActiveList(clients[i], room, streamList[room])
    if (clients[i].isHost || clients[i].isMixer) {
      postConferenceList(clients[i], room, conferenceList[room])
    }
  }

  console.log('Stream list: ' + streamList[room].join(','))
}

const processWSMessage = function (payload, ws) {
  if (payload.type === 'createComposition') {
    createComposition(ws, payload)
  }
  else if (payload.type === 'getActiveCompositions') {
    postActiveComposition(ws)
  }
  else if (payload.type === 'destroyComposition') {
    destroyComposition(ws, payload)
  }
  else if (payload.type === 'error') {
    console.warn(payload)
  }
  else {
    updateStreamListFromMessage(payload, ws)
  }
}

var getScreenshareName = function (list) {
  if (!list) return undefined
  var screenshareName = list.filter(function (item) {
    return item.match('_screenshare')
  })
  return screenshareName.length > 0 ? screenshareName[0] : undefined
}

var wss = new WebSocketServer({ server: server })
wss.on('connection', function (ws, req) {
  console.log('websocket connection open')
  var q = req.url.split('?')[1]
  var kvs = q.split('&')
  var params = {}
  for (var i = 0; i < kvs.length; i++) {
    var kv = kvs[i].split('=')
    params[kv[0]] = kv[1]
  }
  ws.room = params.room
  ws.isHost = params.hasOwnProperty('host') && params.host === 'true'
  ws.isMixer = params.hasOwnProperty('mixer') && params.mixer === 'true'

  console.log(req.url)

  postActiveList(ws, ws.room, streamList[ws.room])
  if (ws.isHost || ws.isMixer) {
    postConferenceList(ws, ws.room, conferenceList[ws.room])
    postActiveComposition(ws)
  }
  clients.push(ws)
  ws.on('message', function (message) {
    console.log('WebSocket message received')
    var json = message
    if (typeof message === 'string') {
      json = JSON.parse(message)
    }
    console.log('Received: ' + JSON.stringify(json, null, 2))

    //updateStreamListFromMessage(json, ws)
    processWSMessage(json, ws)

  })
  ws.on('close', function () {
    console.log('websocket connection close')
    if (!ws.stream_name) return
    updateStreamListFromMessage({
      type: 'delete',
      room: ws.room,
      streamName: ws.stream_name
    }, ws)
    var index = clients.indexOf(ws)
    clients.splice(index, 1)
  })
})

var terminateClient = function (host, credentials) {
  var url = "http://" + host + `:5080/mixertestbeds/admin/suppress-client?adminToken=${restAdminToken}`
  var json = { ...credentials }
  makeRequest(url, json)
}

var broadcastTerminateClient = function (credentials, type) {
  var url = streamManagerHost + `/mixertestbeds/admin/broadcast-suppress-client?adminToken=${restAdminToken}`
  var json = { ...credentials, type: type != undefined ? type : "" }
  makeRequest(url, json)
}

var makeRequest = function (url, body) {
  request.post(
    url,
    { json: body },
    function (error, response) {
      if (!error && response.statusCode == 200) {
        console.log('Client terminated')
      }
      else {
        console.log(error)
      }
    }
  )
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
