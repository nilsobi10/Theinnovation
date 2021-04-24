var statuspage = document.querySelector("#status");

function ini_status() {
  startload();

  var sites = ["Temperatur", "Luftfeuchtigkeit", "Bodenfeuchtigkeit", "Gießungen", "Wasserstand", "Meldungen"];

  var site = 0;

  function nextsite() {
    if (site == sites.length - 1) {
      site = 0;
    } else {
      site++;
    };
  };

  function beforesite() {
    if (site == 0) {
      site = sites.length - 1;
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
      console.log(data[0].uts);

      var graph = document.createElement('div');
      var dashboard = document.createElement('div');
      var chart = document.createElement('div');
      chart.id = "chart";

      function loadsite(site) {
        inhalt.innerHTML = sites[site];
        dashboard.id = "dashboard";
        graph.id = "graph";
        graph.innerHTML = "graph";
        graph.style.display = "block";
        dashboard.style.width = "50%";
        dashboard.innerHTML = "dashboard";
        var out = [];

        console.log("aktuelle Seite: " + site);
        switch (site) {
          case 0:

            for (var i = 0; i < 3; i++) {
              out.push({
                x: i,
                y: {
                  Temperatur: 1,
                  Temperatur2: 2,
                  Temperatur3: 3,
                  Temperatur4: 4
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
            graph.style.display = "none";
            dashboard.style.width = "95%";
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


        inhalt.appendChild(dashboard);
        graph.appendChild(chart);
        inhalt.appendChild(graph);
      };
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
      };
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
