const WebSocketServer = require('ws').Server
const http = require('http')
const https = require('https')
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const conferenceBackend = require('./conference-backend')
const gridCompositionBackend = require('./grid-composition-backend')
let port = process.env.PORT || 8001
const fs = require('fs');
const streamManagerHost = process.env.SM_HOST || 'http://127.0.0.1:7000'
const certPath = process.env.CERT || '/etc/letsencrypt/live/a.b.c/fullchain.pem'
const keyPath = process.env.KEY || '/etc/letsencrypt/live/a.b.c/privkey.pem'

const useSSL = streamManagerHost != 'http://127.0.0.1:7000';
let key
let cert
if (useSSL) {
    cert = fs.readFileSync(certPath)
    key = fs.readFileSync(keyPath)
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

// webhooks from live app
app.post('/webhook', function (request, response) {
    console.log('\nWebhook Call');
    console.log(request.body);
    /* expected body
       {
           "event":"stream-published"|"stream-unpublished",
           "guid":"<app>/<room-1>/../<room-n>/<stream-name>"
       }
    */

    if (!request.body.event || !request.body.guid) {
        console.log(`Webhook call must include event and guid fields`)
        return response.status(400).send()
    }

    const {
        context,
        streamName
    } = getContextAndStreamNames(request.body.guid)
    const event = request.body.event
    if (event === 'stream-published') {
        conferenceBackend.registerPublishedStream(context, streamName)
        gridCompositionBackend.registerPublishedStream(context, streamName)
    }
    else if (event === 'stream-unpublished') {
        conferenceBackend.unregisterUnpublishedStream(context, streamName)
        gridCompositionBackend.unregisterUnpublishedStream(context, streamName)
    }
    else {
        console.log(`Unknown event: ${JSON.stringify(request.body)}`)
    }

    // response for valid request
    response.status(200).send({ "result": true });

    // response for invalid request
    //response.status(400).send({"result":false});
});

const getContextAndStreamNames = (guid) => {
    "<app>/<room-1>/../<room-n>/<stream-name>"
    const splits = guid.split('/')
    const streamName = splits[splits.length - 1]
    splits.splice(splits.length - 1, 1)
    const context = splits.join('/')
    return {
        context, streamName
    }
}

// RTA authenticate credentials
app.post('/validateCredentials', function (request, response) {
    console.log('\nValidate call')
    console.log(request.body)

    if (!request.body || !request.body.username || !request.body.password) {
        const error = 'Username or password not found in POST request'
        console.log(error)
        response.status(400).send(error)
        return
    }

    // response for valid request
    response.status(200).send({ "result": true });

    // response for invalid request
    //response.status(400).send({"result":false});
});

// RTA invalidate credentials
app.post('/invalidateCredentials', function (request, response) {
    console.log('\nInvalidate call')
    console.log(request.body)

    if (!request.body || !request.body.username || !request.body.password) {
        const error = 'Username or password not found in POST request'
        console.log(error)
        response.status(400).send(error)
        return
    }

    // response for valid request
    response.status(200).send({ "result": true });

    // response for invalid request
    //response.status(400).send({"result":false});
})

Object.defineProperty(String.prototype, 'hashCode', {
    value: function () {
        var hash = 0, i, chr
        for (i = 0; i < this.length; i++) {
            chr = this.charCodeAt(i)
            hash = ((hash << 5) - hash) + chr
            hash |= 0 // Convert to 32bit integer
        }
        return hash
    }
})

let server
if (useSSL) {
    let options = {
        cert: cert,
        key: key
    }
    server = https.createServer(options, app);
}
else {
    server = http.createServer(app)
}
server.listen(port)
console.log('Mock Socket Server running on ' + port + '.')

const wss = new WebSocketServer({ server })
wss.on('connection', function (ws, req) {
    console.log('websocket connection open')

    const params = getParams(req.url.split('?')[1])
    console.log(params)

    if (params.hasOwnProperty('testbed') && params['testbed'] === 'conference') {
        conferenceBackend.registerWebSocketClient(ws, params)
    }
    else if (params.hasOwnProperty('testbed') && params['testbed'] === 'grid') {
        gridCompositionBackend.registerWebSocketClient(ws, params)
    }
})


// converts url encoded parameters string into a map 
const getParams = function (params) {
    const map = {}
    params.split('&').forEach(function (item) {
        const string = item.split('=')
        map[string[0]] = string[1]
    });

    return map
}