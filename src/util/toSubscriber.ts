import { Subscriber } from '../internal/Subscriber';
import { rxSubscriber as rxSubscriberSymbol } from '../internal/symbol/rxSubscriber';
import { PartialObserver, empty as emptyObserver } from '../internal/Observer';

export function toSubscriber<T>(
  nextOrObserver?: PartialObserver<T> | ((value: T) => void),
  error?: (error: any) => void,
  complete?: () => void): Subscriber<T> {

  if (nextOrObserver) {
    if (nextOrObserver instanceof Subscriber) {
      return (<Subscriber<T>> nextOrObserver);
    }

    if (nextOrObserver[rxSubscriberSymbol]) {
      return nextOrObserver[rxSubscriberSymbol]();
    }
  }

  if (!nextOrObserver && !error && !complete) {
    return new Subscriber(emptyObserver);
  }

  return new Subscriber(nextOrObserver, error, complete);
}
