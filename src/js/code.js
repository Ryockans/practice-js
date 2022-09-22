const sidebar = document.querySelector('.sidebar');
const stickyCoordinate = sidebar.getBoundingClientRect().height + window.pageYOffset - document.documentElement.clientHeight;
const scroll = document.querySelector('.scroll');
console.dir(stickyCoordinate + ' | ' + document.documentElement.clientHeight);


window.addEventListener('scroll', function scrollDown(event) {

})

/*
window.addEventListener('scroll', function getSticky() {
  scroll.innerHTML = Math.round(document.documentElement.clientHeight - sidebar.getBoundingClientRect().bottom) + ' | ' + Math.round(window.pageYOffset + document.documentElement.clientHeight - sidebar.getBoundingClientRect().height);
  // scroll.innerHTML = Math.round(sidebar.getBoundingClientRect().bottom)  + ' | ' + Math.round(window.pageYOffset);
  if (sidebar.getBoundingClientRect().bottom <= document.documentElement.clientHeight) {
    sidebar.style.top = '-' + stickyCoordinate + 'px';
    scrollDetect();
  }
  if (sidebar.getBoundingClientRect().top >= 0) {
    sidebar.style.top = getComputedStyle(sidebar).marginTop + 'px';
    // sidebar.style.marginTop = ;
    scrollRepair();
  }
});

function scrollDetect() {
  let lastScroll = 0;

  window.addEventListener('scroll', function improveSticky() {
    let currentScroll = document.documentElement.scrollTop || document.body.scrollTop; // Get Current Scroll Value
    let stickyOffset = window.pageYOffset + document.documentElement.clientHeight - sidebar.getBoundingClientRect().height;

    if (currentScroll > 0 && lastScroll <= currentScroll) { // scrolling down
      lastScroll = currentScroll;
      sidebar.style.marginTop = stickyOffset  + 'px'
    } else { //scrolling up
      lastScroll = currentScroll;
      window.removeEventListener('scroll',improveSticky )
    }
  });
}
function scrollRepair() {
  let lastScroll = 0;

  window.addEventListener('scroll', function improveSticky() {
    let currentScroll = document.documentElement.scrollTop || document.body.scrollTop; // Get Current Scroll Value
    let stickyOffset = window.pageYOffset + document.documentElement.clientHeight - sidebar.getBoundingClientRect().height;

    if (currentScroll > 0 && lastScroll <= currentScroll) { // scrolling down
      sidebar.style.top = '-' + stickyCoordinate + 'px';
      window.removeEventListener('scroll',improveSticky );
    }
  });
}
*/

