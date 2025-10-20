import * as types_playback from 'types/playback';
import { PlaybackState, PlaybackVideoEncoder, PlaybackAudioEncoder } from 'types/playback';
export { PlaybackAudioEncoder, PlaybackState, PlaybackStateReadableMap, PlaybackVideoEncoder } from 'types/playback';
import * as browser_bunyan_lib from 'browser-bunyan/lib';
import { PublishVideoEncoder, PublishAudioEncoder } from 'types/publisher';
export { PublishAudioEncoder, PublishVideoEncoder } from 'types/publisher';
import { Logger } from 'browser-bunyan';
import { Event as Event$1, SubscriberEvent, PublisherEvent, MessageTransportStateEvent } from 'event';
export { Event, MessageTransportStateEvent, PublisherEvent, SubscriberEvent } from 'event';
import EventEmitter$1 from 'core/event-emitter';
import { RTCWhipPublisherConfigType } from 'configuration/publisher';
export { BandwidthConfig, MediaConstraintRange, MediaConstraints, RTCPublisherConfigType, RTCWhipPublisherConfigType, VideoConstraints, defaultWhipPublisherConfig } from 'configuration/publisher';
import { MessageTransport } from 'types/message-transport';
import StatsConfig from 'configuration/stats';
export { default as StatsConfig, defaultStatsConfig } from 'configuration/stats';
import { RTCWhepSubscriberConfigType, HLSSubscriberConfigType } from 'configuration/subscriber';
export { HLSSubscriberConfigType, RTCSubscriberConfigType, RTCWhepSubscriberConfigType, defaultHLSSubscriberConfig, defaultWhepSubscriberConfig } from 'configuration/subscriber';
import WhipWhepSignalingHelper from 'helper/wish-signal-helper';
import { PlaybackView } from 'view/playback';
import RTCPeerConnectionSubscriber from 'helper/peer-connection-sub';
import RTCSubscriberStats from 'stats/subscriber-stats';
import { LiveSeekConfigType } from 'configuration/liveseek';
export { LiveSeekConfigType, LiveSeekOptions, defaultLiveSeekConfig } from 'configuration/liveseek';
import { PublisherEventTypes, SubscriberEventTypes, RTCPublisherEventTypes, RTCSubscriberEventTypes, MessageTransportStateEventTypes } from 'event/event-types';
export { MessageTransportStateEventTypes, PublisherEventTypes, RTCPublisherEventTypes, RTCSubscriberEventTypes, SubscriberEventTypes } from 'event/event-types';

declare const LEVELS: {
    readonly TRACE: "trace";
    readonly INFO: "info";
    readonly DEBUG: "debug";
    readonly WARN: "warn";
    readonly ERROR: "error";
    readonly FATAL: "fatal";
};
/**
 * Return the determined logger instance.
 *
 * @return {Logger} The logger instance.
 *
 * @private
 */
declare const getLogger: () => Logger;
/**
 * Returns the stored logs if requested to `record` on establishment of logger.
 *
 * @return {string[]} Array of recorded log messages.
 */
declare const getRecordedLogs: () => string[];

/**
 * WHIP-based Publisher.
 *
 * The `WHIPClient` - under the hood - is based on the [WebRTC-HTTP ingestion](https://www.ietf.org/archive/id/draft-ietf-wish-whip-01.html)(WHIP) protocol providing the ability to negotation and establish a connection using HTTP/S requests. This removes the requirement for a WebSocket, which historically has been used for the role of negotiation and connection.
 * This provides a standardized - and _blazingly fast_ - way to establish and publish a live stream using WebRTC.
 */
