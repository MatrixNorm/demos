function createObservable(connectToProducer) {
  return {
    subscribe: subber => {
      return connectToProducer(subber);
    }
  };
}

export function map(observable, fn) {
  return createObservable(subber => {
    observable.subscribe({
      next: value => {
        subber.next(fn(value));
      }
    });
  });
}

export function filter(observable, pred) {
  return createObservable(subber => {
    observable.subscribe({
      next: value => {
        if (pred(value)) {
          subber.next(value);
        }
      }
    });
  });
}

export function fromDomEvent(domEl, eventName) {
  let _subbers = {};
  let _id = 0;

  const onEvent = event => {
    Object.values(_subbers).forEach(subber => subber.next(event));
  };

  const start = () => {
    domEl.addEventListener(eventName, onEvent);
  };

  const cleanUp = () => {
    domEl.removeEventListener(eventName, onEvent);
  };

  const checkForCleanUp = () => {
    if (Object.keys(_subbers).length === 0) {
      cleanUp();
    }
  };

  return createObservable(subber => {
    if (Object.keys(_subbers).length === 0) {
      start();
    }
    let id = _id++;
    _subbers[id] = subber;
    return () => {
      delete _subbers[id];
      checkForCleanUp();
    };
  });
}
