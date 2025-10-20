# Autoplay Policies and the Red5 Pro HTML SDK

Ah... Can you hear that? Complete silence.

It's a wonderful sound - unless you have developed a streaming conference webapp and your attendees can only _see_ you talking about something important.

You may have started to see (or *hear*) the affect of `autoplay` policies being rolled out in browsers recently. Essentially, most video playback on web pages is being muted unless you navigate to or explicitly request media playback. This is an initiative made by browser vendors with you - as the consumer - in mind; delivering a browsing experience that is less intrusive and possibly more cost effective with regards to mobile data consumption.

# How it affects you

As a surfer of the web, this sounds great! Those unwanted ads can't start blaring out of nowhere and scaring the people next to you the train. You can go about scaring the people next to you on the train as you see fit; on your terms.

As a developer of a streaming webapp, this sounds horrible! People are coming to your webapp to specifically watch streams. The end-user knows what they are getting into and are expecting to seemlessly start engaging with streaming content. Now it is adding - at least - one extra click to get to full content. One extra click that could turn out to be the back button or close button, if they so wish...

The good news? When integrating the Red5 Pro HTML SDK into your streaming webapp, we have some solutions that may help you keep those viewers! That said, we cannot provide a "work-around" for the `autoplay` policy restrictions and auto-magically allow autoplay within the Red5 Pro HTML SDK.

# How it affects integrating Red5 Pro into your webapp

