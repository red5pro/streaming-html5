# NxN Grid

This is an example of a general NxN grid that can resize as streams are added to it. The grid starts as a 1x1 grid that resizes every time a new stream is added and there is no available space in the current grid. At each resize cycle the grid adds two columns and one row to keep a rectangular aspect ratio. It should be noticed that currently the grid can only resize up. Resizing down is not supported. 

The HTML5 page includes a NxN flex box grid with video players that can subscribe to live streams. The list of live streams is sent over WebSockets together with the action to apply to each stream. The actions include add, remove, mute and unmute. The streams to subscribe to and related actions are provided in real-time by a Host through the [Stream Manager Grid Mixer Composition Testbed](../../sm-cef-mixer/gridMixerCompositionStreamManagerProxy/).