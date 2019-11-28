import { fromDomEvent, map } from "./myobservable";

const clicks = fromDomEvent(document.getElementById("btn"), "click");
const timestamps = map(clicks, evt => evt.timeStamp);
const xStream = map(timestamps, val => Math.floor(val));
const yStream = map(xStream, val => [val, val % 7]);
const zStream = map(timestamps, val => [val, Math.random()]);

const cleanUp = {};

// cleanUp["z"] = zStream.subscribe({
//   next: val => console.log("zStream: ", val)
// });

// cleanUp["timestamps"] = timestamps.subscribe({
//   next: val => console.log("clickTimestamps: ", val)
// });

cleanUp["y"] = yStream.subscribe({
  next: val => console.log("yStream: ", val)
});

// cleanUp["x"] = xStream.subscribe({
//   next: val => console.log("xStream: ", val)
// });

// cleanUp["clicks"] = clicks.subscribe({
//   next: evt => console.log("clicks: ", evt)
// });

window.cleanUp = cleanUp;

/*

// yStream = map(xStream, val => [val, val % 7]);

yStreamNext = val => console.log("yStream: ", val)

yStream.subscribe({
  next: yStreamNext
});

xStream.subscribe({
  next: value => {
    yStreamNext(fn(value));
  }
})

xStreamNext = value => {
  yStreamNext(fn(value));
}

// const xStream = map(timestamps, val => Math.floor(val));

timestamps.subscribe({
  next: value => {
    xStreamNext(fn(value));
  }
})

timestampsNext = value => {
  xStreamNext(fn(value));
}

// const timestamps = map(clicks, evt => evt.timeStamp);

clicks.subscribe({
  next: value => {
    timestampsNext(fn(value));
  }
})

// clicks = fromDomEvent(document.getElementById("btn"), "click");

!!! click

*/