function sleep(miliseconds) {
  let currentTime = new Date().getTime();
  while (currentTime + miliseconds >= new Date().getTime()) {}
}

document.body.addEventListener("mousemove", e => {
  console.log(e);
  sleep(1000);
});
