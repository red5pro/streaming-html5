# Streaming HTML Testbed Migration

The intent of this document is to describe the differences between the previous version of `streaming-html` (shipped with the server distribution as `webrtcexamples`) and this current version.

The current version of the testbed (the source in this repo) has been upgraded to support TypeScript as well as modern ES2025 syntax and web development concepts, such as Web Components.

Additionally, the previous version had a separation of tests related to Standalone and Stream Manager deployments. The current version has removed that separation - aside from some tests that are strictly only available for Standalone and Stream Manager deployment. Instead, the settings panel drives the distinction of testing against a Standalone or Stream Manager deployment. This removes the error-prone duplication of tests which was delivered in the previous version of the testbeds.

# Settings

This section describes the available settings and how they affect tests. The settings - accessible from a drop-down panel at the top of the testbed - are general for _all_ tests. Specific settings with regards to individual tests - such as camera selection for publishers - is encapsulated in their respective test pages.

Once the settings have been filled out and applied - and are other than the default settings - then query parameters are appended to the URL. This allows you to copy the URL and send it to another party so that they have can verify the test with the same settings as you.

> Note: Be sure to click `Apply` after modifying the desired settings or they will not take hold.

## Connection

The host endpoint, either the Standalone or Stream Manager FQDN.

## Stream

The stream name and target app context (typically `live`).

## RTC Connection

In this section you have the choice of using `STUN` (default) and target STUN server, or choosing `TURN` with optional credentials.

## Stream Manager

Enable this if your `Host` endpoint is a Stream Manager deployment. Edit the fields to also define the target Node Group and optional `Region` and `Authentication`.

> Stream Manager Authentication is required for Transcoder tests.

## Authentication

Enable this if you would like all the following tests also send `Authentication` parameters. If fields are left empty, they will not be sent.

## Statistics

Enable this to optionally gather and send statistics.

# Test Migration

Below is a table detailing where to find the current version of tests that were in the previous testbed.

## WHIP/Publisher Tests

> The following can be tested on both Standalone and Stream Manager. The deployment target is dependent on the Stream Manager section in Settings.

| Previous Name                               | Current Name                 | Note                                                                                                                                                                       |
| ------------------------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Publish`                                   | `Basic WHIP`                 | `-`                                                                                                                                                                        |
| `Publish - AMF Metadata`                    | `WHIP AMF`                   | `-`                                                                                                                                                                        |
| `Publish - Append`                          | _none_                       | Included in **all** WHIP/Publisher examples is an option for `Publish Mode`, from which you can select `APPEND`                                                            |
| `Publish - Authentication`                  | _none_                       | Authentication is available for **all** WHIP/Publisher examples from the `Settings` panel                                                                                  |
| `Publish - Browser Resolutions`             | `WHIP Supported Resolutions` | `-`                                                                                                                                                                        |
| `Publish - Camera Source`                   | _none_                       | Included in **all** (except `Basic WHIP`) WHIP/Publisher examples is a `Publish Settings` section with camera and microphone setting options - including camera selection. |
| `Publish - Codec Support`                   | `WHIP Codec Preference`      | `-`                                                                                                                                                                        |
| `Publish - Custom Video Settings`           | _none_                       | Included in **all** (except `Basic WHIP`) WHIP/Publisher examples is a `Publish Settings` section with camera and microphone setting options - including camera selection. |
| `Publish - Custom Video and Audio Settings` | `WHIP Audio Constraints`     | `-`                                                                                                                                                                        |
| `Publish - DataChannel Messaging`           | `WHIP Data Channel`          | `-`                                                                                                                                                                        |
| `Publish - Media Stream Source`             | `WHIP Media Source Swap`     | `-`                                                                                                                                                                        |
| `Publish - Mute`                            | `WHIP Mute API`              | `-`                                                                                                                                                                        |
| `Publish - Live Encodings`                  | `WHIP Live Encoding`         | `-`                                                                                                                                                                        |
| `Publish - Unpublish`                       | _none_                       | All WHIP/Publisher tests have the ability to `Unpublish`                                                                                                                   |
| `Publish - Reconnect`                       | `WHIP Resiliency`            | `-`                                                                                                                                                                        |
| `Publish - Remote Call`                     | `WHIP Remote Call - Sender`  | `-`                                                                                                                                                                        |
| `Publish - RoundTrip Authentication`        | _none_                       | Authentication is available for **all** WHIP/Publisher examples from the `Settings` panel                                                                                  |
| `Publish - Screenshare`                     | `WHIP Screenshare`           | `-`                                                                                                                                                                        |
| `Publish - Validation`                      | `WHIP Connection Params`     | `-`                                                                                                                                                                        |
| `Publish - VP8`                             | `WHIP Codec Support`         | Select `VP8` explicitly from this test                                                                                                                                     |
| `Publish - WebSocket`                       | `RTC Publisher`              | This will use the legacy `14.3` SDK to utilize WebSockets for negotiation                                                                                                  |

## WHEP/Subscriber Tests

> The following can be tested on both Standalone and Stream Manager. The deployment target is dependent on the Stream Manager section in Settings.

| Previous Name                           | Current Name               | Note                                                                                       |
| --------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------ |
| `Subscribe`                             | `Basic WHEP`               | `-`                                                                                        |
| `Subscribe - 360 Player`                | _none_                     | **Deprecated**                                                                             |
| `Subscribe - AMF Metadata`              | `WHEP AMF`                 | `-`                                                                                        |
| `Subscribe - Audio Only`                | `WHEP Audio Only Playback` | `-`                                                                                        |
| `Subscribe - Authentication`            | _none_                     | Authentication is available for **all** WHEP/Subscriber examples from the `Settings` panel |
| `Subscribe - Codec Support`             | `WHEP Codec Preference`    | `-`                                                                                        |
| `Subscribe - DataChannel Messaging`     | `WHEP Data Channel`        | `-`                                                                                        |
| `Subscribe - HLS`                       | _none_                     | HLS Support has been moved to Video Packager                                               |
| `Subscribe - Mute API`                  | `WHEP Mute API`            | `-`                                                                                        |
| `Subscribe - Interstitial`              | `WHEP Interstitial`        | `-`                                                                                        |
| `Subscribe - Round Trip Authentication` | _none_                     | Authentication is available for **all** WHEP/Subscriber examples from the `Settings` panel |

| `Subscribe - Remote Call` | `WHEP Remote Call - Receiver` | `-` |
| `Subscribe - Reconnect` | `WHEP Reconnect` | `-` |
| `Subscribe - Renegotiation Policy` | `WHEP Renegotiation` | `-` |
| `Subscribe - Retry on Connection` | _none_ | **Deprecated** |
| `Subscribe - ScreenShare` | _none_ | **Any** WHEP/Subscriber test will work |
| `Subscribe - Server Call` | _none_ | **Deprecated** |
| `Subscribe - Standby Mode` | `WHEP Standby` | `-` |
| `Subscribe - Stream Switch` | `WHEP Switch Streams` | `-` |
| `Subscribe - Two Streams` | _none_ | **Deprecated** |
| `Subscribe - Validation` | `WHEP Connection Params` | `-` |
| `Subscribe - Video Mute` | `WHEP Mute API` | `-` |
| `Subscribe - Live VOD` | _none_ | HLS Support has been moved to Video Packager and Stream Manager only |
| `Playback - VOD` | _none_ | HLS Recording Support has been moved to Video Packager |
| `Subscribe - H.264` | `WHEP Codec Support` | `-` |
| `Subscribe - VP8 ` | `WHEP Codec Support` | `-` |
| `Subscribe - WebSocket` | `RTC Subscriber` | This will use the legacy `14.3` SDK to utilize WebSockets for negotiation |
| `Playback - AMF Metadata VOD` | _none_ | HLS Recording Support has been moved to Video Packager |
| `Subscribe - Manual Stream` | `WHEP Manual Stream` | `-` |

## MISC Tests

> The following can be tested on both Standalone and Stream Manager. The deployment target is dependent on the Stream Manager section in Settings.

| Previous Name                     | Current Name                  | Note                                    |
| --------------------------------- | ----------------------------- | --------------------------------------- |
| `PubNub Client`                   | `PubNub Client`               | `-`                                     |
| `Message Channel`                 | `Message Channel`             | `-`                                     |
| `Conference`                      | _none_                        | **Deprecated** Use `WHIP/WHEP (Two Way) |
| `castLabs Publish`                | `castLabs DRM Publisher`      | `-`                                     |
| `castLabs Subscribe`              | `castLabs DRM Subscriber`     | `-`                                     |
| `castLabs Watermarked - Playback` | `castLabs Watermark Playback` | `-`                                     |

