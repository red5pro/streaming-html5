'use strict';

import generateDummyIdrFrame from './dummyframe.js';

function audioTransformFunction (encryptedEncodedFrame, controller) {
    postMessage({streamType: 'audio', frame: {timestamp: encryptedEncodedFrame.timestamp, data: encryptedEncodedFrame.data}});

    controller.enqueue(encryptedEncodedFrame);
}

function videoTransformFunction (encryptedEncodedFrame, controller) {
    postMessage({streamType: 'video', frame: {type: encryptedEncodedFrame.type, timestamp: encryptedEncodedFrame.timestamp, data: encryptedEncodedFrame.data}});

    // feed dummy black frame back into webrtc pipeline, in order to stop the video
    // decoder from requesting key frames
    encryptedEncodedFrame.data = generateDummyIdrFrame();
    controller.enqueue(encryptedEncodedFrame);
}

function handleTransform (streamType, readable, writable) {
    const transformStream = new TransformStream({
        transform: streamType === 'audio' ? audioTransformFunction : videoTransformFunction
    });
    readable.pipeThrough(transformStream).pipeTo(writable);
}

// Handler for RTCRtpScriptTransforms.
if (self.RTCTransformEvent) {
    self.onrtctransform = (event) => {
        const transformer = event.transformer;
        handleTransform(transformer.options.operation, transformer.readable, transformer.writable);
    };
}