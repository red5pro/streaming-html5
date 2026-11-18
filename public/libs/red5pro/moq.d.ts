import * as browser_bunyan_lib from 'browser-bunyan/lib';
import { PublishVideoEncoder, PublishAudioEncoder } from 'types/publisher';
export { PublishAudioEncoder, PublishVideoEncoder } from 'types/publisher';
import { PublisherEventTypes, SubscriberEventTypes, MessageChannelEventTypes } from 'event/event-types';
export { MessageChannelEventTypes, PublisherEventTypes, SubscriberEventTypes } from 'event/event-types';
import { Event, SubscriberEvent, PublisherEvent, MessageChannelEvent } from 'event';
export { Event, MessageChannelEvent, PublisherEvent, SubscriberEvent } from 'event';
import StatsConfig, { EndpointType } from 'configuration/stats';
export { default as StatsConfig, EndpointType as StatsEndpointType, defaultStatsConfig } from 'configuration/stats';
import { MOQDataChannelConfiguration, MOQMessageChannelConfigType, MOQSubscriberConfigType, MOQPublisherConfigType, MOQCatalogConfigType, MOQSubscriber, MOQPublisher, MOQMessageChannel, MOQCatalog } from 'moq';
export { MOQCatalog, MOQCatalogConfigType, MOQDataChannelConfiguration, MOQMessageChannel, MOQMessageChannelConfigType, MOQPublisher, MOQPublisherConfigType, MOQSubscriber, MOQSubscriberConfigType, defaultMOQCatalogConfig, defaultMOQDataChannelConfiguration, defaultMOQMessageChannelConfig, defaultMOQPublisherConfig, defaultMOQSubscriberConfig } from 'moq';
import { MOQSubscriberEventTypes, MOQPublisherEventTypes, MOQCatalogEventTypes } from 'moq/event/event-types';
export { MOQCatalogEventTypes, MOQPublisherEventTypes, MOQSubscriberEventTypes } from 'moq/event/event-types';
import { MOQSubscriberEvent, MOQPublisherEvent, MOQCatalogEvent } from 'moq/event';
export { MOQCatalogEvent, MOQPublisherEvent, MOQSubscriberEvent } from 'moq/event';
import { Logger } from 'browser-bunyan';

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
 * Shared SDK runtime: version, logger init, and log-level API.
 * Used by the monolith, webrtc, and moq entries so each bundle initializes once.
 */

declare const setLogLevel: (level: string, record?: boolean) => void;
/**
 * Get the version of the SDK.
 */
declare const getVersion: () => string;

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
    on: (type: string, fn: (event: Event) => void) => void;
    /**
     * Remove a callback handler for an event type.
     *
     * @param {String} type
     * @param {Function} fn
     */
    off: (type: string, fn: (event: Event) => void) => void;
    /**
     * Dispatch an event to be handled by any assigned callbacks.
     *
     * @param {Event} event
     */
    trigger: (event: Event) => void;
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
    on(type: string, fn: (event: Event) => void): void;
    /**
     * Remove a callback handler for an event type.
     *
     * @param {String} type
     * @param {Function} fn
     */
    off(type: string, fn: (event: Event) => void): void;
    /**
     * Dispatch an event to be handled by any assigned callbacks.
     *
     * @param {Event} event
     */
    trigger(event: Event): void;
}

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
    PublishVideoEncoder: typeof PublishVideoEncoder;
    PublishAudioEncoder: typeof PublishAudioEncoder;
    SubscriberEvent: typeof SubscriberEvent;
    PublisherEvent: typeof PublisherEvent;
    MessageChannelEvent: typeof MessageChannelEvent;
    PublisherEventTypes: typeof PublisherEventTypes;
    SubscriberEventTypes: typeof SubscriberEventTypes;
    MessageChannelEventTypes: typeof MessageChannelEventTypes;
    defaultMOQDataChannelConfiguration: Required<Pick<MOQDataChannelConfiguration, "name" | "keepEcho" | "unreliable">>;
    defaultMOQMessageChannelConfig: MOQMessageChannelConfigType;
    defaultMOQSubscriberConfig: MOQSubscriberConfigType;
    defaultMOQPublisherConfig: MOQPublisherConfigType;
    defaultMOQCatalogConfig: MOQCatalogConfigType;
    defaultStatsConfig: StatsConfig;
    StatsEndpointType: typeof EndpointType;
    MOQSubscriber: typeof MOQSubscriber;
    MOQPublisher: typeof MOQPublisher;
    MOQMessageChannel: typeof MOQMessageChannel;
    MOQCatalog: typeof MOQCatalog;
    MOQSubscriberEventTypes: typeof MOQSubscriberEventTypes;
    MOQPublisherEventTypes: typeof MOQPublisherEventTypes;
    MOQCatalogEventTypes: typeof MOQCatalogEventTypes;
    MOQSubscriberEvent: typeof MOQSubscriberEvent;
    MOQPublisherEvent: typeof MOQPublisherEvent;
    MOQCatalogEvent: typeof MOQCatalogEvent;
};

export { EventEmitter, LEVELS as LOG_LEVELS, _default as default, getLogger, getRecordedLogs, getVersion, setLogLevel };
export type { EventEmitterInterface };
