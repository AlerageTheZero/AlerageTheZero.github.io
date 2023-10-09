//Inizializando la visibilità di ogni sezione a none, eccetto per presentation
document.getElementById("menu-visibility").style.display = "none";
document.getElementById("projectList").style.display = "none";
document.getElementById("myContact").style.display = "none";
document.getElementById("main").style.display = "none";
document.getElementById("myWorkExperince").style.display = "none";
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
  document.getElementById("myWorkExperince")
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
        var idToAnimate = event.target.innerHTML == "Home" ? 
        "main" : (event.target.innerHTML == "Progetti"? 
        "projectList" : (event.target.innerHTML == "I miei contatti"? 
        "myContact" : "myWorkExperince"));

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

//Caricamento da json delle esperienze lavorative
var jobList = document.getElementById("swiper_container");
for (var job of workExperienceEntries){
    var techList = "";
    if (job.learnt_technologies.length > 0){
        var grid = ""; 
        grid += '<div class="grid-container">';
        //console.log(job.learnt_technologies);
        for (var tech of job.learnt_technologies){
            techList += '<h6><span class="badge">' + tech + '</span></h6>';
        }

        grid += techList + '</div>';
        techList = "";     
   }
   jobList.innerHTML += '<div class="swiper-slide slide-spacing">' +
    '<h4>' + job.start_date + ' - ' + job.end_date + '</h4>' +
    '<h3>' + job.company + '</h3>' +
    '<img class="me joblogo" src="'+ job.img_url +'">' +
    '<h2 style="font-weight: bold">' + job.role + '</h2>' +
    '<h4 style="font-style: italic">' + job.description + '</h4>' + grid;
    jobList.innerHTML += '</div>'; 
}

//Caricamento da json dei progetti personali
var personalProjectList = document.getElementById("personalProjectList");
for (var project of personalProjectEntries){
    var techList = "";
    if (project.used_technologies.length > 0){
            var grid = ""; 
            grid += '<div class="tag-list">';
            console.log(project.used_technologies);
            for (var tech of project.used_technologies){
                techList += '<h6><span class="badge">' + tech + '</span></h6>';
            }
            grid += techList + '</div>';
            techList = "";  
   }
   personalProjectList.innerHTML += '<div class="element">' +
        '<a href = "' + project.project_link + '">' + 
            '<div>' +
                '<h3>'+ project.title +'</h3>' +
                '<h5>'+ project.role +'</h5>' + 
                '<img class="me" src="' + project.img_url + '">' + 
                '<p>' + project.description + '</p>' + 
            '</div>' + 
        '</a>' + grid +
    '</div>'; 
}

//Caricamento da json dei progetti personali
var otherProjectList = document.getElementById("otherProjectList");
for (var project of otherProjectEntries){
    var techList = "";
    if (project.used_technologies.length > 0){
            var grid = ""; 
            grid += '<div class="tag-list">';
            console.log(project.used_technologies);
            for (var tech of project.used_technologies){
                techList += '<h6><span class="badge">' + tech + '</span></h6>';
            }
            grid += techList + '</div>';
            techList = "";  
   }
   otherProjectList.innerHTML += '<div class="element">' +
        '<a href = "' + project.project_link + '">' + 
            '<div>' +
                '<h3>'+ project.title +'</h3>' +
                '<h5>'+ project.role +'</h5>' + 
                '<img class="me" src="' + project.img_url + '">' + 
                '<p>' + project.description + '</p>' + 
            '</div>' +  
        '</a>' + grid +
    '</div>'; 
}

//Caricamento da json dei prossimi progetti
var comingSoonProjectList = document.getElementById("comingSoonProjectList");
for (var project of comingSoonProjectEntries){
    comingSoonProjectList.innerHTML += '<div class="element">' +
        '<a href = "' + project.project_link + '">' + 
            '<div>' +
                '<h3>'+ project.title +'</h3>' +
                '<img class="me" src="' + project.img_url + '">' + 
                '<p>' + project.description + '</p>' + grid + 
            '</div>' +
        '</a>' + 
    '</div>'; 
}
