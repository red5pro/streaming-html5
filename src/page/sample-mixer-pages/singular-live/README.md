# Red5 CEF Mixer Page with Singular.live Integration

This is an example page which can be loaded by a Red5 CEF Mixer to integrate with `Singular.live` overlays in order to broadcast out a single mixed stream.

# Requirements

Before using this example, you will first need to have a [Singular.live account](https://www.singular.live/) and at least one `App` in your account dashboard that can be used.

## App Token

From your `Singular.live` account dashboard, you will see the available `App`s listed. Each `App` has an associated **Public App Token** associated and accessed by first selecting the target `App` from the dashboard, then selecting the `i` icon.

This will show you the associated URLs and Token(s) of the target `App`.

**You will need to provide this token to the CEF Mixer page in order to integrate with your Singular.live App.**

> More information about `Singular.live` and Apps can be found at: [https://support.singular.live/hc/en-us/articles/360034417991-Beginner-s-Guide-to-Singular](https://support.singular.live/hc/en-us/articles/360034417991-Beginner-s-Guide-to-Singular).

# Usage

The Red5 CEF Mixer is instructed to load a specified page at a URL and broadcast a live stream to a target Red5 Server. This is quickly and easily done using the `composition` html provided from the `mixer` webapp.

In order to have a CEF Mixer load this example page to integrate with `Singular.live`, you will first need to deploy the files contained in this repository to a remote location which can be loaded over SSL.

> For the purposes of this document, we will say that the files contained in this repo and the `index.html` page is accessible at: `https://red5testing.com`.

When instructing the CEF Mixer to load this example from `https://red5testing.com` it is important to provided some query parameters in order to integrate with `Singular.live`.

## Query Parameters

The following query parameters are recognized by the page:

### Required

* `sl_token` - The App Token from `Singular.live`. Please read the [Requirements](#requirements) section for accessing the token.
* `host` - The Red5 Server endpoint that has the live stream you wish to consume and overlay the content from `Singular.live`.
* `name` - The name of the stream on the `host` Red5 Server to consume.

### Optional

* `app` - The target webapp context that the stream resides in on the `host`. _Default is `live`._
* `fit` - The `object-fit` style to apply to the playback stream. _Default is `cover`._
* `vod` - A Flag to denote whether the stream to playback is VOD or not. _Default is `false`._
* `vodURL` - The full URL to a VOD file to playback. _Default is `undefined`._

When specifying `vod=true`, the page will utilize [HLS.js](https://github.com/video-dev/hls.js/) to playback the HLS file in browsers that do not support native HLS.

> If you provde the full URL for a VOD file using the `vodURL` query parameter, you do not need to define `vod=true` as well. Additionally, any `vodURL` provided is recommended to be url-encoded so as to avoid breaking the parsing of the query parameters.

### Example URL

The following example URL is one to provide to the CEF Mixer with a live playback of a stream named `stream1` accessible from the `live` webapp context on `https://myred5.com` with an overlay App token of `abcd123` from a Singular.live account:

```sh
https://red5testing.com?sl_token=abcd1234&host=myred5.com&app=live&name=stream1
```

The following example URL is one to provide to the CEF Mixer if the above stream is a VOD file residing on the same server:

```sh
https://red5testing.com?sl_token=abcd1234&host=myred5.com&app=live&name=stream1&vod=true
```
