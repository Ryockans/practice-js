const sidebar = document.querySelector('.sidebar');
const stickyCoordinate = sidebar.getBoundingClientRect().height - document.documentElement.clientHeight;


window.addEventListener('scroll', function () {
  const bottomBorder = Math.round(document.documentElement.clientHeight - sidebar.getBoundingClientRect().bottom)
  const offset = sidebar.getBoundingClientRect().top + window.pageYOffset ;
  const sidebarScroll = Math.round(document.documentElement.clientHeight - sidebar.getBoundingClientRect().height);

  if (bottomBorder >= 0 ) {
    if (this.oldScroll <= this.scrollY) {


      console.dir(this);
      this.oldScroll = this.scrollY;
      sidebar.style.position = 'fixed';
      sidebar.style.top = '-' + stickyCoordinate + 'px';

    } else {
      this.oldScroll = this.scrollY;
      sidebar.style.position = 'absolute'
      sidebar.style.top = offset  + 'px';

    }
  } else if (bottomBorder <= sidebarScroll) {

    if (this.oldScroll <= this.scrollY) {

      this.oldScroll = this.scrollY;
      sidebar.style.position = 'absolute'
      sidebar.style.top = offset  + 'px';

    } else {

      this.oldScroll = this.scrollY;
      sidebar.style.position = 'fixed';
      sidebar.style.top = 0 + 'px'

    }
  }
});
