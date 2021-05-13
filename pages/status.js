var statuspage = document.querySelector("#status");
var inhalt = document.getElementsByClassName('inhalt');
console.log(inhalt);
var sitename = document.getElementById('sitename');
let sites = ["Temperatur", "Luftfeuchtigkeit", "Bodenfeuchtigkeit", "Gießungen", "Wasserstand", "Meldungen"];
//var chart = document.getElementById('graph');

let site = 0;

var inlines = [{ //graph einstellungen
  "x": 1000,
  "nid": "day",
  "text": "Temperaturen",
  "pos": "top", //top,bottom
  "width": 2
}];

function nextsite() {
  if (site == sites.length - 1) {
    site = 0;
  } else {
    site++;
  };
  loadsite();
};

function beforesite() {
  if (site == 0) {
    site = sites.length - 1;
  } else {
    site--;
  };
  loadsite();
};

function loadsite() {

  var graphenseite = document.getElementById('chart');
  var daten = JSON.parse(localStorage.getItem('daten'));

  sitename.innerHTML = sites[site];
  graphenseite.style.display = "block";
  dashboard.style.width = "50%";
  dashboard.innerHTML = "dashboard";

  console.log("aktuelle Seite: " + site);
  var graph = ["Temperatur"];
  switch (site) {
    case 0:
      loadgraph(1);
      break;
    case 1:
      loadgraph(2);
      break;
    case 2:
      loadgraph(3);
      break;
    case 3:
      graphenseite.style.display = "none";
      dashboard.style.width = "95%";
      break;
    case 4:
      loadgraph(4);
      break;
    case 5:
      graphenseite.style.display = "none";
      dashboard.style.width = "95%";
      dashboard.innerHTML = " ";
      var meldung = splitMeldungen();
      loadMeldungen();
      break;
    default:
      inhalt.innerHTML = "Es ist ein Fehler aufgetreten, versuchen Sie es später noch einmal erneut!";

  }
};

function ini_status() {
  startload();

  fetch("https://theinnovation-db-gewaechshaus.vercel.app/api/getData.js", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: ""
    })
    .then(text => text.json())
    .then(d => {
      var data = d.data;
      localStorage.setItem('daten', JSON.stringify(data));
      loadsite();
      stopload();

    })
    .catch(error => {
      stopload();
      console.log(error);

    })
}
