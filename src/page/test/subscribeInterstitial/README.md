# Subscribe Interstitial Media Insertion

This example demonstrates the interstitial feature. The player begins streaming one stream initially. Controls on the page can be used to send InterstitialREST requests to the server to insert other streams into the initial stream.

# Example InterstitialREST Implementation in live

The InterstitialREST servlet inserts static content or other live streams into an existing live stream. The details of the initiating the interstitial streaming operations are delegated by the servlet to one or more registered `IInterstitialRequestHandlers`. 

An example `IInterstitialRequestHandler` is provided in the **red5pro-server-examples** `live` webapp, in the class `com.infrared5.red5pro.live.InterstitialRequestHandlerImpl`. See **Implementation**, below.

With the `live` example webapp installed (`live.war`) and configured (see **Configuration**, below), REST requests to the servlet enable or disable interstitial streaming. The URI of the request differs between these two methods. See **REST API**, below.

An example REST client can be found in the server examples, in `src/test/java` the class `com.red5pro.test.InterstitialHelper` demonstrates. See **Client**, below.

# Configuration

## clientBroadcastStream
In `conf/red5-common.xml`, configure `clientBroadcastStream` (last item in file) to `class="com.red5pro.interstitial.InterstitialStream"`. The rest of the `bean` definition (and child `property`) remain the same.

## Servlet definition
Define the InterstitialREST servlet in your webapp. In the example `live` webapp, this is already done (in `webapps/live/WEB-INF/web.xml`):

    <servlet>
        <servlet-name>interstitial</servlet-name>
        <servlet-class>com.red5pro.interstitial.service.InterstitialREST</servlet-class>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>interstitial</servlet-name>
        <url-pattern>/interstitial</url-pattern>
    </servlet-mapping>

## Disable live implementation
The `live` webapp can be configured so that no `IInterstitialRequestHandler` is registered on startup. This is useful in situations where another `IInterstitialRequestHandler` must be registered in a different, simultaneously deployed webapp.

In `webapps/live/WEB-INF/red5-web.xml`, find the `bean` with `id` "`web.handler`",the property `isInterstitialHandlerEnabled`. By default this is `true`. 

# REST API

## Stream Manager
In a clustered environment, interstitial requests are POSTed to the Stream Manager, which then delegates to the correct Origin. 

### Example URI
The Stream Manager URI requires the **access token**. 
`https://qasmjune2020.red5.org:/streammanager/api/4.0/interstitial?accessToken=xyz123`

## Standalone
In a standalone environment, forwarding requests are POSTed directly to the SocialPusher plugin.

### Example URI
`http://localhost:5080/live/interstitial`

## Request Body
In both the Stream Manager and Standalone cases, the body of the request is the same. It contains JSON data describing an `com.red5pro.interstitial.api.InterstitialRequest` with zero, one or more `com.red5pro.interstitial.api.InterstitialInserts`, each of which specifies a target live stream and a second "interstitial" live stream to be inserted into the target.

When an `InterstitialSession` is already active, the insert can be removed (returning to the target stream) by specifying the target stream in the optional `resume` field. 

Note that if both `resume` and `inserts` are present, then **`inserts` is ignored** and `resume` takes precendence.

### Example: Inserts
```json
{
  "user": "any",
  "digest": "any",
  "inserts": [
    {
      "id": 3,
      "target": "live/stream1",
      "uri": "live/stream2",
      "loop": true,
      "type": "Indefinite",
      "isInterstitialVideo": true,
      "isInterstitialAudio": true,
      "start": 0,
      "duration": 30000
    }
  ]
}
```

The above example defines an array with a single `InterstitialInsert`. These are its fields:

**`user`** This string is required but unused by the InterstitialREST servlet. It is passed through to the IInterstitialRequestHandler. 

**`digest`** This string is required but unused by the InterstitialREST servlet. It is passed through to the IInterstitialRequestHandler.

**`inserts`** This is the array of `InterstitialInsert`.

**`id`** Integer insert ID, unused by the server. It is passed through to the IInterstitialRequestHandler.

**`target`** The target live stream, including both context path and stream name.

**`uri`** The new stream to insert into the live stream, including both context path and stream name. Or, for static content, the name of an FLV file found in `webapps/live/streams`.

**`loop`** For FLV streams, this boolean indicates whether the clip should loop when it ends.

**`isInterstitialAudio`** Boolean value defines if the Audio channel should be inserted. Optional. Defaults to true.

**`isInterstitialVideo`** Boolean value defines if the Video channel should be inserted. Optional. Defaults to true.

**`type`** This is `InterstitialDurationControlType`, an enum which can have the values `INDEFINITE`, `STREAM_CLOCK`, or `WALL_CLOCK`. This determines how (or if) the `start` and `duration` parameters are interpreted. 
	
> **`INDEFINITE`** starts immediately. `start` and `duration` are unused.
> **`STREAM_CLOCK`** starts `start` milliseconds after publish-start and ends after `duration`.
> **`WALL_CLOCK`** starts at `start` UTC milliseconds and ends after `duration`.
	
**`start`** milliseconds.

**`duration`** milliseconds.

### Example: Resume
```json
{
	"user":"any",
	"digest":"any",
	"resume":"live/stream1"
}
```

**`user`** This string is required but unused by the InterstitialREST servlet. It is passed through to the IInterstitialRequestHandler. 

**`digest`** This string is required but unused by the InterstitialREST servlet. It is passed through to the IInterstitialRequestHandler. 

**`resume`** This is the context path and name of the target stream to resume. 

# Implementation

When the InterstitialREST servlet receives an `InterstitialRequest`, first it performs some validation. It verifies that the `user` and `digest` fields are present. It then verifies that either `resume` or the `inserts` array are present.

