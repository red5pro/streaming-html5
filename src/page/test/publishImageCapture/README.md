# Publish Image Capture
This example demonstrates capturing a still of the camera by using the `drawImage` API of `CanvasRenderingContext2D`.

**Please refer to the [Basic Publisher Documentation](../publish/README.md) to learn more about the basic setup.**

### Example Code
- **[index.html](index.html)**
- **[index.js](index.js)**

> These examples use the WebRTC-based Publisher implementation from the Red5 Pro HTML SDK. However, there is failover support to allow for Flash-base publisher on unsupported browsers.

## Running the Example
Click on the video playback to generate a still image of the video and display it below the video preview.

## Using drawImage

```js
function clearCanvas (targetElement, canvasElement) {
  var context = canvasElement.getContext('2d');
  context.fillStyle = '#a1a1a1';
  context.fillRect(0, 0, targetElement.offsetWidth, targetElement.offsetHeight);
}

function drawOnCanvas (targetElement, canvasElement) {
  var context = canvasElement.getContext('2d');
  canvasElement.width = targetElement.offsetWidth;
  canvasElement.height = targetElement.offsetHeight;
  context.drawImage(targetElement, 0, 0, targetElement.offsetWidth, targetElement.offsetHeight);
  }

captureTarget.addEventListener('click', function () {
  clearCanvas(videoElement, canvasElement);
  drawOnCanvas(videoElement, canvasElement);
});
```

<sup>
[index #141](index#L141)
</sup>

> More information: [CanvasRenderingContext2D.drawImage from MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)
