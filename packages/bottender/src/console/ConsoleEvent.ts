import { Event } from '@bottender/core';

type Message = {
  text: string;
};

type MessageEvent = {
  message: Message;
};

type PayloadEvent = {
  payload: string;
};

export type ConsoleRawEvent = MessageEvent | PayloadEvent;

export default class ConsoleEvent implements Event<ConsoleRawEvent> {
  _rawEvent: ConsoleRawEvent;

  constructor(rawEvent: ConsoleRawEvent) {
    this._rawEvent = rawEvent;
  }

  /**
   * Underlying raw event from Console.
   *
   */
  get rawEvent(): ConsoleRawEvent {
    return this._rawEvent;
  }

  /**
   * Determine if the event is a message event.
   *
   */
  get isMessage(): boolean {
    return 'message' in this._rawEvent;
  }

  /**
   * The message object from Console raw event.
   *
   */
  get message(): Message | undefined {
    if (this.isMessage) {
      return (this._rawEvent as MessageEvent).message;
    }
  }

  /**
   * Determine if the event is a message event which includes text.
   *
   */
  get isText(): boolean {
    return this.isMessage;
  }

  /**
   * The text string from Console raw event.
   *
   */
  get text(): string | undefined {
    if (this.message) {
      return this.message.text;
    }
  }

  /**
   * Determine if the event is a payload event.
   *
   */
  get isPayload(): boolean {
    return !!(this._rawEvent as any).payload;
  }

  /**
   * The payload string from Console raw event.
   *
   */
  get payload(): string | undefined {
    if (this.isPayload) {
      return (this._rawEvent as PayloadEvent).payload;
    }
  }
}
