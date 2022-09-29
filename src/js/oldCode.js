const tabs = document.querySelector(".tabs");
const display = document.querySelector(".card__content");

displayContent();

tabs.addEventListener("click", function (event) {
  if (event.target.closest(".tabs__unit").classList.contains("-plug")) return;

  tabs.querySelector(".-active").classList.remove("-active");
  event.target.closest(".tabs__unit").classList.add("-active");

  displayContent();
});

function displayContent() {
  const tabName = tabs.querySelector(".-active").textContent.toLowerCase();

  if (display.querySelector(".-toggled") !== null)
    display.querySelector(".-toggled").classList.remove("-toggled");
  display.querySelector(".-" + tabName).classList.add("-toggled");
}
