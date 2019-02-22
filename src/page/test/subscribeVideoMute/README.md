# Subscribe Video Mute

The intent of this test is to demonstrate subscribing to a broadcast which has its video stream "muted". We have noticed that in Chrome and Safari browsers, when trying to play back a stream that has both Audio and Video tracks, but the Video tracks are empty - because the broadcaster has turned off their Camer - that no playback occurs when assigning the `MediaStream` source to a `<video>` element. Presumably, this is because the Video track playback drives the `<video>` element through its lifecycle events for `canplay` and `loadeddata`.

As such, you may require adding an additional `<audio>` element to the page to allow for the audio to playback while the initial Camera stream is "muted". Playback of a `MediaStream` with audio flowing and video "muted" is acceptable in said browsers using an `<audio>` element.
In this test, we listen for the `Subscribe.Metadata` event and check if the initial `streamingMode` property on the metadata is set to `Audio`. In such a case, it means that the broadcaster has muted their video stream. As such, the test starts subscribing to the stream in an `audio` element to allow for audio playback.

When the `streamingMode` property changes to `Video/Audio`, the video stream has become unmuted.

# Notes

Somethings of note:

* Playback will only work when navigating to this test page after clicking it from the testbed listing. 

This is because the `autoplay` restriction is not enforced since you interacted with the page. If you load this test using a *Refresh*, the `autoplay` restriction will be in affect and the audio playback in the `audio` element will additionally be muted.

* This test does not work so well in Safari

Presumably it is due to having an additional media element (the added `audio` element) to a page in which another media element already exists and is unmuted and autoplay-ed.
