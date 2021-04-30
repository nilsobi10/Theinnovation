var statuspage = document.querySelector("#status");

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
      console.log(data[0].uts);
      document.getElementById('graph');

      function loadsite(site) {
        inhalt.innerHTML = sites[site];
        graph.style.display = "block";
        dashboard.style.width = "50%";
        dashboard.innerHTML = "dashboard";
        var out = [];

        console.log("aktuelle Seite: " + site);
        switch (site) {
          case 0:
            for (var i = 0; i < data.length; i++) {
              out.push({
                x: data[i].uts,
                y: {
                  Außentemperatur: data[i].wetterstation.temperaturAussen,
                  Innentemperatur1: data[i].gewaechshaus.temperaturInnenoben,
                  Innentemperatur2: data[i].gewaechshaus.temperaturInnenunten,
                  Innentemperatur3: data[i].gewaechshaus.temperaturInnenmitte,
                  Schaltzentralentemperatur: data[i].gewaechshaus.temperaturzentrum
                }
              });
            }

            break;
          case 1:
            break;
          case 2:
            break;
          case 3:
            break;
          case 4:
            break;
          case 5:
            //graph.style.display = "none";
            //dashboard.style.width = "95%";
            break;
          default:
            inhalt.innerHTML = "Es ist ein Fehler aufgetreten, versuchen Sie es später noch einmal erneut!";

        }

        var inlines = [{
          "x": 1000,
          "nid": "day",
          "text": "Temperaturen",
          "pos": "top", //top,bottom
          "width": 2
        }];
        chart.setData(out, inlines);
        //chart.show(['t3', 't4']);
        chart.showAll();


      };
      var inhalt = document.getElementsByClassName('inhalt');
      loadsite(site);


      stopload();

    })
    .catch(error => {
      stopload();
      console.log(error);

    })
}
