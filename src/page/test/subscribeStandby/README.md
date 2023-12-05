# Subscribe and Standby using Red5 Pro

This is an example of using the Standby API to request a "pause" in receiving video and audio data on the MediaStream while also maintaining a connection of the client to the server; this would be considered "Enabling Standby". Additionally, the video and audio data can be requested to continue by "Disabling Standby" again.

> For more detailed information on Configuring and Subscribing with the Red5 Pro SDK, please visit the [Red5 Pro Documentation](https://www.red5.net/docs/development/subscriber/webrtc).

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

# How to use the Standby API

Exposed on the WebRTC-based Subscriber are the following methods for the Standby API:

- `enableStandby`
- `disableStandby`

By calling `enableStandby`, a socket request will be made for the server to temporarily "pause" the sending of audio and video data on the `MediaStream`. Calling `disableStandby` while in "standby" mode will make a request on the server to start sending the media data again.

```javascript
function allowStandby() {
  var inStandby = false
  standbyButton.removeAttribute('disabled')
  standbyButton.addEventListener('click', function () {
    if (!inStandby && targetSubscriber) {
      targetSubscriber.enableStandby()
      standbyButton.innerText = 'Disable Standby'
      inStandby = !inStandby
    } else if (inStandby && targetSubscriber) {
      targetSubscriber.disableStandby()
      standbyButton.innerText = 'Enable Standby'
      inStandby = !inStandby
    }
  })
}
```