Assuming the request is valid, either the `resume` parameter, or if not present the `inserts` array, is delegated to each of the servlet's registered `IInterstitialRequestHandlers` by calling either `.resume(...)` or `.newRequest(...)`, respectively. If there are no registered handlers, the servlet has no effect and the message is ignored.

## IInterstitialRequestHandler
The interface `IInterstitialRequestHandler` contains its own list of registered `handlers`, and it defines the `.resume(...)` and `.newRequest(...)` method signatures.

```java
public interface IInterstitialRequestHandler {
	static final CopyOnWriteArraySet<IInterstitialRequestHandler> handlers = new CopyOnWriteArraySet<>();

	void newRequest(String user, String digest, List<InterstitialInsert> inserts) throws InterstitialException;

	void resume(String user, String digest, String path) throws InterstitialException;
}
```

## IInterstitialConfiguration
The interface `IInterstitialConfiguration` allows you to adjust the URI target after video resolution and audio sample rates are discovered (`configure(...)`). It also allows you to be notified that an interstitial session is next in schedule so you can acquire and prepare any remote or unusual media sources (`queueSession(...)` is called when an interstitial is about to be activated).

```java
public interface IInterstitialConfiguration {
	public InterstitialSession configure(IInterstitialStream stream, InterstitialSession session);

	public void queueSession(InterstitialSession session);
}
```

## InterstitialRequestHandlerImpl
In the **red5pro-server-examples** `live` webapp, in the class `com.infrared5.red5pro.live.InterstitialRequestHandlerImpl` demonstrates a functional implementation of `IInterstitialRequestHandler`. It is tightly coupled to `Red5ProLive` in the same package, which is an example application adapter that most importantly maintains a map of active live streams.

When the webapp initializes, `Red5ProLive.appStart(...)` is called, which first performs some unrelated initialization and then constructs the `InterstitialRequestHandlerImpl` and registers it in `IInterstitialRequestHandler.handlers`. Thereafter, the `InterstitialREST` servlet will call either `newRequest(...)` or `resume(...)` when a valid `InterstitialRequest` is received.

### `InterstitialRequestHandlerImpl.newRequest(...)`
The `InterstitialREST` servlet calls `newRequest(...)` when it receives an `InterstitialRequest` containing no `resume` field and containing an `insert` array with at least one element.

The example implementation ignores `user` and `digest` for simplicity.

The `List<InterstitialInserts>` from the request is iterated, and for each insert definition we determine if the insert is a static file or a live stream using the simplistic check:

```java
if (insert.interstitial.contains(".flv")) {
```

#### Static File
To insert static content from a file, we construct an `FLVInterstitial`, which is a kind of `InterstitialSession`. Importantly, we override the `open()`, `process(...)` and `dispose()` methods. This `FLVInterstitial` object locates the FLV file and streams its packets.

The `InterstitialDurationControl` details are handled by `FLVInterstitial's` parent class, `InterstitialSession` which implements duration control functionality in the `compareTo(...)` method.

With the `FLVInterstitial` prepared, we look up the target stream as an `InterstitialStream` (see **Configuration**, above), and we add the `FLVInterstitial` to the target stream's `InterstitialEngine`.

##### `FLVInterstitial.open()`
The FLV file is located using the `IProviderService` to get the VOD provider, and then it subscribes for OOB messages for illustrative purposes (the messages are not used in this implementation).

##### `FLVInterstitial.process()`
When events are dispatched on the target `InterstitialStream`, it calls `FLVInterstitial.process()`.

The core of `process()` is to pull an event from the FLV stream and then to call `InterstitialSession.dispatchEvent(...)` with both the FLV event and the event from the target stream. `dispatchEvent(...)` encapsulates the decision about whether this packet should be dispatched on to the output or not, based on the packet type and whether audio and/or video is being forwarded (inserted).

##### `FLVInterstitial.dispose()`
Unsubscribes as `IConsumer` at lifecycle completion. 

#### Live Stream
To insert content from a live stream in `newRequest(...)`, first we look up both the target stream and the new stream to insert. Then we construct a `LiveInterstitial` with these two streams. `LiveInterstitial` is a kind of `InterstitialSession`.

While `LiveInterstitial` does override the `open()`, `process(...)` and `dispose()` methods, it also implements `IStreamListener` and receives packets from the new stream in `packetReceived(...)`.

##### `LiveInterstitial.open(...)`
In `open(...)`, we add the `LiveInterstitial` to the new stream as an `IStreamListener` so that events on the new stream flow through `packetReceived(...)`.

##### `LiveInterstitial.packetReceived(...)`
The logic in `packetReceived(...)` is designed to discard video packets until a keyframe arrives. It essentially filters packets and then finally, if the packet has not been eliminated, it calls `dispatchEvent(...)` to pass packets from the new stream to `InterstitialSession`.

##### `LiveInterstitial.process(...)`
Simply dispatch events from the target stream to the `InterstitialSession`.

##### `LiveInterstitial.streamStopped(...)`
This method is called when the new stream ends. We flag the stream as dead so that we can throw an exception to the `InterstitialEngine` when it next calls.

Also, we remove this `LiveInterstitial` from the new stream's `IStreamListeners` to stop further calls to `process(...)`.

##### `LiveInterstitial.dispose()`
Remove this `LiveInterstitial` from the new stream's `IStreamListeners`.

### `InterstitialRequestHandlerImpl.resume(...)`
The implementation of `resume(...)` is straightforward. First we look up the target stream by path, and then we call `stream.getInterstitialEngine().resumeProgram()`.

# Java Example Client
In **red5pro-server-examples** in `src/test/java` you will find  `IntersterstitialHelper.java` which is a standalone Swing app that uses the HttpClient library to make InterstitialREST servlet calls. It demonstrates both insert and resume operations.
