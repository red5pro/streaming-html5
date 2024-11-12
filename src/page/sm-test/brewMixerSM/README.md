# Stream Compositing using Brew Mixer

In the concept of a Stream Manager deployment, a Mixer node can be added to a node group configuration which allows one to composite streams being streamed to the Origin into a single output stream to be consumed.

A RESTful API is available through the Stream Manager which provides a means to create, modify and destroy mixers.

User applications - such as this testbed example - control the mixer using a graph-based “RenderTree”, which allows modular video positioning and sizing as well as an audio mixing graph controlling the volume and panning of various sources.

# Set Up

Before using this example, you should have a Node Group configuration residing in your Stream Manager deployment that enables a Mixer Node.

## Manual Configuration

Along with the usual `origin` and `edge` node configuration within the Node Group provision, there should be a `mixer` configuration such as the following, that defines a node that will run the Brew Mixer webapp:

```json
"roles": {
	"origin": {
    ...
  },
  "edge": {
    ...
  },
  "mixer": {
    "name": "mixer",
    "lifecycle": "MANUAL",
    "imageName": "MixerImage",
    "capabilities": [
      "MIX"
    ],
    "initScripts": [
      "sudo /usr/local/red5pro/extras/brewmixer/node-mixer-sm-deploy.sh",
      "sudo chown -R ubuntu /usr/local/red5pro"
    ],
    "propertyOverrides": [
      {
        "fileName": "plugins/nodemixer/module-nodemixer.xml",
        "blocks": [
        "R5AS-BREWMIXER"
        ]
      }
    ]
  }
}
```

Additionally, you will need to define the `MixerImage` which will be used in node deployment:

```json
"images": {
	"BaseImage": {
	  "name": "BaseImage",
	  "image": "as-node-xxx",
	  "cloudProperties": "instance_type=VM.Standard.E4.Flex-1-4"
	},
	"MixerImage": {
	  "name": "MixerImage",
	  "image": "as-node-xxx",
	  "cloudProperties": "instance_type=VM.Standard.E4.Flex-8-16"
	}
  }
```

> The Mixer is responsible for consuming multiple stream and producing a single composited stream. As such, it is recommended to deploy the Mixer node on an instance with enough resources, as shown above.

# Testbed Example

This testbed example provides a means to use what is referred to as the Render Tree Controller commonly shipped with the standalone brewmixer webapp.

The Render Tree Controller interface allows you to manipulate the composition of multiple streams, with modifications seen live by all subscribers to the single output stream produced by the Mixer.

Such features include, but are not limited to:

1. Displaying all incoming streams in a 2x2, 3,3 or 4x4 grid.
2. Manipulating the position and size of each stream in the grid.

## Post a Mixer Provision

## Start Streams on Origin

## Assumptions

Though this testbed example displays the power of the Mixer and Render Tree Controller, some assumptions have been made to aide in demonstration purposes. Those are:

1. The streams being subscribed to are have the following guid: `live/stream<1..N>`, in which all streams are being sent the Origin node at `live` webapp scope and have the prefix of `stream` following by the numbers `1..16`.
2. The source streams coming in are at a 16:9 resolution and will look best if 1080p.