declare class WHIPClient extends EventEmitter$1 {
    private _options;
    private _peerConnectionHelper;
    private _mediaStream;
    private _whipWhepService;
    private _messageTransport;
    private _publishView;
    private _statisticsConfiguration;
    private _statsMonitor;
    /**
     * Constructor. Providing arguments will automatically kick of connection sequence.
     * Leaving arguments unset allows for more control and follows same pattern of init.
     * @param {string} url Optional endpoint for WHIP. Example: https://your-red5pro.com/live/whip/endpoint/stream1
     * @param {HTMLMediaElement} element Optional media element to play media in.
     * @param {RTCWhipPublisherConfigType} additionalOptions Optional additional options to override defaults.
     */
    constructor(url?: string | undefined, element?: HTMLMediaElement | undefined, additionalOptions?: RTCWhipPublisherConfigType | undefined);
    private internalInit;
    private generateMediaStream;
    private getAndPreviewStreamIfAvailable;
    private reorderCodecPreferences;
    private postOffer;
    private postCandidateFragments;
    /**
     * Initialize the WHIPClient.
     *
     * @param {RTCWhipPublisherConfigType} options - The options to use for initialization.
     * @returns {Promise<WHIPClient>}
     */
    init(options: RTCWhipPublisherConfigType): Promise<this>;
    /**
     * Initialize the WHIPClient with a MediaStream. Doing so will skip the SDK attempting to generate a MediaStream through browser-based media APIs.
     *
     * @param {RTCWhipPublisherConfigType} options - The options to use for initialization.
     * @param {MediaStream} stream - The stream to use for initialization.
     * @returns {Promise<WHIPClient>}
     */
    initWithStream(options: RTCWhipPublisherConfigType, stream: MediaStream): Promise<this>;
    /**
     * Publish the MediaStream to the server.
     *
     * @param {string} streamName - The name of the stream to publish.
     * @returns {Promise<WHIPClient>}
     */
    publish(streamName?: string | undefined): Promise<this>;
    /**
     * Unpublish the MediaStream from the server.
     *
     * @param {boolean} internal - Whether the unpublish is internal (i.e. not triggered by the user).
     * @returns {Promise<void>}
     */
    unpublish(internal?: boolean): Promise<void>;
    /**
     * Preview the MediaStream in a HTML media element.
     *
     * @param mediaStream - The MediaStream to preview.
     * @private
     */
    preview(mediaStream: MediaStream): void;
    /**
     * Unpreview the MediaStream from the HTML media element.
     *
     * @private
     */
    unpreview(): void;
    /**
     * Monitor the statistics of the MediaStream being published to the server over the underlying RTCPeerConnection..
     *
     * @param {StatsConfig} stats - The statistics configuration.
     * @returns {WHIPClient}
     */
    monitorStats(stats?: StatsConfig | undefined): WHIPClient;
    /**
     * Unmonitor the statistics of the MediaStream being published to the server over the underlying RTCPeerConnection.
     *
     * @returns {WHIPClient}
     */
    unmonitorStats(): WHIPClient;
    /**
     * Mute the audio being published to the server.
     *
     * @returns {void}
     */
    muteAudio(): void;
    /**
     * Unmute the audio being published to the server.
     *
     * @returns {void}
     */
    unmuteAudio(): void;
    /**
     * Mute the video being published to the server.
     *
     * @returns {void}
     */
    muteVideo(): void;
    /**
     * Unmute the video being published to the server.
     *
     * @returns {void}
     */
    unmuteVideo(): void;
    /**
     * Send a message to the server.
     *
     * @param {string} methodName - The name of the method to send.
     * @param {any} data - The data to send.
     * @returns {void}
     */
    send(methodName: string, data: any): Promise<boolean> | undefined;
    /**
     * Call a method on the server.
     *
     * @param {string} methodName - The name of the method to call.
     * @param {any} args - The arguments to call the method with.
     * @returns {Promise<any>}
     */
    callServer(methodName: string, args: any): Promise<any>;
    /**
     * Send a log message to the server.
     *
     * @param {string} level - The level of the log message.
     * @param {any} message - The message to send.
     */
    sendLog(level: string, message: any): void;
    /**
     * Get the options for the WHIPClient.
     *
     * @returns {RTCWhipPublisherConfigType | undefined}
     */
    get options(): RTCWhipPublisherConfigType | undefined;
    /**
     * Get the options for the WHIPClient.
     *
     * @returns {RTCWhipPublisherConfigType | undefined}
     */
    getOptions(): RTCWhipPublisherConfigType | undefined;
    /**
     * Get the PeerConnection for the WHIPClient.
     *
     * @returns {RTCPeerConnection | undefined}
     */
    getPeerConnection(): RTCPeerConnection | undefined;
    /**
     * Get the DataChannel for the WHIPClient.
     *
     * @returns {RTCDataChannel | undefined}
     */
    getDataChannel(): RTCDataChannel | undefined;
    /**
     * Get the MediaStream generated for the WHIPClient.
     *
     * @returns {MediaStream | undefined}
     */
    getMediaStream(): MediaStream | undefined;
    /**
     * Get the MessageTransport for the WHIPClient.
     *
     * @returns {MessageTransport | undefined}
     */
    getMessageTransport(): MessageTransport | undefined;
    private _onDataChannelError;
    private _onSendReceived;
    private _onMetaData;
    private _onConnectionClosed;
    private _onDataChannelOpen;
    private _onDataChannelClose;
    private _onDataChannelMessage;
    private _onPeerConnectionTrackAdd;
    private _onPeerConnectionOpen;
    private _onPeerConnectionFail;
    private _onPeerConnectionClose;
    private _onIceCandidate;
    private _onUnpublish;
    private _onPublisherStatus;
    private _onInsufficientBandwidth;
    private _onSufficientBandwidth;
    private _onRecoveringBandwidth;
    private _onSDPSuccess;
    private _onSDPError;
    private _onOrientationChange;
    private _onStatisticsEndpointChange;
    private _onStatsReport;
    /**
     * Add an event listener to the WHIPClient.
     *
     * @param {string} type - The type of event to listen for.
     * @param {Function} fn - The function to call when the event is triggered.
     */
    on(type: string, fn: (event: Event$1) => void): void;
    /**
     * Remove an event listener from the WHIPClient.
     *
     * @param {string} type - The type of event to remove the listener from.
     * @param {Function} fn - The function to remove the listener from.
     */
    off(type: string, fn: (event: Event$1) => void): void;
    /**
     * Trigger an event on the WHIPClient.
     *
     * @param {Event} event - The event to trigger.
     */
    trigger(event: Event$1): void;
    /**
     * Get the type of the WHIPClient (RTC).
     *
     * @returns {string}
     */
    getType(): string;
}

