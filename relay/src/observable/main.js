function createObservable(howToSubscribeToSomeProducer) {
  return {
    subscribe: subber => {
      howToSubscribeToSomeProducer(subber);
    }
  };
}

function map(observable, fn) {
  createObservable(subber => {
    observable.subscribe({
      next: value => {
        subber.next(fn(value));
      }
    });
  });
}

function filter(observable, pred) {
  createObservable(subber => {
    observable.subscribe({
      next: value => {
        if (pred(value)) {
          subber.next(value);
        }
      }
    });
  });
}

function fromDomEvent(domEl, eventName) {
  let _subbers = {};
  let _id = 0;

  const onEvent = event => {
    Object.values(_subbers).every(subber => subber.next(event));
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
