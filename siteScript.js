//Inizializando la visibilità di ogni sezione a none, eccetto per presentation
document.getElementById("menu-visibility").style.display = "none";
document.getElementById("projectList").style.display = "none";
document.getElementById("myContact").style.display = "none";
document.getElementById("main").style.display = "none";
document.getElementById("myDiary").style.display = "none";
document.getElementById("presentation").style.opacity = "0";
document.getElementById("presentation").style.display = "block";
document.getElementsByClassName("icon")[0].style.opacity = "0";
document.getElementsByClassName("icon")[0].style.display = "block";

//Animazione di presentation in Animejs
anime.timeline().add({
    targets: "#presentation",
    duration: 1500,
    opacity: [0,1],
    easing: "linear"
}).add({
    targets: "#presentation",
    duration: 1500,
    opacity: [1,0],
    easing: "linear"
})

//Ritardando l'animazione della sezione main, per evitare che si accavallino
setTimeout(function(){
    document.getElementById("main").style.opacity = "0";
    document.getElementById("presentation").style.display = "none";
    document.getElementById("main").style.display = "block";
    anime.timeline().add({
        targets: "#main",
        duration: 1500,
        opacity: [0,1],
        easing: "linear"
     }).add({
        targets: ".icon",
        duration: 100,
        opacity: [0,1],
        easing: "linear"

    });
}, 3000);

//memorizzando in variabili il percorso delle icone che utilizzo
var hamburgerLocation = "Img/Icons/hamburger.png";
var crossSignLocation = "Img/Icons/cross-sign.png";

//memorizzando la visibilità di tutte le sezioni in un array che verrà utilizzato per i controlli
var sectionVisibility = [
  document.getElementById("main"),
  document.getElementById("projectList"),
  document.getElementById("myContact"),
  document.getElementById("myDiary")
];



//variabile in cui metterò l'indice della pagina precedente
var checker = 0;

//listener sull hamburger, fa le transizioni tra la pagina corrente e il menù
document.getElementById("hamburger-icon").getElementsByClassName("icon")[0].addEventListener("click", function(event){
    if (document.getElementById("menu-visibility").style.display == "none"){
        for (checker = 0; checker < sectionVisibility.length; checker++)
            if (sectionVisibility[checker].style.display == "block")
                break;
        anime({
            targets: "#" + sectionVisibility[checker].getAttribute("id"),
            duration: 500,
            opacity: [1,0],
            easing: "linear"
        });
        setTimeout( function(){
            document.getElementById("menu-visibility").style.opacity = "0";
            document.getElementById("menu-visibility").style.display = "block";
            anime({
                targets: "#menu-visibility",
                duration: 500,
                opacity: [0,1],
                easing: "linear"
            });
            sectionVisibility[checker].style.display = "none";
        }, 500);
        event.target.src = crossSignLocation;
    } else {
        anime({
            targets: "#menu-visibility",
            duration: 500,
            opacity: [1,0],
            easing: "linear"
        });
        setTimeout(function(){
            sectionVisibility[checker].style.opacity = "0";
            sectionVisibility[checker].style.display = "block";
            anime({
                targets: "#" + sectionVisibility[checker].getAttribute("id"),
                duration: 500,
                opacity: [0,1],
                easing: "linear"
            });
            setTimeout(function(){
                document.getElementById("menu-visibility").style.display = "none";
                sectionVisibility[checker].style.opacity = "100%";
            }, 500);
        }, 500);
        event.target.src = hamburgerLocation;
    }
});

//array che contiene tutti gli elementi marcati come classe option
var menuVoices = document.getElementsByClassName("option");
var voice = 0;

for ( voice = 0; voice < menuVoices.length; voice++){
    menuVoices[voice].addEventListener("click", function(event){
        var idToAnimate = event.target.innerHTML == "Home" ? "main" : (event.target.innerHTML == "Progetti"? "projectList" : (event.target.innerHTML == "I miei contatti"? "myContact" : "myDiary"));

        anime({
            targets: "#menu-visibility",
            duration: 500,
            opacity: [1,0],
            easing: "linear"
        });
        setTimeout(function(){
            document.getElementById(idToAnimate).style.opacity = "0";
            document.getElementById(idToAnimate).style.display = "block";

            anime({
                targets: "#" + idToAnimate,
                duration: 500,
                opacity: [0,1],
                easing: "linear"
            });
            setTimeout(function(){
                document.getElementById("menu-visibility").style.display = "none";
                document.getElementById(idToAnimate).style.opacity = "100%";
            }, 500);
        }, 500);

       document.getElementById("hamburger-icon").getElementsByClassName("icon")[0].src = hamburgerLocation;
    });
}


var swiper_content = document.getElementById("swiper_container");
for (var newContent of data){
  swiper_content.innerHTML += '<div class="swiper-slide slide-spacing"><fieldset><legend>' + newContent.data  + '</legend> <h1> ' + newContent.titolo + '</h1> <p>' + newContent.testo + '</p></fieldset></div>';
}
