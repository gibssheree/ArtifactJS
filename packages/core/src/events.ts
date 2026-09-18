import type { ArtifactEvent, ArtifactEventType } from "@interactive-artifact/protocol";

export type EventHandler<T extends ArtifactEvent = ArtifactEvent> = (event: T) => void;

/**
 * Event bus for artifact lifecycle and user interaction events
 */
export class EventBus {
  private handlers = new Map<string, Set<EventHandler<any>>>();
  private globalHandlers = new Set<EventHandler<any>>();
  private eventLog: ArtifactEvent[] = [];
  private maxHistory: number;

  constructor(options?: { maxHistory?: number }) {
    this.maxHistory = options?.maxHistory ?? 100;
  }

  public on<T extends ArtifactEventType>(
    type: T,
    handler: EventHandler<Extract<ArtifactEvent, { type: T }>>
  ): () => void {
    let set = this.handlers.get(type);
    if (!set) {
      set = new Set();
      this.handlers.set(type, set);
    }
    set.add(handler);

    return () => {
      set?.delete(handler);
      if (set?.size === 0) {
        this.handlers.delete(type);
      }
    };
  }

  public onAny(handler: EventHandler<ArtifactEvent>): () => void {
    this.globalHandlers.add(handler);
    return () => {
      this.globalHandlers.delete(handler);
    };
  }

  public once<T extends ArtifactEventType>(
    type: T,
    handler: EventHandler<Extract<ArtifactEvent, { type: T }>>
  ): () => void {
    const unsub = this.on(type, (event) => {
      unsub();
      handler(event);
    });
    return unsub;
  }

  public off<T extends ArtifactEventType>(
    type: T,
    handler: EventHandler<Extract<ArtifactEvent, { type: T }>>
  ): void {
    this.handlers.get(type)?.delete(handler);
  }

  public emit(event: ArtifactEvent): void {
    // Record history
    this.eventLog.push(event);
    if (this.eventLog.length > this.maxHistory) {
      this.eventLog.shift();
    }

    // Specific handlers
    const specific = this.handlers.get(event.type);
    if (specific) {
      for (const h of Array.from(specific)) {
        try {
          h(event);
        } catch (err) {
          console.error(`Error in event handler for "${event.type}":`, err);
        }
      }
    }

    // Global handlers
    for (const h of Array.from(this.globalHandlers)) {
      try {
        h(event);
      } catch (err) {
        console.error("Error in global event handler:", err);
      }
    }
  }

  public history(limit?: number): ArtifactEvent[] {
    if (limit === undefined) return [...this.eventLog];
    return this.eventLog.slice(-limit);
  }

  public clearHistory(): void {
    this.eventLog = [];
  }
}