/**
 * Base class for a PlaybackControls within the Red5 Pro WebRTC SDK.
 * A PlaybackControls is responsible for managing the playback and state of an HTML media element through UI controls.
 */
declare abstract class PlaybackControls extends EventEmitter$1 {
    /**
     * Enable or disable the playback controls.
     *
     * @param {boolean} enable - Whether the playback controls are enabled.
     * @returns {void}
     */
    abstract enable(enable: boolean): void;
    /**
     * Set the muted state of the media element.
     *
     * @param {boolean} muted - Whether the media element is muted.
     * @returns {void}
     */
    abstract setMutedState(muted: boolean): void;
    /**
     * Get the volume of the media element.
     *
     * @returns {number}
     */
    abstract getVolume(): number;
    /**
     * Set the volume of the media element.
     *
     * @param {number} volume - The volume to set.
     * @returns {void}
     */
    abstract setVolume(volume: number): void;
    /**
     * Set the seek time of the media element.
     *
     * @param {number} time - The time to seek to.
     * @param {number} duration - The duration of the media element.
     * @returns {void}
     */
    abstract setSeekTime(time: number, duration?: number): void;
    /**
     * Set the state of the media element.
     *
     * @param {PlaybackState} state - The state to set.
     * @returns {void}
     */
    abstract setState(state: PlaybackState): void;
    /**
     * Set the VOD state of the media element.
     *
     * @param {boolean} isVOD - Whether the media element is a VOD.
     * @returns {void}
     */
    abstract setAsVOD(isVOD: boolean): void;
    /**
     * Set the playback duration of the media element.
     *
     * @param {number} duration - The duration to set.
     * @returns {void}
     */
    abstract setPlaybackDuration(duration: number): void;
    /**
     * Get the playback duration of the media element.
     *
     * @returns {number}
     */
    abstract getPlaybackDuration(): number;
    /**
     * Detach the playback controls from the media element.
     *
     * @returns {void}
     */
    abstract detach(): void;
    /**
     * Trigger an event on the PlaybackControls.
     *
     * @param {Event} event - The event to trigger.
     * @returns {void}
     */
    trigger(event: Event$1): void;
    /**
     * Add an event listener to the PlaybackControls.
     *
     * @param {string} type - The type of event to listen for.
     * @param {Function} fn - The function to call when the event is triggered.
     * @returns {void}
     */
    on(type: string, fn: (...args: any[]) => void): void;
    /**
     * Remove an event listener from the PlaybackControls.
     *
     * @param {string} type - The type of event to remove the listener from.
     * @param {Function} fn - The function to remove the listener from.
     * @returns {void}
     */
    off(type: string, fn: (...args: any[]) => void): void;
}

/**
 * Base class for a PlaybackController within the Red5 Pro WebRTC SDK.
 * A PlaybackController is responsible for managing the playback and state of a media element.
 */
