# Back-Up Stream Switching for Subscribers Using Stream Maanger

This example demonstrates the ability to load 2 (_can be modified_) Subscribers to 2 Edges at once and placing all but the first to report subscription success into `standby` mode in order to be "activated" in the off-chance that the current subscriber has gone down unexpectedly - such as from losing network connect or the edge server is lost.

# Usage

There Stream Manager form allows you to input information about the host address of the stream manager instance. It is assumed that the stream manager is served over SSL when constructing the APi request; as such, put in the Full Qualified Domain Name of the stream manager - e.g., `mystreammanager.red5.me`.

In the Stream Manage form, also provide the stream name you wish to subscriber to.

When the form is complete, click `Start`.

Once a subscriber has completed an Edge API request, a connection and a playback, the other subscriber(s) are placed into `standby`. They should not be receiving audio or video streams at this moment, though will have a frozen frame at which they were placed in `standby`.

> The subscribers are initially overlapped in the UI, but you can see both streams at the same time by clicking on the `Toggle Overlap` button.

Once both subscribers are "alive" and one subscriber is playing back and the other is in standby, shut down the Red5 Pro server on the host instance that is reported in the information field above the videos.

## Expected Result

You should see the original subscriber removed from the UI and the back-up subscriber released from `standby` mode.

