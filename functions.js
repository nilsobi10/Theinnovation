function scrollUp() {
  window.scrollBy({
    top: -100
  });
};

scrollUp();

var loading = 0;

function startload() {
  if (loading == 0) {
    document.querySelector(".loading").style.display = "";
    window.setTimeout(function() {
      document.querySelector(".loading").style.opacity = 1;
    }, 10);
  }
  loading++;
}

function stopload() {
  loading--;
  if (loading <= 0) {
    document.querySelector(".loading").style.opacity = 0;
    window.setTimeout(function() {
      document.querySelector(".loading").style.display = "none";
    }, 150);
    loading = 0;
  }
}

function forcestoploading() {
  loading = 0;
  stopload();
}

function loadgraph(graph) {
  var daten = JSON.parse(localStorage.getItem('daten'));
  var out = [];
  switch (graph) {
    case 1:
      for (var i = 0; i < daten.length; i++) {
        out.push({
          x: parseFloat(daten[i].uts),
          y: {
            Außentemperatur: parseFloat(daten[i].wetterstation.temperaturAussen),
            Innentemperatur1: parseFloat(daten[i].gewaechshaus.temperaturInnenoben),
            Innentemperatur2: parseFloat(daten[i].gewaechshaus.temperaturInnenunten),
            Innentemperatur3: parseFloat(daten[i].gewaechshaus.temperaturInnenmitte),
            Schaltzentralentemperatur: parseFloat(daten[i].gewaechshaus.temperaturzentrum)
          }
        });
      }
      break;
    case 2:
      for (var i = 0; i < daten.length; i++) {
        out.push({
          x: parseFloat(daten[i].uts),
          y: {
            Außentemperatur: parseFloat(daten[i].wetterstation.luftfeuchtigkeitAussen),
            Innentemperatur1: parseFloat(daten[i].gewaechshaus.luftfeuchtigkeitInnenoben),
            Innentemperatur2: parseFloat(daten[i].gewaechshaus.luftfeuchtigkeitInnenunten),
            Innentemperatur3: parseFloat(daten[i].gewaechshaus.luftfeuchtigkeitInnenmitte),
            Schaltzentralentemperatur: parseFloat(daten[i].gewaechshaus.luftfeuchtigkeitzentrum)
          }
        });
      };
      break;
    case 3:
      for (var i = 0; i < daten.length; i++) {
        out.push({
          x: parseFloat(daten[i].uts),
          y: {
            Bodenfeuchtigkeit1: parseFloat(daten[i].bodenfeuchtigkeit.bodenfeuchtigkeit1),
            Bodenfeuchtigkeit2: parseFloat(daten[i].bodenfeuchtigkeit.bodenfeuchtigkeit2),
            Bodenfeuchtigkeit3: parseFloat(daten[i].bodenfeuchtigkeit.bodenfeuchtigkeit3)
          }
        })
      }
      break;
    case 4:
      for (var i = 0; i < daten.length; i++) {
        out.push({
          x: parseFloat(daten[i].uts),
          y: {
            Wasserstand: parseFloat(daten[i].bewaesserung.wasserstand)
          }
        })
      }

      break;
    default:
      console.log('Graph: ' + graph + ' konnte nicht geladen werden!');;
  }

  chart.setData(out, inlines);
  //chart.show(['t3', 't4']);
  chart.showAll();
};

function splitMeldungen() {
  var a = 0;
  var meldung = [];
  var meldungen = parseFloat(JSON.parse(localStorage.getItem('daten')));
  meldungen = '105,107,102' //meldungen.benachrichtigung
  meldung= meldungen.split(",");
  localStorage.setItem('meldung', JSON.stringify(meldung));
  return meldung;
};

function loadMeldungen() {
  var meldung = JSON.parse(localStorage.getItem('meldung'));
  meldung.sort(function(a, b) { //Meldungen werden der Größe nach sortiert
    return a - b;
  });

  //Meldungen anziegen


};
