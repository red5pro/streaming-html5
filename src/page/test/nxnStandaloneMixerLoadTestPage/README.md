# NxN Grid For CEF Standalone Load Testing

This page enables load testing a standalone CEF Mixer server. The page accepts a set of query parameters that provide to it the list of streams to subscribe to. The page automatically subscribes to those streams from localhost and displays them in a NxN grid that automatically resizes when streams are added. 

Note: The grid does not resize when streams are removed. 

The page requires the following query parameters:
1. baseStreamName - string with the prefix common to all stream names, for example `stream`
2. rangeStart - integer defining the start of a range
2. rangeEnd - integer defining the end of a range

The page subscribes to all stream names that match the prefix and are within range. For example, if the query parameters are `?baseStreamName=stream&rangeStart=1&rangeEnd=100` then the page will automatically subscribe to streams: `stream1`, `stream2`, ..., `stream100`. The page expects all streams to be available on the instance and includes retry logic if subscriptions fail. 