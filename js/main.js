let elCatalog = document.querySelector(".item__catalog"),
  elLines = document.querySelectorAll(".lines");

elCatalog.addEventListener("click", (evt) => {
  elLines[0].classList.toggle('catalog__line1')
  elLines[0].style.transition = 'all .4s ease'
  elLines[1].classList.toggle('left__line2')
  elLines[1].style.transition = 'all .2s ease'
  elLines[2].classList.toggle('catalog__line3')
  elLines[2].style.transition = 'all .4s ease'

});