## Standalone Specific

> The following will only work properly when `Stream Manager` is disabled in the Settings.

| Previous Name         | Current Name   | Note                                |
| --------------------- | -------------- | ----------------------------------- |
| `Subscribe - Cluster` | `WHEP Cluster` | _Found in the `Standalone` section_ |

## Stream Manager Specific

> The following will only work properly when `Stream Manager` is enabled and defined in the Settings.

| Previous Name                                                                            | Current Name                                                                              | Note                                                                                                                                                         |
| ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Brew Mixer - Stream Manager`                                                            | `Brew Mixer`                                                                              | `-`                                                                                                                                                          |
| `Subscribe - Stream Manager Proxy Live VOD`                                              | `Subscribe Live VOD`                                                                      | `-`                                                                                                                                                          |
| `Publish - Stream Managaer Proxy Transcoder Provision (form only)`                       | `Transcoder (Form Only)`                                                                  | `-`                                                                                                                                                          |
| `Publish - Stream Manager Transcoder Proxy w/ Provision`                                 | `Transcoder (Form and Publish)`                                                           | `-`                                                                                                                                                          |
| `Publish - Stream Manager Transcoder Proxy w/ Provision & Settings`                      | `Transcoder (Form and Publish)`                                                           | Included in `Transcoder (Form and Publish)` example is a `Publish Settings` section with camera and microphone setting options - including camera selection. |
| `Publish - Stream Manager Transcoder Proxy w/ Provision & Authentication`                | Authentication is available for **all** WHIP/Publisher examples from the `Settings` panel |
| `Publish - Stream Manager Transcoder Proxy w/ Provision & Authentication & AMF Metadata` | `Transcoder (Form, Publish and AMF)`                                                      | Authentication is available for **all** WHIP/Publisher examples from the `Settings` panel                                                                    |

## Stream Manager Automated Tests

The tests defined in this section do not necessarily need to be tested by humans.

They are a modern equivelant of the `proxy-*` tests that cna be found in the root directory of the previous testbed. Historically, these tests were run in automated testing and driven by query parameters with various settings. They still are and do not provide any Settings UI - driven solely by query parameters.
