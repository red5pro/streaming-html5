# Subscribing To a Cluster Server

This is the basic starter example on subscribing to a Red5 Pro stream using the Red5 Pro HTML SDK.

**Please refer to the [Basic Subscriber Documentation](../subscribe/README.md) to learn more about the basic setup.**

# Publishing and Subscribing with Red5 Pro clusters

With clustering, we need to determine which Red5 Pro instance the client will use. The other examples used a static configuration IP for streaming endpoints. Basic clustering uses more than one stream endpoint for subscribers. Advanced clustering uses more than one endpoint for publishers also.

In the basic clustering scenario, our configuration IP will be used differently for publishers and subscribers. Publishers will stream directly to the configuration IP. Subscribers will not. Instead, subscribers will call a web service to receive the IP that should be used.

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

# Configuration of the server.

The **cluster.xml** file located in the `conf` directory of the Red5 Pro Server install. If the server is an edge, add an ip for its origin(s) within the origins list. Every server in your cluster must use the same password or core connections are denied. Set the public facing ip and port.

Origins provide round robin, and you can exclude instances from it by setting the privateInstance property to true on the edge. The hidden edge can be used for other purposes such as being a repeater origin.

```xml
<bean name="clusterConfig" class="com.red5pro.cluster.ClusterConfiguration" >

  <property name="origins">

  <list>
    <!-- add origin ips and optional port if not the default.  -->
    <value>0.0.0.0:1935</value>
  </list>

  </property>
  <!-- edge/origin link cluster password-->
  <property name="password" value="changeme"/>
  <!-- EDGE public ip -->
  <property name="publicIp" value="0.0.0.0"/>
  <!-- EDGE public port -->
  <property name="publicPort" value="1935"/>
  <!-- EDGE include in round robin -->
  <property name="privateInstance" value="false"/>
  </bean>
</beans>
```

The round robin servlet is defined in **web.xml** of your webapp. It is the service point subscribers use to get a playback IP.

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

The URI would be `http://YOUR_IP:5080/YOURAPP/cluster`.

# How to Publish

Publishers must use the origin IP in their configuration. The stream is distributed to the edges from the origin. Use the [Publish example](../publish) to provide a live stream.

# How to Subscribe

Subscribers call the cluster servlet, and use the return data as the configuration IP. The origin will know which edges are active and provide the next in sequence.

```js
function requestEdge(configuration) {
  var url = 'http://' + configuration.host + ':5080/cluster'
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(function (res) {
        if (
          res.headers.get('content-type') &&
          res.headers.get('content-type').toLowerCase().indexOf('text/plain') >=
            0
        ) {
          res.text().then((value) => {
            resolve(value.substring(0, value.indexOf(':')))
          })
        } else {
          reject(res)
        }
      })
      .catch(function (error) {
        var jsonError =
          typeof error === 'string' ? error : JSON.stringify(error, null, 2)
        console.error(
          '[SubscriberClusterTest] :: Error - Could not requst Edge IP. ' +
            jsonError
        )
        reject(error)
      })
  })
}
```

The origin server is returned in plain text with the format `IP:PORT`. As such, we strip the `:PORT` off the end and use the `IP` value as the `host` in the configuration for subscription.