declare abstract class PlaybackController extends EventEmitter$1 {
    /**
     * Play the media element.
     *
     * @param {boolean} fromControls - Whether the play was triggered from the controls.
     * @returns {void}
     */
    abstract play(fromControls?: boolean): void;
    /**
     * Pause the media element.
     *
     * @param {boolean} fromControls - Whether the pause was triggered from the controls.
     * @param {boolean} fromSeekAction - Whether the pause was triggered from a seek action.
     * @returns {void}
     */
    abstract pause(fromControls?: boolean, fromSeekAction?: boolean): void;
    /**
     * Resume the media element.
     *
     * @param {boolean} fromControls - Whether the resume was triggered from the controls.
     * @param {boolean} fromSeekAction - Whether the resume was triggered from a seek action.
     * @returns {void}
     */
    abstract resume(fromControls?: boolean, fromSeekAction?: boolean): void;
    abstract stop(fromControls?: boolean): void;
    /**
     * Mute the media element.
     *
     * @returns {void}
     */
    abstract mute(): void;
    /**
     * Unmute the media element.
     *
     * @returns {void}
     */
    abstract unmute(): void;
    /**
     * Set the volume of the media element.
     *
     * @param {number} value - The volume to set.
     * @param {boolean} fromControls - Whether the volume was triggered from the controls.
     * @returns {void}
     */
    abstract setVolume(value: number, fromControls?: boolean): void;
    /**
     * Get the volume of the media element.
     *
     * @returns {number}
     */
    abstract getVolume(): number;
    /**
     * Seek to a specific time in the media element.
     *
     * @param {number} value - The time to seek to.
     * @param {number} duration - The duration of the media element.
     * @param {boolean} fromControls - Whether the seek was triggered from the controls.
     * @returns {void}
     */
    abstract seekTo(value: number, duration?: number, fromControls?: boolean): void;
    /**
     * Toggle the full screen mode of the media element.
     *
     * @param {HTMLElement} element - The element to toggle the full screen mode of.
     * @param {boolean} fromControls - Whether the full screen was triggered from the controls.
     * @returns {void}
     */
    abstract toggleFullScreen(element?: HTMLElement | undefined, fromControls?: boolean): void;
    /**
     * Trigger an event on the PlaybackController.
     *
     * @param {Event} event - The event to trigger.
     * @returns {void}
     */
    trigger(event: Event$1): void;
    /**
     * Add an event listener to the PlaybackController.
     *
     * @param {string} event - The event to listen for.
     * @param {Function} fn - The function to call when the event is triggered.
     * @returns {void}
     */
    on(event: string, fn: (...args: any[]) => void): void;
    /**
     * Remove an event listener from the PlaybackController.
     *
     * @param {string} event - The event to remove the listener from.
     * @param {Function} fn - The function to remove the listener from.
     * @returns {void}
     */
    off(event: string, fn: (...args: any[]) => void): void;
}
/**
 * Base class for a SourceHandler within the Red5 Pro WebRTC SDK.
 * A SourceHandler is responsible for managing the MediaStream source of a media element.
 */
declare abstract class SourceHandler extends PlaybackController {
    /**
     * Check if the media element is muted.
     *
     * @returns {boolean}
     */
    abstract isMuted(): boolean;
    /**
     * Get the controls for the media element.
     *
     * @returns {PlaybackControls | undefined}
     */
    abstract getControls(): PlaybackControls | undefined;
    /**
     * Attempt to autoplay the media element.
     *
     * @param {boolean} muteOnAutoplay - Whether to mute the media element on autoplay if the browser has a restriction.
     * @returns {void}
     */
    abstract attemptAutoplay(muteOnAutoplay: boolean): void;
    /**
     * Unpublish the media element.
     *
     * @returns {void}
     */
    abstract unpublish(): void;
    /**
     * Disconnect the media element.
     *
     * @returns {void}
     */
    abstract disconnect(): void;
}

/**
 * WHEP-based Subscriber.
 *
 * The `WHEPClient` - under the hood - is based on the [WebRTC-HTTP egress](https://www.ietf.org/archive/id/draft-ietf-wish-whep-03.html)(WHEP) protocol providing the ability to negotation and establish a connection using HTTP/S requests. This removes the requirement for a WebSocket, which historically has been used for the role of negotiation and connection.
 * This provides a standardized - and _blazingly fast_ - way to establish and playback a live stream using WebRTC.
 */
