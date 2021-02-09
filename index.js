function ini_sites(e){
  switch (e) {
    case "#home":
      ini_home();
      break;
    case "#plant":
      ini_plant();
      break;
    case "#status":
      ini_status();
      break;
    case "#controll":
      ini_controll();
      break;
    case "#wetter":
      ini_wetter();
      break;
    case "#impressum":
      ini_impressum();
      break;
  }
}

function scrollUp(){
  window.scrollBy({ top: -1000, left: 0, behavior: "smooth" })
};

scrollUp();

window.onhashchange = () => {
  closemenu();
  ini_sites(location.hash);
}
if (location.hash == "") {
  location.hash = "#home"
}

function openmenu(){
  document.querySelector(".menu").style.cssText="transform:translateX(0) scaleX(-1);";
  document.querySelector(".menuoverlay").style.display="";
  window.setTimeout(function(){document.querySelector(".menuoverlay").style.opacity=1;},10);
}

function closemenu(){
  document.querySelector(".menu").style.cssText="transform:translateX(-100%) scaleX(-1);";
  document.querySelector(".menuoverlay").style.opacity=0;
  window.setTimeout(function(){document.querySelector(".menuoverlay").style.display="none";},300);
}

function openlogin(){
  document.querySelector(".login").style.display="";
  window.setTimeout(function(){document.querySelector(".login").style.opacity=1;},10);
}
function closelogin(){
  document.querySelector(".login").style.opacity=0;
  window.setTimeout(function(){document.querySelector(".login").style.display="none";},150);
}

var loading = 0;
function startload(){
  if(loading==0){
    document.querySelector(".loading").style.display="";
    window.setTimeout(function(){document.querySelector(".loading").style.opacity=1;},10);
  }
  loading++;
}
function stopload(){
  loading--;
  if(loading<=0){
    document.querySelector(".loading").style.opacity=0;
    window.setTimeout(function(){document.querySelector(".loading").style.display="none";},150);
    loading=0;
  }
}
function forcestoploading(){
  loading = 0;
  stopload();
}
