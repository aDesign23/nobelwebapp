function startLoader() {
  let counterElement = document.querySelector(".counter");
  let currentValue = 0;

  function updateCounter() {
    if (currentValue === 100) {
      return;
    }

    currentValue += Math.floor(Math.random() * 10) + 1;

    if (currentValue > 100) {
      currentValue = 100;
    }

    counterElement.textContent = currentValue;

    let delay = 20;
    setTimeout(updateCounter, delay);
  }
  updateCounter();
}

startLoader();

window.addEventListener("load", function () {
  document.querySelector(".preloader").classList.add("fadehide");
});
