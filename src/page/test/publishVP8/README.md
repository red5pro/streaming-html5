# Specifying VP8 Encoder for Publisher

This example demonstrates sending AMF Metadata on a Publisher stream connection.

**Please refer to the [Basic Publisher Documentation](../publish/README.md) to learn more about the basic setup.**

## Example Code

- **[index.html](index.html)**
- **[index.js](index.js)**

# How to define VP8 Encoding

The init configuration for a `WHIPClient` and `RTCPublisher` has the following attribute you can use to specify whether to use `VP8` or the default (`H264`) encoding:

- `forceVP8`: If set to `true`, `VP8` encoding will be used. If `false` (default), it will use `H264`.