declare class WHEPClient extends PlaybackController {
    protected _options: RTCWhepSubscriberConfigType | undefined;
    protected _peerConnectionHelper: RTCPeerConnectionSubscriber | undefined;
    protected _whipWhepService: WhipWhepSignalingHelper | undefined;
    protected _messageTransport: MessageTransport | undefined;
    protected _playbackView: PlaybackView | undefined;
    protected _mediaStream: MediaStream | undefined;
    protected _sourceHandler: SourceHandler | undefined;
    protected _statisticsConfiguration: StatsConfig | undefined;
    protected _statsMonitor: RTCSubscriberStats | undefined;
    protected _orientation: number | undefined;
    protected _streamingMode: string | undefined;
    protected _requestedStreamSwitch: string | undefined;
    protected _videoMuted: boolean;
    protected _audioMuted: boolean;
    protected _videoUnmuteHandler: (event: Event$1) => void;
    protected _audioUnmuteHandler: (event: Event$1) => void;
    /**
     * Constructor for the WHEP-based Subscriber.
     *
     * @param {string | undefined} url - Optional WHEP endpoint URL for the live stream.
     * @param {HTMLMediaElement | undefined} element - Optional HTMLMediaElement to use for live stream playback.
     * @param {RTCWhepSubscriberConfigType | undefined} additionalOptions - Optional RTCWhepSubscriberConfigType to use for configuration.
     */
    constructor(url?: string | undefined, element?: HTMLMediaElement | undefined, additionalOptions?: RTCWhepSubscriberConfigType | undefined);
    private internalInit;
    private _runMuteCheck;
    private _onVideoUnmute;
    private _onAudioUnmute;
    protected _attachSourceHandler(view: HTMLMediaElement): void;
    protected _glomTrigger(sourceHandler: PlaybackController): void;
    protected _playIfAutoplaySet(options: RTCWhepSubscriberConfigType | undefined, view: HTMLMediaElement | undefined): void;
    protected addMediaStreamToPlayback(mediaElementId: string, mediaStream: MediaStream): void;
    private requestOffer;
    private requestAnswer;
    private sendAnswer;
    private postCandidateFragments;
    /**
     * Initialize the WHEP-based Subscriber.
     *
     * @param {RTCWhepSubscriberConfigType} options - RTCWhepSubscriberConfigType to use for configuration.
     * @returns {Promise<WHEPClient>}
     */
    init(options: RTCWhepSubscriberConfigType): Promise<WHEPClient>;
    /**
     * Subscribe to the WHEP-based Subscriber.
     *
     * @returns {Promise<WHEPClient>}
     */
    subscribe(): Promise<WHEPClient>;
    /**
     * Unsubscribe from the WHEP-based Subscriber.
     *
     * @param {boolean} internal - Optional boolean to indicate if the unsubscribe is internal.
     * @returns {Promise<WHEPClient>}
     */
    unsubscribe(internal?: boolean): Promise<void>;
    /**
     * Send a message to the Red5 Pro Server over the message transport (DataChannel).
     *
     * @param {string} methodName - The method name to send.
     * @param {any} data - The data to send.
     */
    send(methodName: string, data: any): Promise<boolean> | undefined;
    /**
     * Call a method on the Red5 Pro Server over the message transport (DataChannel).
     *
     * @param {string} methodName - The method name to call.
     * @param {any} args - The arguments to call the method with.
     */
    callServer(methodName: string, args: any): Promise<any>;
    /**
     * Send a log message to the Red5 Pro Server over the message transport (DataChannel).
     *
     * @param {string} level - The level of the log message.
     * @param {any} message - The message to send.
     */
    sendLog(level: string, message: any): void;
    /**
     * Enable standby mode for the WHEP-based Subscriber. This will signal to the server to hold back audio and video.
     *
     * @returns {void}
     */
    enableStandby(): void;
    /**
     * Disable standby mode for the WHEP-based Subscriber. This will signal to the server to resume audio and video.
     *
     * @returns {void}
     */
    disableStandby(): void;
    /**
     * Mute the audio being delivered to the subscriber.
     *
     * @returns {void}
     */
    muteAudio(): void;
    /**
     * Unmute the audio being delivered to the subscriber.
     *
     * @returns {void}
     */
    unmuteAudio(): void;
    /**
     * Mute the video being delivered to the subscriber.
     *
     * @returns {void}
     */
    muteVideo(): void;
    /**
     * Unmute the video being delivered to the subscriber.
     *
     * @returns {void}
     */
    unmuteVideo(): void;
    /**
     * Get the options for the WHEP-based Subscriber.
     *
     * @returns {RTCWhepSubscriberConfigType | undefined}
     */
    get options(): RTCWhepSubscriberConfigType | undefined;
    /**
     * Get the options for the WHEP-based Subscriber.
     *
     * @returns {RTCWhepSubscriberConfigType | undefined}
     */
    getOptions(): RTCWhepSubscriberConfigType | undefined;
    /**
     * Get the peer connection for the WHEP-based Subscriber.
     *
     * @returns {RTCPeerConnection | undefined}
     */
    getPeerConnection(): RTCPeerConnection | undefined;
    /**
     * Get the data channel for the WHEP-based Subscriber.
     *
     * @returns {RTCDataChannel | undefined}
     */
    getDataChannel(): RTCDataChannel | undefined;
    /**
     * Get the media stream being played back by the subscriber.
     *
     * @returns {MediaStream | undefined}
     */
    getMediaStream(): MediaStream | undefined;
    /**
     * Get the message transport for the WHEP-based Subscriber.
     *
     * @returns {MessageTransport | undefined}
     */
    getMessageTransport(): MessageTransport | undefined;
    /**
     * Get the media element for the WHEP-based Subscriber.
     *
     * @returns {HTMLMediaElement | undefined}
     */
    getPlayer(): HTMLMediaElement | undefined;
    /**
     * Play the media being delivered to the subscriber.
     *
     * @returns {void}
     */
    play(): void;
    /**
     * Pause the media being delivered to the subscriber.
     *
     * @returns {void}
     */
    pause(): void;
    /**
     * Resume the media being delivered to the subscriber.
     *
     * @returns {void}
     */
    resume(): void;
    /**
     * Stop the media being delivered to the subscriber.
     *
     * @returns {void}
     */
    stop(): void;
    /**
     * Set the volume of the media being delivered to the subscriber.
     *
     * @param {number} value - The volume to set.
     * @returns {void}
     */
    setVolume(value: number): void;
    /**
     * Get the volume of the media being delivered to the subscriber.
     *
     * @returns {number}
     */
    getVolume(): number;
    /**
     * Mute the audio playback on the media being delivered to the subscriber.
     *
     * @returns {void}
     */
    mute(): void;
    /**
     * Unmute the audio playback on the media being delivered to the subscriber.
     *
     * @returns {void}
     */
    unmute(): void;
    /**
     * Seek to a specific time in the media being delivered to the subscriber.
     *
     * @param {number} time - The time to seek to.
     * @returns {void}
     */
    seekTo(time: number): void;
    /**
     * Toggle the full screen mode of the media being delivered to the subscriber.
     *
     * @returns {void}
     */
    toggleFullScreen(): void;
    /**
     * Monitor the statistics of the media being delivered to the subscriber over the underlying RTCPeerConnection.
     *
     * @param {StatsConfig | undefined} stats - The statistics configuration.
     * @returns {WHEPClient}
     */
    monitorStats(stats?: StatsConfig | undefined): WHEPClient;
    /**
     * Unmonitor the statistics of the media being delivered to the subscriber over the underlying RTCPeerConnection.
     *
     * @returns {WHEPClient}
     */
    unmonitorStats(): WHEPClient;
    protected _onUnpublish(): void;
    protected _onStreamUnavailable(receipt: any): void;
    protected _onDataChannelError(dataChannel: RTCDataChannel | undefined, errorMessage: string): void;
    protected _onSendReceived(methodName: string, data: any): void;
    protected _onStreamSwitchComplete(): void;
    protected _onMetaData(metadata: any): void;
    protected _onConnectionClosed(): void;
    protected _onDataChannelOpen(dataChannel: RTCDataChannel): void;
    protected _onDataChannelClose(dataChannel: RTCDataChannel): void;
    protected _onDataChannelMessage(dataChannel: RTCDataChannel | undefined, message: MessageEvent): void;
    protected _onPeerConnectionOpen(): void;
    protected _onPeerConnectionFail(): void;
    protected _onPeerConnectionClose(event: Event$1): void;
    protected _onIceCandidate(candidate: RTCIceCandidate): void;
    protected _onPeerConnectionTrackAdd(track: MediaStreamTrack): void;
    protected _onSubscriberStatus(data: any): void;
    protected _onSDPSuccess(): void;
    protected _onSDPError(errorMessage: string): void;
    protected _onStatisticsEndpointChange(statisticsEndpoint: string): void;
    protected _onStatsReport(connection: RTCPeerConnection, report: any): void;
    /**
     * Add an event listener to the WHEP-based Subscriber.
     *
     * @param {string} type - The type of event to listen for.
     * @param {Function} fn - The function to call when the event is triggered.
     */
    on(type: string, fn: (event: Event$1) => void): void;
    /**
     * Remove an event listener from the WHEP-based Subscriber.
     *
     * @param {string} type - The type of event to listen for.
     * @param {Function} fn - The function to call when the event is triggered.
     */
    off(type: string, fn: (event: Event$1) => void): void;
    /**
     * Trigger an event on the WHEP-based Subscriber.
     *
     * @param {Event} event - The event to trigger.
     */
    trigger(event: Event$1): void;
    /**
     * Get the type of the WHEP-based Subscriber (RTC).
     *
     * @returns {string}
     */
    getType(): string;
}

