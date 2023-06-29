# 7x7 Grid

This is an example of a 7x7 grid that can compose up to 49 streams into a single grid.

The HTML5 page includes a 7x7 flex box grid with video players that can subscribe to live streams. The list of live streams is sent over WebSockets together with the action to apply to each stream. The actions include add, remove, mute and unmute. The streams to subscribe to and related actions are provided in real-time by a Host through the [Stream Manager Grid Mixer Composition Testbed](../../sm-mixer/gridMixerCompositionStreamManagerProxy/).

> **Note**: Mixing 49 streams requires a server with at least 8 CPUs and 16G memory. If your streams are high quality, then at least 16 CPUs are recommended.
