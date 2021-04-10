var statuspage = document.querySelector("#status");

function ini_status() {
  startload();

  var sites = ["Temperatur", "Luftfeuchtigkeit", "Bodenfeuchtigkeit", "Gießungen", "Wasserstand", "Meldungen"];

  var site = 0;

  function nextsite() {
    if (site == sites.length) {
      site = 0;
    } else {
      site++;
    };
  };

  function beforesite() {
    if (site == 0) {
      site = sites.length;
    } else {
      site--;
    };
  };



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

      function loadsite(site) {
        console.log("aktuelle Seite: " + site);
        switch (site) {
          case 0:
            inhalt.innerHTML = "Temperaturen";
            var temperatursite = document.createElement('div');
            temperatursite.id = "temperatursite";
            var pictemp = document.createElement('img');
            pictemp.id = "gewaechshaus";
            pictemp.src = 'picture/gewaechshaus.jpg';
            var schaltzentrale = document.createElement('img');
            schaltzentrale.src = 'picture/schaltzentrale.jpg';
            schaltzentrale.id = "schaltzentrale";

            var tempergraph = document.createElement('div');
            tempergraph.id = "tempergraph";
            tempergraph.innerHTML = "hi";

            temperatursite.appendChild(schaltzentrale);
            temperatursite.appendChild(pictemp);
            inhalt.appendChild(temperatursite);
            inhalt.appendChild(tempergraph);
            break;
          default:
            inhalt.innerHTML = "Es ist ein Fehler aufgetreten, versuchen Sie es später noch einmal erneut!"

        }
      }

      var inhalt = document.createElement('div');
      inhalt.className = "inhalt";
      loadsite(site);

      var box = document.getElementById('box-status');
      box.style.display = "flex";
      box.innerHTML = " ";
      var weiter = document.createElement('div');
      weiter.innerHTML = ">";
      weiter.id = "weiter";
      weiter.onclick = () => {
        nextsite();
        loadsite(site);
      }
      var zuruck = document.createElement('div');
      zuruck.innerHTML = "<";
      zuruck.style.float = "left";
      zuruck.id = "zuruck";
      zuruck.onclick = () => {
        beforesite();
        loadsite(site);
      };


      box.appendChild(zuruck);
      box.appendChild(inhalt);
      box.appendChild(weiter);

      stopload();

    })
    .catch(error => {
      stopload();
      console.log(error);
    })
}
