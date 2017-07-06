# Red5 Pro HTML SDK Migration Guide
This documentation serves as a guide in migrating client-side code where a breaking change to the API has been made in a distribution.

* [3.5.0 to 4.0.0](#migrating-from-350-to-400)

# Migrating from `3.5.0` to `4.0.0`
The `4.0.0` release of the Red5 Pro HTML SDK saw some major changes in the following features:

* Internalizing the `getUserMedia` request in order to simplify the intialization-to-broadcast sequence of **Publishers**.
  * While the default process of accessing a stream through the `getUserMedia` API of the browser has been internalized to the SDK, we have also exposed a way to override this default to allow developers to specifically handle this process as per requirements.
  * [Refer to section:]()
* Removal of explicitly defining and assigning views for **Publishers** and **Subscribers**.
  * The process of associating a view display to either a **Publisher** or a **Subscriber** has been internalized with access to DOM elements using a default `videoElementId` configuration property.
  * This change simplifies the creation and initialization process for both **Publishers** and **Subscribers**.
  * While the default process of associating a view to a broadcast or subscriber session is based on a `videoElementId` configuration property, developers are able to define which `video` DOM element they prefer to use as the display by providing its `id` attribute value.
  * [Refer to section:]()
* Introduction of Red5 Pro HTML SDK Playback Controls.
  * In response to numerous requests regarding playback controls across the several **Subscriber** platforms we support, we have exposed an API for playback control and provide default UI elements and styles.
  * This allows for consistent cross-browser look-and-feel of playback controls across all playback formats: WebRTC, Flash, and HLS.
  * The Red5 Pro HTML SDK Playback Controls UI is completely customizable in styling to meet the branding requirements for developers.
  * By exposing a playback API, we allow developers to create their own custom controls - not relying on the Red5 Pro HTML SDK Playback Controls UI - to meet their own product requirements.
* Removal of [VideoJS]() support in Flash/RTMP and HLS clients.

