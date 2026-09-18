/**
 * Reactive state store decoupled from any rendering framework
 */
export type StateListener<T = unknown> = (value: T, prev: T | undefined) => void;
export type GlobalStateListener = (key: string, value: unknown, prev: unknown) => void;

export class ReactiveState {
  private data = new Map<string, unknown>();
  private keyListeners = new Map<string, Set<StateListener<any>>>();
  private globalListeners = new Set<GlobalStateListener>();
  private isBatching = false;
  private pendingChanges = new Map<string, { value: unknown; prev: unknown }>();

  constructor(initialData?: Record<string, unknown>) {
    if (initialData) {
      for (const [k, v] of Object.entries(initialData)) {
        this.data.set(k, v);
      }
    }
  }

  public get<T = unknown>(key: string): T | undefined {
    return this.data.get(key) as T | undefined;
  }

  public set<T = unknown>(key: string, value: T): void {
    const prev = this.data.get(key);
    if (Object.is(prev, value)) {
      return;
    }

    this.data.set(key, value);

    if (this.isBatching) {
      const existing = this.pendingChanges.get(key);
      this.pendingChanges.set(key, {
        value,
        prev: existing ? existing.prev : prev
      });
    } else {
      this.notify(key, value, prev);
    }
  }

  public has(key: string): boolean {
    return this.data.has(key);
  }

  public delete(key: string): boolean {
    if (!this.data.has(key)) return false;
    const prev = this.data.get(key);
    this.data.delete(key);

    if (this.isBatching) {
      this.pendingChanges.set(key, { value: undefined, prev });
    } else {
      this.notify(key, undefined, prev);
    }
    return true;
  }

  public subscribe<T = unknown>(key: string, listener: StateListener<T>): () => void {
    let set = this.keyListeners.get(key);
    if (!set) {
      set = new Set();
      this.keyListeners.set(key, set);
    }
    set.add(listener);

    return () => {
      set?.delete(listener);
      if (set?.size === 0) {
        this.keyListeners.delete(key);
      }
    };
  }

  public subscribeAll(listener: GlobalStateListener): () => void {
    this.globalListeners.add(listener);
    return () => {
      this.globalListeners.delete(listener);
    };
  }

  public batch(fn: () => void): void {
    if (this.isBatching) {
      fn();
      return;
    }

    this.isBatching = true;
    try {
      fn();
    } finally {
      this.isBatching = false;
      const changes = Array.from(this.pendingChanges.entries());
      this.pendingChanges.clear();

      for (const [key, { value, prev }] of changes) {
        this.notify(key, value, prev);
      }
    }
  }

  public snapshot(): Record<string, unknown> {
    const res: Record<string, unknown> = {};
    for (const [k, v] of this.data.entries()) {
      res[k] = v;
    }
    return res;
  }

  public clear(): void {
    const prevSnapshot = this.snapshot();
    this.data.clear();
    for (const [k, prev] of Object.entries(prevSnapshot)) {
      this.notify(k, undefined, prev);
    }
  }

  private notify(key: string, value: unknown, prev: unknown): void {
    const listeners = this.keyListeners.get(key);
    if (listeners) {
      for (const listener of Array.from(listeners)) {
        try {
          listener(value, prev);
        } catch (err) {
          console.error(`Error in state listener for key "${key}":`, err);
        }
      }
    }

    for (const globalListener of Array.from(this.globalListeners)) {
      try {
        globalListener(key, value, prev);
      } catch (err) {
        console.error("Error in global state listener:", err);
      }
    }
  }
}
