# Publish Audio Only
This is an example of publishing audio-only using WebRTC.

### Example Code
- **[index.html](index.html)**
- **[index.js](index.js)**

# Set Up

## getUserMedia
Request the `getUserMedia` using the following constraints:

```
{
  audio: true,
  video: true
}
```

[index.js#68](index.js#68)
[main.js#60](../../../static/script/main.js#60)

## audio element
Use an `audio` HTML element instead of `video`:

```
<audio id="red5pro-publisher-video" controls class="video-element" muted></audio>
```

[index.html#16](index.html#16]
