"use strict";

/**
 * A Subscription object is returned from .subscribe(), which can be
 * unsubscribed or checked to see if the resulting subscription has closed.
 */
export type Subscription = {|
  +unsubscribe: () => void,
  +closed: boolean
|};

type SubscriptionFn = {
  (): mixed,
  +unsubscribe?: void,
  +closed?: void
};

/**
 * An Observer is an object of optional callback functions provided to
 * .subscribe(). Each callback function is invoked when that event occurs.
 */
export type Observer<-T> = {|
  +start?: ?(Subscription) => mixed,
  +next?: ?(T) => mixed,
  +error?: ?(Error) => mixed,
  +complete?: ?() => mixed,
  +unsubscribe?: ?(Subscription) => mixed
|};

/**
 * A Sink is an object of methods provided by Observable during construction.
 * The methods are to be called to trigger each event. It also contains a closed
 * field to see if the resulting subscription has closed.
 */
export type Sink<-T> = {|
  +next: T => void,
  +error: (Error, isUncaughtThrownError?: boolean) => void,
  +complete: () => void,
  +closed: boolean
|};

/**
 * A Source is the required argument when constructing a new Observable. Similar
 * to a Promise constructor, this is a function which is invoked with a Sink,
 * and may return either a cleanup function or a Subscription instance (for use
 * when composing Observables).
 */
export type Source<+T> = (Sink<T>) => void | Subscription | SubscriptionFn;

/**
 * A Subscribable is an interface describing any object which can be subscribed.
 *
 * Note: A sink may be passed directly to .subscribe() as its observer,
 * allowing for easily composing Subscribables.
 */
export interface Subscribable<+T> {
  subscribe(observer: Observer<T> | Sink<T>): Subscription;
}

// Note: This should accept Subscribable<T> instead of RelayObservable<T>,
// however Flow cannot yet distinguish it from T.
export type ObservableFromValue<+T> = RelayObservable<T> | Promise<T> | T;

let hostReportError = swallowError;

/**
 * Limited implementation of ESObservable, providing the limited set of behavior
 * Relay networking requires.
 *
 * Observables retain the benefit of callbacks which can be called
 * synchronously, avoiding any UI jitter, while providing a compositional API,
 * which simplifies logic and prevents mishandling of errors compared to
 * the direct use of callback functions.
 *
 * ESObservable: https://github.com/tc39/proposal-observable
 */
class RelayObservable<+T> implements Subscribable<T> {
  +_source: Source<T>;

  static create<V>(source: Source<V>): RelayObservable<V> {
    return new RelayObservable((source: any));
  }

  // Use RelayObservable.create()
  constructor(source: empty): void {
    (this: any)._source = source;
  }

  /**
   * Observable's primary API: returns an unsubscribable Subscription to the
   * source of this Observable.
   *
   * Note: A sink may be passed directly to .subscribe() as its observer,
   * allowing for easily composing Observables.
   */
  subscribe(observer: Observer<T> | Sink<T>): Subscription {
    return subscribe(this._source, observer);
  }

  /**
   * Returns a new Observerable where each value has been transformed by
   * the mapping function.
   */
  map<U>(fn: T => U): RelayObservable<U> {
    return RelayObservable.create(sink => {
      const subscription = this.subscribe({
        complete: sink.complete,
        error: sink.error,
        next: value => {
          try {
            const mapValue = fn(value);
            sink.next(mapValue);
          } catch (error) {
            sink.error(error, true /* isUncaughtThrownError */);
          }
        }
      });
      return () => {
        subscription.unsubscribe();
      };
    });
  }
}

function fromPromise<T>(promise: Promise<T>): RelayObservable<T> {
  return RelayObservable.create(sink => {
    // Since sink methods do not throw, the resulting Promise can be ignored.
    promise.then(value => {
      sink.next(value);
      sink.complete();
    }, sink.error);
  });
}

function fromValue<T>(value: T): RelayObservable<T> {
  return RelayObservable.create(sink => {
    sink.next(value);
    sink.complete();
  });
}

function subscribe<T>(
  source: Source<T>,
  observer: Observer<T> | Sink<T>
): Subscription {
  let closed = false;
  let cleanup;

  // Ideally we would simply describe a `get closed()` method on the Sink and
  // Subscription objects below, however not all flow environments we expect
  // Relay to be used within will support property getters, and many minifier
  // tools still do not support ES5 syntax. Instead, we can use defineProperty.
  const withClosed: <O>(obj: O) => {| ...O, +closed: boolean |} = (obj =>
    Object.defineProperty(obj, "closed", ({ get: () => closed }: any)): any);

  function doCleanup() {
    if (cleanup) {
      if (cleanup.unsubscribe) {
        cleanup.unsubscribe();
      } else {
        try {
          cleanup();
        } catch (error) {
          hostReportError(error, true /* isUncaughtThrownError */);
        }
      }
      cleanup = undefined;
    }
  }

  // Create a Subscription.
  const subscription: Subscription = withClosed({
    unsubscribe() {
      if (!closed) {
        closed = true;

        // Tell Observer that unsubscribe was called.
        try {
          observer.unsubscribe && observer.unsubscribe(subscription);
        } catch (error) {
          hostReportError(error, true /* isUncaughtThrownError */);
        } finally {
          doCleanup();
        }
      }
    }
  });

  // Tell Observer that observation is about to begin.
  try {
    observer.start && observer.start(subscription);
  } catch (error) {
    hostReportError(error, true /* isUncaughtThrownError */);
  }

  // If closed already, don't bother creating a Sink.
  if (closed) {
    return subscription;
  }

  // Create a Sink respecting subscription state and cleanup.
  const sink: Sink<T> = withClosed({
    next(value) {
      if (!closed && observer.next) {
        try {
          observer.next(value);
        } catch (error) {
          hostReportError(error, true /* isUncaughtThrownError */);
        }
      }
    },
    error(error, isUncaughtThrownError) {
      if (closed || !observer.error) {
        closed = true;
        hostReportError(error, isUncaughtThrownError || false);
        doCleanup();
      } else {
        closed = true;
        try {
          observer.error(error);
        } catch (error2) {
          hostReportError(error2, true /* isUncaughtThrownError */);
        } finally {
          doCleanup();
        }
      }
    },
    complete() {
      if (!closed) {
        closed = true;
        try {
          observer.complete && observer.complete();
        } catch (error) {
          hostReportError(error, true /* isUncaughtThrownError */);
        } finally {
          doCleanup();
        }
      }
    }
  });

  // If anything goes wrong during observing the source, handle the error.
  try {
    cleanup = source(sink);
  } catch (error) {
    sink.error(error, true /* isUncaughtThrownError */);
  }

  // If closed before the source function existed, cleanup now.
  if (closed) {
    doCleanup();
  }

  return subscription;
}

function swallowError(_error: Error, _isUncaughtThrownError: boolean): void {
  // do nothing.
}

export default RelayObservable;
