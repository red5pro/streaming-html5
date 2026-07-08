# Usage of URL Query Parameters for Testbed

This document details the use of query parameters in the URL field when loading testbed examples as a way to bypass having to initially load and define cross-session variables from the Settings page.

# Query Parameters

The following is a list of recognized Query Parameter keys and their description. These are reflective of several Settings variables available. The query parameters defined will be transferred to pages within the testbed in deep links, but do not necessarily include settings that are specific to an individual testbed (such as provisioning for ABR).

| key                       | description                                                   | default value              |
| :------------------------ | :------------------------------------------------------------ | :------------------------- |
| `host`                    | The hostname of the Red5 server endpoint.                     | `window.location.hostname` |
| `app`                     | The webapp context (or scope) where the stream resides.       | `live`                     |
| `streamName` or `stream1` | The name of the stream to either publish or subscribe to.     | `stream1`                  |
| `streamMode`              | The desired stream mode to set while publishing.              | `live`                     |
| `useAudio`                | Flag to include audio in publishing tests.                    | `true`                     |
| `useVideo`                | Flag to include video in publishing tests.                    | `true`                     |
| `cameraWidth`             | Desired width of the camera resolution for publishing tests.  | `1280`                     |
| `cameraHeight`            | Desired height of the camera resolution for publishing tests. | `720`                      |
| `frameRate`               | Desired fps for publishing tests.                             | `30`                       |
| `audioBW`                 | Desired bitrate of audio in publishing tests.                 | `56`                       |
| `videoBW`                 | Desired bitrate of video in publishing tests.                 | `2500`                     |
| `keyFramerate`            | Desired keyframe reate in publishing tests in seconds.        | `2`                        |
| `authEnabled`             | Flag of using RTA in tests.                                   | `false`                    |
| `authUsername`            | Desired username of RTA to use.                               | `undefined`                |
| `authPassword`            | Desired password of RTA to use.                               | `undefined`                |
| `authToken`               | Desired token of RTA to use.                                  | `undefined`                |
| `smUsername`              | Authentication username for SM 2.0.                           | `undefined`                |
| `smPassword`              | Authentication password for SM 2.0.                           | `undefined`                |
| `smNodeGroup`             | Target node group name on SM 2.0 deployment.                  | `default`                  |
| `smRegion`                | Target region on SM 2.0 deployment.                           | `undefined`                |