Even if you have yet to integrate the Red5 Pro HTML SDK into your custom webapp, you may have played around with some of the client-side webapps distributed with the [Red5 Server](https://cloud.red5.net).

The initial landing page for a deployed instance of the *Red5 Pro Server* is affectionately called `The Frontend` by our team. It provides links to start broadcasting and consuming streams on the server and is an easy way to test your server deployment and its functionality.

With the recent `autoplay` policies, we were not experiencing much auto-muting of stream playback while navigating around in `The Frontend`. As an example, we can look at the listing of available streams to playback on the server, then select one to playback and be able to view and hear the stream in the navigated-to page; both on desktop and mobile. This is great! This may have you thinking that we have overcome the `autoplay` policy restrictions within our Red5 Pro HTML SDK or Server, but in actuality it is because the policy restriction is not applied in such a scenario - requesting autoplay streaming upon user interaction.

If we are were then to simply refresh the page, we would be faced with muted video playback.

The same flow and scenarios can be said when using what we affectionately call `The Testbed`, also distributed with the *Red5 Pro Server* and available as the `webrtcexamples` webapp.

Unless you are providing such an experience to the users of your custom streaming webapp in which they arrive at stream playback through explicity interaction, you will most likely be faced with the muted `autoplay` policy restriction, as well.

But fear not! You have options...

# Your Options

When integrating the Red5 Pro HTML SDK into your webapp for WebRTC and HLS playback, you have a few options to consider with regards to the recent `autoplay` policies.

## Option 1. Ensure user interaction to streaming

In some cases, the simplest solution to allow for unmuted autoplay is to ensure that the user has explicitly requested playback through engagement. Such is the case for `The Frontend` and `The Testbed` distributed with the *Red5 Pro Server* and discussed in the previous section; engaging the end-user to interact with the page or be navigated to the streaming content is one way to allow for autoplay with sound.

The *downside* to this approach: Assuming that the end-user will always take the same steps to arrive at streaming content. What if they refresh the page? It will play back muted. What if they copy the URL from the address bar and send it to a friend? That friend will hear muted playback...

## Option 2. Muting the media element

The second option is to simply accept the fact that - unless your webapp is _always_ navigating end-user(s) to stream playback through explicit UI interaction - automatic playback of streams will be (at best) limited to video only. With this in mind, one course of action would be to additionally declare the `muted` attribute alongside the `autoplay` declaration on the target media element (e.g., `<video>` or `<audio>`) of the page.

By declaring the media element as `muted`, the autoplay policy is adhered to and there will be no exception thrown during playback request. Seeing as you would be knowledgeable of the `muted` declaration, you - as the developer - can see fit how to alert the user to the current playback state as per your webapp requirements.

The *downside* to this approach: Stream playback on any browser that _does not_ have the `muted` restriction on autoplay policies will be muted, as well.

Though we see the policy enforced on the majority of mobile-based browsers, desktop-based browsers of the same version from the same vendor may not enforce the same autoplay restriction (refer to the [Media Engagement Index section of this article](https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#mei)). Using this option means, regardless of the browser and its autoplay policy restriction, all users will have muted playback.

## Option 3. Allow the Red5 Pro SDK to handle it!

The Red5 Pro HTML SDK - as of version `5.5.0` and later - is equipped to handle exceptions in playback requests internally, take appropriate action and provide event notifications for results when attempting to autoplay media elements.

### The Details

With the introduction of the `muteOnAutoplayRestriction` initialization configuration for the WebRTC-based or HLS-based Subscriber, you can define how you would like the Red5 Pro HTML SDK to handle exceptions in playback requests with `autoplay` declared on your media element(s).

By setting `muteOnAutoplayRestriction` to `true` - which is the default - you are requesting the Red5 Pro HTML SDK to handle any exceptions in the initial unmuted autoplay request. If an exception is thrown in the initial autoplay request, the Red5 Pro HTML SDK will attempt to mute the media element and request playback again.

If the subsequent - and muted - playback is successful, a `Subscribe.Autoplay.Muted` event will be notified on the WebRTC-based or HLS-based Subscriber, allowing you - as the developer - to handle such a case as meets your webapp requirements; for example, displaying a call-out UI element notifying the end-user to unmute the audio.

If the subsequent request to playback as muted throws an exception, or if a failure happens at any point within the autoplay routine, the Red5 Pro HTML SDK will dispatch a `Subscribe.Autoplay.Failure` event notification on the WebRTC-based or HLS-based Subscriber. Typically, this will result in not only audio being muted, but the video or audio stream is not auto-played at all in the media element. In such a scenario, the end-user will have to explicitly click the *play* button of the media element to begin playback. As a developer, you can respond to such an event to notify the end-user to take appropriate action.

Alternatively, setting `muteOnAutoplayRestriction` to `false` will let the Red5 Pro HTML SDK know to not take any further action if the initial autoplay request throws an exception. If an exception is thrown, the `Subscribe.Autoplay.Failure` event notification on the WebRTC-based or HLS-based Subscriber (as mentioned above).

_Obligatory Flow Diagram:_

[!Autoplay Flow](autoplay-flow.png)

> Special Note: The autoplay policies of the browser have no restriction for Flash-based Subscribers, which can start auto-playback of a stream upon connection as expected.

### The Example

The following example demonstrates how to incorporate the `muteOnAutoplayRestriction` initialization configuration property into your webapp.

Take for example, that you have the following `video` element declared in your page:

```html
<video id="red5pro-subscriber" autoplay controls playsinline></video>
```

To tell the Red5 Pro HTML SDK that you would like it to handle autoplay and possible muting internally:

```js
const { WHEPClient } = red5prosdk

const subscriber = new WHEPClient()
subscriber.on(red5prosdk.SubscriberEventTypes.AUTO_PLAYBACK_MUTED, handleAutoplayMuted)
subscriber.on(red5prosdk.SubscriberEventTypes.AUTO_PLAYBACK_FAILURE, handleAutoplayFailure)

await subscriber.init({
    protocol: 'ws',
    host: 'localhost',
    port: 5080,
    app: 'live'
    streamName: 'mystream'
    mediaElementId: 'red5pro-subscriber',
    muteOnAutoplayRestriction: true
  })
await subscriber.subscribe()
...

const handleAutoplayMuted = (event: SubscriberEvent) => {
  // notify user to unmute audio.
}

const handleAutoplayFailure = (event: SubscriberEvent) => {
  // notify user to click the Play button.
}
```

After initialization of the `subscriber` and prior to a request to start subscribing to the `mystream` stream, two event handlers are defined to handle the `Subscribe.Autoplay.Muted` and `Subscribe.Autoplay.Failure` events (defined on the `SubscriberEventTypes` object as `AUTO_PLAYBACK_MUTED` and `AUTO_PLAYBACK_FAILURE`, respectively). We left out any sordid details on how to alert end-users of such notifications - so let your imaginations run wild!

# Conclusion

Restrictions on playback functionality for autoplay policies have been rolling out in browsers recently and may impact how your webapps are used and interacted with.

In this article, we covered the recent additions to `autoplay` policies of browsers and how you can handle such scenarios when integrating the Red5 Pro HTML SDK into your custom webapp. Happy streaming!

# Related material

[https://developers.google.com/web/updates/2017/09/autoplay-policy-changes](https://developers.google.com/web/updates/2017/09/autoplay-policy-changes)
[https://webkit.org/blog/6784/new-video-policies-for-ios/](https://webkit.org/blog/6784/new-video-policies-for-ios/)