/**
 * HLS Subscriber. Supports playback of HLS streams using the native HLS player in browsers that support it (i.e., Mobile and Desktop Safari).
 */
declare class HLSSubscriber extends PlaybackController {
    private _options;
    private _fileURL;
    private _playbackView;
    private _sourceHandler;
    constructor();
    private _glomTrigger;
    private _playIfAutoplaySet;
    /**
     * Initialize the HLS Subscriber.
     *
     * @param {HLSSubscriberConfigType} options
     * @returns {Promise<HLSSubscriber>}
     */
    init(options: HLSSubscriberConfigType): Promise<this>;
    /**
     * Subscribe to the HLS stream.
     *
     * @returns {Promise<HLSSubscriber>}
     */
    subscribe(): Promise<this>;
    /**
     * Unsubscribe from the HLS stream.
     *
     * @returns {Promise<HLSSubscriber>}
     */
    unsubscribe(): Promise<this>;
    /**
     * Play the HLS stream.
     *
     * @returns {void}
     */
    play(): void;
    /**
     * Pause the HLS stream.
     *
     * @returns {void}
     */
    pause(): void;
    /**
     * Resume the HLS stream.
     *
     * @returns {void}
     */
    resume(): void;
    /**
     * Stop the HLS stream.
     *
     * @returns {void}
     */
    stop(): void;
    /**
     * Set the volume of the HLS stream.
     *
     * @param {number} value
     * @returns {void}
     */
    setVolume(value: number): void;
    /**
     * Get the volume of the HLS stream.
     *
     * @returns {number}
     */
    getVolume(): number;
    /**
     * Mute the HLS stream.
     *
     * @returns {void}
     */
    mute(): void;
    /**
     * Unmute the HLS stream.
     *
     * @returns {void}
     */
    unmute(): void;
    /**
     * Seek to a specific time in the HLS stream.
     *
     * @param {number} time
     * @returns {void}
     */
    seekTo(time: number): void;
    /**
     * Toggle the full screen of the HLS stream.
     *
     * @returns {void}
     */
    toggleFullScreen(): void;
    /**
     * Get the playback element of the HLS stream.
     *
     * @returns {HTMLMediaElement | undefined}
     */
    getPlayer(): HTMLMediaElement | undefined;
    /**
     * Get the options of the HLS stream.
     *
     * @returns {HLSSubscriberConfigType | undefined}
     */
    get options(): HLSSubscriberConfigType | undefined;
    /**
     * Get the options of the HLS stream.
     *
     * @returns {HLSSubscriberConfigType | undefined}
     */
    getOptions(): HLSSubscriberConfigType | undefined;
    /**
     * Get the file URL of the HLS stream.
     *
     * @returns {string | undefined}
     */
    get fileURL(): string | undefined;
    /**
     * Get the file URL of the HLS stream.
     *
     * @returns {string | undefined}
     */
    getFileURL(): string | undefined;
    /**
     * Get the type of the subscriber (HLS).
     *
     * @returns {string}
     */
    getType(): string;
}

