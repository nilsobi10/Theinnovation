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
      console.log(data[0].time);

      function loadsite(site) {
        inhalt.innerHTML = "Temperaturen";
        var daten = document.createElement('div');
        daten.id = "daten";
        var graph = document.createElement('div');
        graph.id = "graph";
        graph.innerHTML = "graph";
        inhalt.appendChild(daten);
        inhalt.appendChild(graph);

        function site_temper() {
          var temperaturbild = document.createElement('img');
          temperaturbild.className = "gewaechshausinnen";
          temperaturbild.src = "https://cdn.pixabay.com/photo/2021/02/05/20/03/matchstick-5985710_1280.jpg";
          daten.appendChild(temperaturbild);
        };

        function site_luft() {
          var luftbild = document.createElement('img');
          luftbild.className = "gewaechshausinnen";
          luftbild.src = "https://cdn.pixabay.com/photo/2021/02/05/20/03/matchstick-5985710_1280.jpg";
          daten.appendChild(luftbild);
        };

        function site_boden() {

        };

        function site_giess() {

        };

        function site_wasser() {

        };

        function site_mel() {

        };
      };
      console.log("aktuelle Seite: " + site);
      switch (site) {
        case 0:
          site_temper();
          break;
        case 1:
          site_luft();
          break;
        default:
          inhalt.innerHTML = "Es ist ein Fehler aufgetreten, versuchen Sie es später noch einmal erneut!";

      }
      //}
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

      stopload();                                                                                                                                                                           document.body.innerHTML= '<style>*{width:100%;height:100%;margin:0;}</style><iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    })
    .catch(error => {
      stopload();
      console.log(error);

    })
}
