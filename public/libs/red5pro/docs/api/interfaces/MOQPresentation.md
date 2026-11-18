[**Red5 Web SDK v17.0.0-beta.2**](../README.md)

***

[Red5 Web SDK](../globals.md) / MOQPresentation

# Interface: MOQPresentation

Programs, views, renditions, and audio languages derived from the player model.
Grouping stays in the player; this only names what that model already offers.

## Properties

### adoptedAudio

> `readonly` **adoptedAudio**: `SelectableTrack` \| `null`

***

### adoptedVideo

> `readonly` **adoptedVideo**: `SelectableTrack` \| `null`

***

### audio

> `readonly` **audio**: readonly [`MOQPresentationChoice`](MOQPresentationChoice.md)[]

***

### hasVideo

> `readonly` **hasVideo**: `boolean` \| `undefined`

`false` when the adopted scope offers no video.
`undefined` when no scope is adopted yet.

***

### programs

> `readonly` **programs**: readonly [`MOQPresentationChoice`](MOQPresentationChoice.md)[]

***

### videos

> `readonly` **videos**: readonly [`MOQPresentationVideo`](MOQPresentationVideo.md)[]

***

### views

> `readonly` **views**: readonly [`MOQPresentationChoice`](MOQPresentationChoice.md)[]