/**
 * WHEP-based Subscriber with Live Seek support.
 */
declare class LiveSeekClient extends WHEPClient {
    /**
     * Constructor for the WHEP-based Subscriber with Live Seek support.
     *
     * @param {string | undefined} url - Optional WHEP endpoint URL for the live stream.
     * @param {HTMLMediaElement | undefined} element - Optional HTMLMediaElement to use for live stream playback.
     * @param {LiveSeekConfigType | undefined} additionalOptions - Optional LiveSeekConfigType to use for configuration.
     */
    constructor(url?: string | undefined, element?: HTMLMediaElement | undefined, additionalOptions?: LiveSeekConfigType);
    /**
     * Initialize the WHEP-based Subscriber with Live Seek support.
     *
     * @param {LiveSeekConfigType} options - LiveSeekConfigType to use for configuration.
     * @returns {Promise<LiveSeekClient>}
     */
    init(options: LiveSeekConfigType): Promise<WHEPClient>;
    protected _attachSourceHandler(view: HTMLMediaElement): void;
    private _enableLiveSeek;
    private _startSeekableIfSeekableEnabled;
    protected _onUnpublish(): void;
    protected _onStreamSwitchComplete(): void;
}

/**
 * A base implementation of the SourceHandler class.
 */
declare class SourceHandlerImpl extends SourceHandler {
    protected _name: string;
    protected _isVOD: boolean;
    protected _view: HTMLMediaElement | undefined;
    protected _playbackNotificationCenter: any | undefined;
    private onCanPlay;
    private onDurationChange;
    private onEnded;
    private onTimeUpdate;
    private onPlay;
    private onPause;
    private onVolumeChange;
    private onLoadedData;
    private onLoadedMetadata;
    private onResize;
    private onLoadStart;
    private onSuspend;
    private onStalled;
    private onWaiting;
    private onError;
    private onEncrypted;
    /**
     * Constructor for the SourceHandlerImpl class.
     *
     * @param {HTMLMediaElement} view - The HTML media element to manage.
     * @param {string} type - The type of the source handler.
     */
    constructor(view: HTMLMediaElement, type: string);
    protected _addPlaybackNotificationCenterHandlers(playbackNotificationCenter: any): void;
    protected _removePlaybackNotificationCenterHandlers(playbackNotificationCenter: any): void;
    protected _handleFullScreenChange(isFullScreen: boolean): void;
    protected _cleanup(): void;
    protected _onCanPlay(event: Event): void;
    protected _onDurationChange(event: Event): void;
    protected _onEnded(): void;
    protected _onTimeUpdate(event: Event): void;
    protected _onPlay(): void;
    protected _onPause(): void;
    protected _onVolumeChange(event: Event): void;
    protected _onLoadedData(event: Event): void;
    protected _onLoadedMetadata(event: Event): void;
    protected _onResize(event: Event): void;
    protected _onLoadStart(): void;
    protected _onSuspend(): void;
    protected _onStalled(): void;
    protected _onWaiting(): void;
    protected _onEncrypted(): void;
    protected _onError(event: ErrorEvent): void;
    attemptAutoplay(muteOnAutoplay?: boolean): Promise<void>;
    play(): Promise<boolean>;
    pause(): Promise<boolean>;
    resume(): Promise<boolean>;
    stop(): Promise<boolean>;
    mute(): void;
    unmute(): void;
    setVolume(value: number): void;
    getVolume(): number;
    seekTo(percentage: number, duration?: undefined): void;
    toggleFullScreen(element?: HTMLElement | undefined): void;
    unpublish(): Promise<void>;
    disconnect(): void;
    isVOD(): boolean;
    isMuted(): boolean;
    getControls(): PlaybackControls | undefined;
}

