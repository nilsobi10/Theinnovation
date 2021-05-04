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
const name = document.getElementById('name')
const password = document.getElementById('password')
const form = document.getElementById('form')
const errorElement = document.getElementById('error')

form.addEventListener('submit', (e) => {
  let messages = []
  if (name.value === '' || name.value == null) {
    messages.push('Keine Eingabe')
  }

  if (password.value.length <= 6) {
    messages.push('Passwort muss mehr als 6 Zeichen haben')
  }

  if (password.value.length >= 20) {
    messages.push('Das Passwort darf maximal 20 Zeichen haben')
  }

  if (password.value === 'password') {
    messages.push('Das Passwort kann nicht Passwort sein')
  }

  if (messages.length > 0) {
    e.preventDefault()
    errorElement.innerText = messages.join(', ')
  }
})

function closelogin() {
  document.querySelector(".login").style.opacity = 0;
  window.setTimeout(function() {
    document.querySelector(".login").style.display = "none";
  }, 150);
}
