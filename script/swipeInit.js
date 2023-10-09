var swiper = new Swiper('.swiper-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: false,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  mousewheel: true,
  keyboard: true
});


/* === FUNZIONA, MA DEVO STUDIARE MEGLIO I MUTATION OBSERVER === */
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutationRecord) {
      //console.log('style changed!');
      swiper.update();
   });
 });

 var target = document.getElementById('myWorkExperince');
 observer.observe(target, { attributes : true, attributeFilter : ['style'] });


/* IDEA INIZIALE MA CHANGE NON FUNZIONA SUGLI ATTRIBUTI CSS, CREDO*/
/*
document.getElementById("myWorkExperince").addEventListener("change", function(event){
  if (event.target.style.display == "block")
    swiper.update();
});*/
