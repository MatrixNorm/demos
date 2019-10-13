function createObservable(producer) {
  const _subbers = {};
  let _idCount = 0;
  let _unsubFromProducer = function() {};

  const next = value => {
    Object.values(_subbers).every(subber => subber.next(value));
  };

  const error = err => {
    Object.values(_subbers).every(subber => subber.error(err));
  };

  const complete = () => {
    Object.values(_subbers).every(subber => subber.complete());
  };

  const _checkIfNoSubbersLeft = () => {
    if (Object.keys(_subbers).length === 0) {
      _unsubFromProducer();
    }
  };

  return {
    subscribe: subber => {
      if (Object.keys(_subbers).length === 0) {
        _unsubFromProducer = producer.subscribe({ next, error, complete });
      }
      _subbers[_idCount] = subber;
      _idCount++;
      return () => {
        delete _subbers[_idCount];
        _checkIfNoSubbersLeft();
      };
    }
  };
}

function map(observable, fn) {
  createObservable();
}

function create(source) {
  let _idCount = 0;
  const _observers = {};
  let _shutSourceDown = function() {};
  let _isVirgin = true;
  let _isClosed = false;

  const _start_source = () => {
    _shutSourceDown = source.subscribe({
      next: value => {
        Object.values(_observers).every(ob => ob.next(value));
      },
      error: err => {
        Object.values(_observers).every(ob => ob.error(err));
      },
      complete: () => {
        Object.values(_observers).every(ob => ob.complete());
      }
    });
    _isVirgin = false;
  };

  const _stop_source = () => {
    _shutSourceDown();
    _isClosed = true;
  };

  return {
    subscribe: (observer: Observer) => {
      if (_isClosed) {
        return;
      }
      _observers[_idCount] = observer;
      _idCount++;
      if (_isVirgin) {
        _start_source();
      }
      return () => {
        delete _observers[_idCount];
        if (Object.keys(_observers).length === 0) {
          _stop_source();
        }
      };
    },
    isClosed: () => {
      return _isClosed;
    }
  };
}
