const basic = document.querySelector(".collapse.-basic");
const accordion = document.querySelector(".collapse.-accordion");

basic.addEventListener("click", toggleTab);
accordion.addEventListener("click", function (event) {
  if (this.querySelector(".-show") !== null) {
    for (let item of this.querySelectorAll(".-show")) {
      if (
        item.closest(".collapse__item") !==
        event.target.closest(".collapse__item")
      ) {
        item.classList.remove("-show");
      }
    }
  }
  toggleTab(event);
});

function toggleTab(event) {
  console.dir(event.target);
  if (event.target.classList.contains('collapse__text')) return;
  const element = event.target.closest(".collapse__item");

  element.querySelector(".collapse__toggle").classList.toggle("-show");
  element.querySelector(".collapse__text").classList.toggle("-show");
}
