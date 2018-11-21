# Bandwidth Detection using Red5 Pro

This is an example of using the bandwidth detection webapp on a Red5 Pro server to determine the available bandwidth for streaming.

Note that because this speed test is between the end-user's browser and the Red5 Pro server, the speed measured won't be the same as that from other sources. Not only is the user's connection speed tested, the specific speed that can be expected between the client and server is tested. Since all of the factors that will affect the connection - including distance, ssh encryption - if any, and server load - will also affect responses to this speed test, it can give you a better idea of a realistic streaming quality limit than a generic optimized test to a nearby server.

**Please refer to the [Basic Publisher Documentation](../publisher/README.md) to learn more about the basic setup.**

## Example Code
- **[index.html](index.html)**
- **[index.js](index.js)**
- **[bandwidthDetection.js](bandwidthDetection.js)**

# Running The Speed Test
There are three functions available for testing different speeds: `checkDownloadSpeed`, `checkUploadSpeed`, and `checkSpeeds` which will call both in sequence and return the combined result. They each take a url, and a maximum time to spend on the test - in seconds. Note that for checkSpeeds, this time is split evenly between the upload and download tests. This returns a Promise which resolves with an object, holing the results as floats in its `upload` and/or `download` property, as appropriate.

```
checkSpeeds(config.host, 5.0)
  .then( result => {
    document.getElementById("speed-check-print").innerText = "Bandwidth Detection complete," +
      "Uploading at: " + (Math.round( result.upload *100)/100.0) + "KbpS and downloading at: " +
      (Math.round( result.download *100)/100.0) + "KbpS";
```

[index.js #148](index.js#L148)

From there, the results can be used to determine the target bandwidth for the stream, or to determine if the client has the bandwidth to successfully subscribe to a stream. Also be aware that this check should be done before starting any streams, as the concentration of data can conflict with any streams in progress.
