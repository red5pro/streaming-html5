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

[index.js#L68](index.js#L68)

[main.js#L60](../../../../static/script/main.js#L60)

## audio element
Use an `audio` HTML element instead of `video`:

```
<audio id="red5pro-publisher-video" controls class="video-element" muted></audio>
```

[index.html#L16](index.html#L16)
