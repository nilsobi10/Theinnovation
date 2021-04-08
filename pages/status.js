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

      //var out = '<div class="box"></div>';
      var box = document.getElementById('box-status');
      box.innerHTML = " ";

      var i = 0;
      var temperaturInnenoben = document.createElement('div');
      temperaturInnenoben.className = "datenfeld";
      temperaturInnenoben.id = "datenfeld" + i;
      i++;
      temperaturInnenoben.innerHTML = data[(data.length) - 1].gewaechshaus.temperaturInnenoben + " °C";

      var temperaturInnenunten = document.createElement('div');
      temperaturInnenunten.className = "datenfeld";
      temperaturInnenunten.id = "datenfeld" + i;
      i++;
      temperaturInnenunten.innerHTML = data[(data.length) - 1].gewaechshaus.temperaturInnenunten + " °C";

      var temperaturInnenmitte = document.createElement('div');
      temperaturInnenmitte.className = "datenfeld";
      temperaturInnenmitte.id = "datenfeld" + i;
      i++;
      temperaturInnenmitte.innerHTML = data[(data.length) - 1].gewaechshaus.temperaturInnenunten + " °C";

      var luftfeuchtigkeitInnenoben = document.createElement('div');
      luftfeuchtigkeitInnenoben.className = "datenfeld";
      luftfeuchtigkeitInnenoben.id = "datenfeld" + i;
      i++;
      luftfeuchtigkeitInnenoben.innerHTML = data[(data.length) - 1].gewaechshaus.luftfeuchtigkeitInnenoben + " %";

      var luftfeuchtigkeitInnenunten = document.createElement('div');
      luftfeuchtigkeitInnenunten.className = "datenfeld";
      luftfeuchtigkeitInnenunten.id = "datenfeld" + i;
      i++;
      luftfeuchtigkeitInnenunten.innerHTML = data[(data.length) - 1].gewaechshaus.luftfeuchtigkeitInnenunten + " %";

      var luftfeuchtigkeitInnenmitte = document.createElement('div');
      luftfeuchtigkeitInnenmitte.className = "datenfeld";
      luftfeuchtigkeitInnenmitte.id = "datenfeld" + i;
      i++;
      luftfeuchtigkeitInnenmitte.innerHTML = data[(data.length) - 1].gewaechshaus.luftfeuchtigkeitInnenunten + " %";

      var bodenfeuchtigkeit1 = document.createElement('div');
      bodenfeuchtigkeit1.className = "datenfeld";
      bodenfeuchtigkeit1.id = "datenfeld" + i;
      i++;
      bodenfeuchtigkeit1.innerHTML = data[(data.length) - 1].gewaechshaus.bodenfeuchtigkeit.bodenfeuchtigkeit1 + " %";

      var bodenfeuchtigkeit2 = document.createElement('div');
      bodenfeuchtigkeit2.className = "datenfeld";
      bodenfeuchtigkeit2.id = "datenfeld" + i;
      i++;
      bodenfeuchtigkeit2.innerHTML = data[(data.length) - 1].gewaechshaus.bodenfeuchtigkeit.bodenfeuchtigkeit2 + " %";

      var bodenfeuchtigkeit3 = document.createElement('div');
      bodenfeuchtigkeit3.className = "datenfeld";
      bodenfeuchtigkeit3.id = "datenfeld" + i;
      i++;
      bodenfeuchtigkeit3.innerHTML = data[(data.length) - 1].gewaechshaus.bodenfeuchtigkeit.bodenfeuchtigkeit3 + " %";

      var wasserstand = document.createElement('div');
      wasserstand.className = "datenfeld";
      wasserstand.id = "datenfeld" + i;
      i++;
      wasserstand.innerHTML = data[(data.length) - 1].gewaechshaus.bewaesserung.wasserstand + " %";

      var temperaturAussen = document.createElement('div');
      temperaturAussen.className = "datenfeld";
      temperaturAussen.id = "datenfeld" + i;
      i++;
      temperaturAussen.innerHTML = data[(data.length) - 1].wetterstation.temperaturAussen + ' °C';

      var luftfeuchtigkeitAussen = document.createElement('div');
      luftfeuchtigkeitAussen.className = "datenfeld";
      luftfeuchtigkeitAussen.id = "datenfeld" + i;
      i++;
      luftfeuchtigkeitAussen.innerHTML = data[(data.length) - 1].wetterstation.luftfeuchtigkeitAussen + ' %';

      var regensensor = document.createElement('div');
      regensensor.className = "datenfeld";
      regensensor.id = "datenfeld" + i;
      i++;
      regensensor.innerHTML = data[(data.length) - 1].wetterstation.regensensor + ' mm';

      var temperaturpool = document.createElement('div');
      temperaturpool.className = "datenfeld";
      temperaturpool.id = "datenfeld" + i;
      i++;
      temperaturpool.innerHTML = data[(data.length) - 1].pool + ' °C';

      var entfernungssensor = document.createElement('div');
      entfernungssensor.className = "datenfeld";
      entfernungssensor.id = "datenfeld" + i;
      i++;
      entfernungssensor.innerHTML = data[(data.length) - 1].gewaechshaus.dach.entfernungssensor + ' cm';

      var motor = document.createElement('div');
      motor.className = "datenfeld";
      motor.id = "datenfeld" + i;
      i++;
      motor.innerHTML = data[(data.length) - 1].gewaechshaus.dach.motor + ' Sekunden';

      var ventil1 = document.createElement('div');
      ventil1.className = "datenfeld";
      ventil1.id = "datenfeld" + i;
      i++;
      ventil1.innerHTML = data[(data.length) - 1].gewaechshaus.bewaesserung.pumpe.ventil1;

      var ventil2 = document.createElement('div');
      ventil2.className = "datenfeld";
      ventil2.id = "datenfeld" + i;
      i++;
      ventil2.innerHTML = data[(data.length) - 1].gewaechshaus.bewaesserung.pumpe.ventil2;

      var ventil3 = document.createElement('div');
      ventil3.className = "datenfeld";
      ventil3.id = "datenfeld" + i;
      i++;
      ventil3.innerHTML = data[(data.length) - 1].gewaechshaus.bewaesserung.pumpe.ventil3;

      var ventil4 = document.createElement('div');
      ventil4.className = "datenfeld";
      ventil4.id = "datenfeld" + i;
      i++;
      ventil4.innerHTML = data[(data.length) - 1].gewaechshaus.bewaesserung.pumpe.ventil4;

      var pumpe = document.createElement('div'); //wie lange zuletzt gelaufeb
      pumpe.className = "datenfeld";
      pumpe.id = "datenfeld" + i;
      i++;
      pumpe.innerHTML = data[(data.length) - 1].gewaechshaus.bewaesserung.pumpe.ventil4;

      var temperaturzentrum = document.createElement('div');
      temperaturzentrum.className = "datenfeld";
      temperaturzentrum.id = "datenfeld" + i;
      i++;
      temperaturzentrum.innerHTML = data[(data.length) - 1].gewaechshaus.temperaturzentrum + " °C";

      var luftfeuchtigkeitzentrum = document.createElement('div');
      luftfeuchtigkeitzentrum.className = "datenfeld";
      luftfeuchtigkeitzentrum.id = "datenfeld" + i;
      i++;
      luftfeuchtigkeitzentrum.innerHTML = data[(data.length) - 1].gewaechshaus.luftfeuchtigkeitzentrum + " %";

      var zeit = document.createElement('div');
      zeit.className = "datenfeld";
      zeit.id = "datenfeld" + i;
      i++;
      zeit.innerHTML = data[(data.length) - 1].time;

      var benachrichtigung = document.createElement('div');
      benachrichtigung.className = "datenfeld";
      benachrichtigung.id = "datenfeld" + i;
      i++;
      benachrichtigung.innerHTML = data[(data.length) - 1].benachrichtigung;


      box.appendChild(temperaturInnenoben);
      box.appendChild(temperaturInnenunten);
      box.appendChild(temperaturInnenmitte);
      box.appendChild(luftfeuchtigkeitInnenoben);
      box.appendChild(luftfeuchtigkeitInnenunten);
      box.appendChild(luftfeuchtigkeitInnenmitte);
      box.appendChild(bodenfeuchtigkeit1);
      box.appendChild(bodenfeuchtigkeit2);
      box.appendChild(bodenfeuchtigkeit3);
      box.appendChild(wasserstand);
      box.appendChild(temperaturAussen);
      box.appendChild(luftfeuchtigkeitAussen);
      box.appendChild(regensensor);
      box.appendChild(temperaturpool);
      box.appendChild(entfernungssensor);
      box.appendChild(motor);
      box.appendChild(ventil1);
      box.appendChild(ventil2);
      box.appendChild(ventil3);
      box.appendChild(ventil4);
      box.appendChild(pumpe);
      box.appendChild(temperaturzentrum);
      box.appendChild(luftfeuchtigkeitzentrum);
      box.appendChild(zeit);
      box.appendChild(benachrichtigung);

      for (var j = 0; i > j; j++) {

        var details = document.getElementById('datenfeld'+j);
        var content = document.createElement('div');
        content.id = "details" + j;
        content.style.display = "none";
        content.innerHTML = " ha";
        details.onclick = () => {
          if (content.style.display === 'none') {
            content.style.display = 'block';
          } else {
            content.style.display = 'none'
          }
        };
        details.appendChild(content);

      }

      stopload();

    })
    .catch(error => {
      stopload();
      console.log(error);
    })
}
