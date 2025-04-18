# Usage of URL Query Parameters for Testbed

This document details the use of query parameters in the URL field when loading testbed examples as a way to bypass having to initially load and define cross-session variables from the Settings page.

# Query Parameters

The following is a list of recognized Query Parameter keys and their description. These are reflective of several Settings variables available. The query parameters defined will be transferred to pages within the testbed in deep links, but do not necessarily include settings that are specific to an individual testbed (such as provisioning for ABR).

| key | description | value example |
| :--- | :---: | ---: |
| `host` | The hostname of the Red5 server endpoint. | `mydeploy.red5.net` |
| `protocol` | The protocol serving the Red5 server endpoint. | `https` |
| `port` | The port on which the Red5 server endpoint is served. | `443` |
| `endpoint` | The entire URL of the Red5 server endpoint. (shortcut and will override `host`, `protocol` and `port`) | `https://mydeploy.red5.net:443` |
| `app` | The webapp context (or scope) where the stream resides. | `live` |
| `preferWhipWhep` | Flag to use WHIP/WHEP or WebSocket clients. | `true` |
| `streamName` or `stream1` | The name of the stream to either publish or subscribe to. | `stream1` |
| `stream2` | For tests that use two streams, this defines the second stream name. | `stream2` |
| `streamMode` | The desired stream mode to set while publishing. | `live`, `record` or `append` |
| `useAudio` | Flag to include audio in publishing tests. | `true` or `false` |
| `useVideo` | Flag to include video in publishing tests. | `true` or `false` |
| `cameraWidth` | Desired width of the camera resolution for publishing tests. | `640` |
| `cameraHeight` | Desired height of the camera resolution for publishing tests. | `360` |
| `frameRate` | Desired fps for publishing tests. | `30` |
| `audioBW` | Desired bitrate of audio in publishing tests. | `56` |
| `videoBW` | Desired bitrate of video in publishing tests. | `750` |
| `keyFramerate` | Desired keyframe reate in publishing tests. | `3000` |
| `authEnabled` | Flag of using RTA in tests. | `true` |
| `authUsername` | Desired username of RTA to use. | `username` |
| `authPassword` | Desired password of RTA to use. | `pass` |
| `authToken` | Desired token of RTA to use. | `token` |
| `smUsername` or `streamManagerUsername` | Authentication username for SM 2.0. | `admin` |
| `smPassword` or `streamManagerPassword` | Authentication password for SM 2.0. | `abc123` |
| `smNodeGroup` or `streamManagerNodeGroup` | Target node group name on SM 2.0 deployment. | `nodegroup-oe` |
| `smRegion` or `streamManagerRegion` | Target region on SM 2.0 deployment. | `us-east` |

> Note: `endpoint` query parameter allows you to define the full URL endpoint of the server (e.g., `https://mydeploy.red5.net:443`) without having to define `host`, `protocol` and `port` separately.