/**
 * Interface for the Event Emitter.
 */
interface EventEmitterInterface {
    /**
     * Assign a callback handler to an event type.
     *
     * @param {String} type
     * @param {Function} fn
     */
    on: (type: string, fn: (event: Event$1) => void) => void;
    /**
     * Remove a callback handler for an event type.
     *
     * @param {String} type
     * @param {Function} fn
     */
    off: (type: string, fn: (event: Event$1) => void) => void;
    /**
     * Dispatch an event to be handled by any assigned callbacks.
     *
     * @param {Event} event
     */
    trigger: (event: Event$1) => void;
}
/**
 * Base class for an Event Emitter.
 */
declare class EventEmitter implements EventEmitterInterface {
    private _callbacks;
    constructor();
    /**
     * Invokes event handlers.
     *
     * @param {Array} callbacks
     * @param {Event} event
     *
     * @private
     */
    private _notify;
    /**
     * Assign a callback handler to an event type.
     *
     * @param {String} type
     * @param {Function} fn
     */
    on(type: string, fn: (event: Event$1) => void): void;
    /**
     * Remove a callback handler for an event type.
     *
     * @param {String} type
     * @param {Function} fn
     */
    off(type: string, fn: (event: Event$1) => void): void;
    /**
     * Dispatch an event to be handled by any assigned callbacks.
     *
     * @param {Event} event
     */
    trigger(event: Event$1): void;
}

declare const setLogLevel: (level: string, record?: boolean) => void;
/**
 * Get the version of the SDK.
 */
declare const getVersion: () => string;

declare const _default: {
    version: string;
    LOG_LEVELS: {
        readonly TRACE: "trace";
        readonly INFO: "info";
        readonly DEBUG: "debug";
        readonly WARN: "warn";
        readonly ERROR: "error";
        readonly FATAL: "fatal";
    };
    getLogger: () => browser_bunyan_lib.Logger;
    getRecordedLogs: () => string[];
    setLogLevel: (level: string, record?: boolean) => void;
    getVersion: () => string;
    PlaybackVideoEncoder: typeof PlaybackVideoEncoder;
    PlaybackAudioEncoder: typeof PlaybackAudioEncoder;
    PlaybackState: typeof PlaybackState;
    PlaybackStateReadableMap: {
        1000: types_playback.PlaybackStateReadable;
        0: types_playback.PlaybackStateReadable;
        1: types_playback.PlaybackStateReadable;
        2: types_playback.PlaybackStateReadable;
        3: types_playback.PlaybackStateReadable;
    };
    PublishVideoEncoder: typeof PublishVideoEncoder;
    PublishAudioEncoder: typeof PublishAudioEncoder;
    SubscriberEvent: typeof SubscriberEvent;
    PublisherEvent: typeof PublisherEvent;
    MessageTransportStateEvent: typeof MessageTransportStateEvent;
    PublisherEventTypes: typeof PublisherEventTypes;
    SubscriberEventTypes: typeof SubscriberEventTypes;
    RTCPublisherEventTypes: typeof RTCPublisherEventTypes;
    RTCSubscriberEventTypes: typeof RTCSubscriberEventTypes;
    MessageTransportStateEventTypes: typeof MessageTransportStateEventTypes;
    WHIPClient: typeof WHIPClient;
    WHEPClient: typeof WHEPClient;
    HLSSubscriber: typeof HLSSubscriber;
    LiveSeekClient: typeof LiveSeekClient;
    defaultWhepSubscriberConfig: RTCWhepSubscriberConfigType;
    defaultWhipPublisherConfig: RTCWhipPublisherConfigType;
};

export { EventEmitter, HLSSubscriber, LEVELS as LOG_LEVELS, LiveSeekClient, PlaybackController, PlaybackControls, SourceHandler, SourceHandlerImpl, WHEPClient, WHIPClient, _default as default, getLogger, getRecordedLogs, getVersion, setLogLevel };
export type { EventEmitterInterface };
