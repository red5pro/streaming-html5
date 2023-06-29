# Playback VOD using Red5 Pro

This is an example of Video On Demand (VOD) playback.

To view the recorded files available for VOD playback, view the listings from your server deploy in the webapp that the recorded stream was recorded to, such as the following:

- [http://localhost:5080/live/mediafiles](../../live/mediafiles)
- [http://localhost:5080/live/playlists](../../live/playlists)

### Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

## How to Playback

> Be sure to have previously recorded a broadcast using the [Publish Record Example](../publishRecord).

1. Enter in a filename - including the extension - of a previously recorded broadcast.
2. Click `playback file`.

The playback format - either Flash or HLS - will be determined based on the extension with the following rules:

| Extension | Format     |
| --------- | ---------- |
| `flv`     | Flash/RTMP |
| `mp4`     | Flash/RTMP |
| `m3u8`    | HLS        |

## Specifying a file as playback in a Subscriber

Playing back a VOD file using the Red5 Pro Subscriber is similar to streaming a live video. Some configuration attributes will be different depending on the playback target.

### Flash/RTMP

To playback a VOD in the RTMP-based Subscriber:

- Set the `streamName` in the configuration to the filename, with the extension.

With a configuration provided for the RTMP Subscriber:

```js
{
  protocol: 'rtmp',
  host: 'localhost',
  port: 1935,
  app: 'live',
  streamName: 'thefiletoplay.flv'
}
```

The Playback engine will connect to the server at `rtmp://localhost:1935/` and attempt to play back the `thefiletoplay.flv` file located in `<red5proserver>/webapps/live/streams`.

### HLS

To playback a VOD in the HLS-based Subscriber:

- Set the `streamName` in the configuration to the filename, _without_ the extension.
- Set the `port` in the configuration to that of the one the server is served on.

With a configuration provided for the HLS Subscriber:

```js
{
  protocol: 'http',
  host: 'localhost',
  port: 5080,
  app: 'live',
  streamName: 'thefiletoplay'
}
```

The Playback engine will connect to the server at `http://localhost:5080/` and attempt to play back the `thefiletoplay.m3u8` file located in `<red5proserver>/webapps/live/streams`.
