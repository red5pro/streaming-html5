# Creating Grid Compositions

The testbed shows how to compose several live streams into a single one using a Red5 Pro Mixer. The page includes a form to create a composition, a section to show the list of currently published streams, and a section to drag and drop the streams to the Mixers that are part of the composition to add, remove, mute or unmute streams in the composition.

The page supports three layouts for the compositions:

1. [2x2 Grid](../../sample-mixer-pages/2x2): A 2x2 grid that can compose up to 4 streams
2. [3x3 Grid](../../sample-mixer-pages/3x3): A 3x3 grid that can compose up to 9 streams
3. [NxN Grid](../../sample-mixer-pages/nxn): A NxN grid that can compose several streams and resize as the streams are added to it.

Additionally, the 3x3 and 2x2 grids can be used together to create compositions of compositions.

Before using the testbed publish one or more live streams as follows:

1. Open the `Red5 Pro Testbed Settings Page`, and set the Web App to `live`. On the same page, scroll to the Mixer Specific section and set the `Backend WebSocket For Compositions` endpoint to point to the [WebSocket server](https://github.com/red5pro/nodejs-mixer-backend/tree/main/backend-mixer-testbeds)
2. While on the `Mixer Specific` section, check `Enable Round Trip Authentication` if the Round Trip Authentication was configured in the `live` app.
3. If the Round Trip Authentication is enabled on the `live` app, head to the `Publish - Stream Manager Proxy RoundTrip Authentication` testbed by clicking `Testbed Menu` -> `Stream Manager Tests` -> `Publish - Stream Manager Proxy RoundTrip Authentication`. Otherwise, head to the `Publish - Stream Manager Proxy` testbed by clicking `Testbed Menu` -> `Stream Manager Tests` -> `Publish - Stream Manager Proxy`
4. If using the `Publish - Stream Manager Proxy RoundTrip Authentication`, provide a set of mock username, password, and token and click `Submit`.

Use the `Grid Composition Manager` testbed as follows:

1. Open the `Red5 Pro Testbed Settings Page`, and set the Web App to `live`. On the same page, scroll to the Mixer Specific section and set the `Backend WebSocket For Compositions` endpoint to point to the [WebSocket server](https://github.com/red5pro/nodejs-mixer-backend/tree/main/backend-mixer-testbeds)
2. Head to the `Grid Composition Manager` testbed by clicking `Testbed Menu` -> `Stream Manager Mixer Tests` -> `Grid Composition Manager`.
3. Create a mixer object using the `Create Mixer Objects` form by providing the following values:
   - Mixer Name - A name for the Mixer.
   - Mixing Page - A page to use for the composition.
   - Scope - The app/room scope where the Mixer will publish the mixed stream.
   - Stream Name - A stream name for the mixed stream
   - Destination Mixer Name - The name of a Mixer to forward the composition to, or leave empty to have the mixer publish back to the Red5 Pro Cluster.
4. Click `Add Mixer` and verify a Mixer has been added to the UI in the `Mixers For Composition` section
5. Create a composition using the following values:
   - Event Name - A name for the composition event
   - Digest - A password for the mixer
   - Transcode Composition - If checked the mixer will publish its mixed stream to a Transcoder node.
   - Mixer Region - The name of the region where the Red5 Pro mixer is currently deployed.
6. Click `Create Composition` and scroll up to the `Active Composition` section where the state of the newly created composition will be shown.
7. Wait until the composition `State` becomes `Composing` and a grid appears on the right-hand side of the page. The grid represents the Mixers that have just been created.
8. The central section of the testbed will include the streams previously published. Drag and drop the streams' boxes into a Mixer on the right side of the page to add the streams to the mixers, remove, mute, or unmute them.
