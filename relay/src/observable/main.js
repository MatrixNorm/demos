// @flow

/* source -> observable -> sink */

type Observer = {|
  next?: ?(any) => void,
  error?: ?(Error) => void,
  complete?: ?() => void
|};

function source(sink) {}

function createObservable(source) {
  let _idCount = 0;
  const _observers = {};
  let _shutItDown = function() {};
  let _isVirgin = true;
  let _isClosed = false;

  const _start_source = () => {
    _shutItDown = source({
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
    _shutItDown();
    _isClosed = true;
  };

  return {
    subscribe: (observer: Observer) => {
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


function map(observable, fn)