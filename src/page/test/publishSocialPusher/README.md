# SocialPusher Plugin
#### Publish and push to social media
This example is based on the *publish* example. It forwards the published stream to the RTMP server specified. See that example's [README](../publish/README.md) for details on publishing.

## Example Code
- **[index.html](index.html)**
- **[index.js](index.js)**

# UI
We require three pieces of data from the user: **password**, **destination URI**, and **stream key**.

* **password** must always match the password specified in cluster.xml (in the clustering plugin). By default, this value is `changeme`.
* **destination URI** is the RTMP or RTMPS URI of the forwarding destination.
* **stream key** is the name of the forwarded stream (at the destination).

Finally there is a button, to either **Begin Forwarding** or, if forwarding has begun successfully, **Stop Forwarding**. Note that this code is just an example -- the Stop Forwarding button is not especially robust. For example, if you begin forwarding and then modify the destination URI so that it is not valid, does not exist, or is not found (or if any other unexpected error occurs), the button state will remain as Stop Forwarding. It will only change back to Begin Forwarding if an existing forward can be successfully stopped. Otherwise, to return to Begin Forwarding state one must reload the page.

# Calling the REST API
To call the REST API we need to construct an array of `Provision` with at least one element, and we must also compute the signature for the query parameters.

## Create a Provision
We will create a single `Provision` to forward the currently published live stream. To do 
this, we use the `config` object (which originates in the *publish* example) to identify the stream context and name.
```json
	context:config.app,
	name:config.stream1,
```

We must also specify the `parameters` map to define the `destURI` parameter (which includes the concatenated stream key).
```json
	parameters:{
		destURI:destUri.value + "/" + streamKey.value
	}
```

### Example REST request body
```json
{
    "provisions":[
        {
            "guid":"any",
            "level":1,
            "context":"live",
            "name":"stream1",
            "parameters":{
                "destURI":"rtmps://live-api-s.facebook.com:443/rtmp/1234exampleStreamKey"
            }
        }
    ]
}
```

## Query Parameters
We construct the base URI of the SocialPusher servlet using the `serverSettings` and `config` objects (both originating in the *publish* example).
```javascript
var uri = serverSettings.protocol + "://" + config.host + ":" + serverSettings.httpport + "/socialpusher/api?action=provision.";
```

The partial action is followed with `create` or `delete` depending on the desired action.

Then the `timestamp` is generated and the `signature` created.

The `signature` is the SHA-256 hash of the concatenation of *action*, *timestamp*, and *password*. Then, concatenate the bytes of the hash into a string of hexadecimal digits, **ignoring leading zeros**.

### Example URI
```http://localhost:5080/socialpusher/api?signature=b2ff86296d9afba7f85b9c82bd44c113046ae1e5519f2f2ae74277b392fa&timestamp=1601527953384&action=provision.create```

## POST
Finally, the JSON array of `Provision` is delivered in the body of an HTTP POST to the SocialPusher servlet. The servlet will respond with HTTP 200 on success; any other response is assumed to be failure. 
