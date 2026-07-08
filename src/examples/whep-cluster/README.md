# WHEP Cluster (`whep-cluster`)

This example demonstrates WHEP subscribe against a Red5 Pro Standalone cluster where the playback edge is resolved dynamically from the cluster round-robin service.

Instead of subscribing directly to the host from Settings, the example first calls `/cluster`, receives a target `host:port`, and then initializes `WHEPClient` against the resolved host.

## What This Example Demonstrates

- standard `WHEPClient` subscribe lifecycle
- cluster host discovery before subscribe
- subscribing to the resolved edge host (not the original settings host)
- endpoint/status visibility in `r5-subscriber-stats`

## Standalone Server Setup (Required)

To run this example, your Standalone deployment must be configured for clustering and expose the cluster servlet endpoint.

### 1) Configure cluster in `conf/cluster.xml`

- Add origin IPs under `origins` (with optional port)
- Ensure all nodes use the same cluster `password`
- Set public-facing `publicIp` and `publicPort`
- Use `privateInstance` to include/exclude an edge from round-robin

```xml
<bean name="clusterConfig" class="com.red5pro.cluster.ClusterConfiguration">
  <property name="origins">
    <list>
      <!-- add origin ips and optional port if not the default -->
      <value>0.0.0.0:1935</value>
    </list>
  </property>

  <!-- edge/origin link cluster password -->
  <property name="password" value="changeme"/>
  <!-- EDGE public ip -->
  <property name="publicIp" value="0.0.0.0"/>
  <!-- EDGE public port -->
  <property name="publicPort" value="1935"/>
  <!-- EDGE include in round robin -->
  <property name="privateInstance" value="false"/>
</bean>
```

### 2) Expose round-robin servlet in your webapp `web.xml`

Subscribers use this endpoint (`/cluster`) to retrieve the playback IP.

```xml
<servlet>
  <servlet-name>cluster</servlet-name>
  <servlet-class>
    com.red5pro.cluster.plugin.agent.ClusterWebService
  </servlet-class>
  <load-on-startup>2</load-on-startup>
</servlet>

<servlet-mapping>
  <servlet-name>cluster</servlet-name>
  <url-pattern>/cluster</url-pattern>
</servlet-mapping>
```

## Cluster Resolution Flow in This Example

The helper `src/lib/cluster-host-lookup.ts` handles lookup:

1. builds `clusterUrl` from settings as `protocol://host:port/cluster`
2. fetches that URL
3. validates:
   - `HTTP 200`
   - `content-type` includes `text/plain`
   - body contains `host:port`
4. extracts and returns the host portion for playback init

In `src/examples/whep-cluster/index.ts`, `startSubscribe()`:

- calls `resolveHostFromCluster(settings)`
- stores the resolved host for UI display
- initializes `WHEPClient` with:
  - `host: <resolved host>`
  - `protocol: 'http'`
  - `port: 5080`
  - `app`, `streamName`, and optional `connectionParams`
- calls `subscribe()`

## Minimal Developer Snippet

```ts
const { host } = await resolveHostFromCluster(settings)

const subscriber = new red5prosdk.WHEPClient()
await subscriber.init({
  host,
  protocol: 'http',
  port: 5080,
  app: settings.app,
  streamName: settings.streamName,
  mediaElementId: 'subscriber-video',
})

await subscriber.subscribe()
```

## Usage Notes

- This example targets Standalone cluster behavior (not Stream Manager routing).
- `/cluster` must return plain text in `host:port` format.
- If lookup fails, subscribe is aborted and the error is surfaced in the example log.

## Where to Look in This Example

- cluster URL + lookup parsing: `src/lib/cluster-host-lookup.ts`
- subscribe orchestration: `startSubscribe()`
- lifecycle teardown: `stopSubscribe()`
- cluster status UI: `updateConnectionInfo()`

---

Pair this with `whep-basic` to compare direct host subscribe versus cluster-resolved host subscribe.
