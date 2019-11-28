function createObservable(connectToProducer) {
  return {
    subscribe: subber => {
      return connectToProducer(subber);
    }
  };
}

export function map(observable, fn) {
  return createObservable(subber => {
    return observable.subscribe({
      next: value => {
        console.log("map: ", value);
        subber.next(fn(value));
      }
    });
  });
}

export function filter(observable, pred) {
  return createObservable(subber => {
    return observable.subscribe({
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
    // call subbers with the same order as subscriptions were done
    console.log("fromClick", event);
    const keys = Object.keys(_subbers).map(Number);
    keys.sort((x, y) => (x < y ? -1 : 1));
    for (let k of keys) {
      let subber = _subbers[k];
      console.log("fromClick: subber.next", subber.next);
      subber.next(event);
    }
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
