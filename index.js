function ini_sites(e) {
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
    case "#pool":
      ini_pool();
      break;
    case "#impressum":
      ini_impressum();
      break;
  }
}

window.onhashchange = () => {
  closemenu();
  scrollUp();
  ini_sites(location.hash);
}
if (location.hash == "") {
  location.hash = "#home"
}

ini_sites(location.hash);

function openmenu() {
  document.querySelector(".menu").style.cssText = "transform:translateX(0) scaleX(-1);";
  document.querySelector(".menuoverlay").style.display = "";
  window.setTimeout(function() {
    document.querySelector(".menuoverlay").style.opacity = 1;
  }, 10);
}

function closemenu() {
  document.querySelector(".menu").style.cssText = "transform:translateX(-100%) scaleX(-1);";
  document.querySelector(".menuoverlay").style.opacity = 0;
  window.setTimeout(function() {
    document.querySelector(".menuoverlay").style.display = "none";
  }, 300);
}

function openlogin() {
  document.querySelector(".login").style.display = "";
  window.setTimeout(function() {
    document.querySelector(".login").style.opacity = 1;
  }, 10);
}

function closelogin() {
  document.querySelector(".login").style.opacity = 0;
  window.setTimeout(function() {
    document.querySelector(".login").style.display = "none";
  }, 150);
}
