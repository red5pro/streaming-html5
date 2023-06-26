# Publish Custom Settings

This example allows you to customize the media broadcast settings for a WebRTC Publisher.

**Please refer to the [Basic Publisher Documentation](../publish/README.md) to learn more about the basic setup.**

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

# Running the Example

Fill in any custom broadcast settings for testing, then press **Publish**.

## Settings

Settings included for customization:

| Name                 | Usage                                                                                                       |
| -------------------- | ----------------------------------------------------------------------------------------------------------- |
| Camera Device        | The Camera Device to broadcast with.                                                                        |
| Camera Width         | The requested Camera width to broadcast.                                                                    |
| Camera Height        | The requested Camera height to broadcast.                                                                   |
| Camera Framerate     | The frequested framerate at which to broadcast.                                                             |
| Video Bitrate (Kbps) | The requested video bitrate to broadcast. This will munge the SDP being sent out in Peer Connection offers. |
| Audio Bitrate (Kbps) | The requested audio bitrate to broadcast. This will munge the SDP being sent out in Peer Connection offers. |
| Key Framerate (ms)   | The requested time - in milliseconds - to send a key frame during broadcast.                                |
