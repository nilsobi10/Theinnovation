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

      var temperaturInnenoben = document.createElement('div');
      temperaturInnenoben.className = "datenfeld";
      temperaturInnenoben.innerHTML = data[(data.length) - 1].gewaechshaus.temperaturInnenoben + " °C";

      var temperaturInnenunten = document.createElement('div');
      temperaturInnenunten.className = "datenfeld";
      temperaturInnenunten.innerHTML = data[(data.length) - 1].gewaechshaus.temperaturInnenunten + " °C";

      var temperaturInnenmitte = document.createElement('div');
      temperaturInnenmitte.className = "datenfeld";
      temperaturInnenmitte.innerHTML = data[(data.length) - 1].gewaechshaus.temperaturInnenunten + " °C";

      var luftfeuchtigkeitInnenoben = document.createElement('div');
      luftfeuchtigkeitInnenoben.className = "datenfeld";
      luftfeuchtigkeitInnenoben.innerHTML = data[(data.length) - 1].gewaechshaus.luftfeuchtigkeitInnenoben + " %";

      var luftfeuchtigkeitInnenunten = document.createElement('div');
      luftfeuchtigkeitInnenunten.className = "datenfeld";
      luftfeuchtigkeitInnenunten.innerHTML = data[(data.length) - 1].gewaechshaus.luftfeuchtigkeitInnenunten + " %";

      var luftfeuchtigkeitInnenmitte = document.createElement('div');
      luftfeuchtigkeitInnenmitte.className = "datenfeld";
      luftfeuchtigkeitInnenmitte.innerHTML = data[(data.length) - 1].gewaechshaus.luftfeuchtigkeitInnenunten + " %";

      var bodenfeuchtigkeit1 = document.createElement('div');
      bodenfeuchtigkeit1.className = "datenfeld";
      bodenfeuchtigkeit1.innerHTML = data[(data.length) - 1].gewaechshaus.bodenfeuchtigkeit.bodenfeuchtigkeit1 + " %";

      var bodenfeuchtigkeit2 = document.createElement('div');
      bodenfeuchtigkeit2.className = "datenfeld";
      bodenfeuchtigkeit2.innerHTML = data[(data.length) - 1].gewaechshaus.bodenfeuchtigkeit.bodenfeuchtigkeit2 + " %";

      var bodenfeuchtigkeit3 = document.createElement('div');
      bodenfeuchtigkeit3.className = "datenfeld";
      bodenfeuchtigkeit3.innerHTML = data[(data.length) - 1].gewaechshaus.bodenfeuchtigkeit.bodenfeuchtigkeit3 + " %";

      var wasserstand = document.createElement('div');
      wasserstand.className = "datenfeld";
      wasserstand.innerHTML = data[(data.length) - 1].gewaechshaus.bewaesserung.wasserstand + " %";

      var temperaturAussen = document.createElement('div');
      temperaturAussen.className = "datenfeld";
      temperaturAussen.innerHTML = data[(data.length) - 1].wetterstation.temperaturAussen + ' °C';

      var luftfeuchtigkeitAussen = document.createElement('div');
      luftfeuchtigkeitAussen.className = "datenfeld";
      luftfeuchtigkeitAussen.innerHTML = data[(data.length) - 1].wetterstation.luftfeuchtigkeitAussen + ' %';

      var regensensor = document.createElement('div');
      regensensor.className = "datenfeld";
      regensensor.innerHTML = data[(data.length) - 1].wetterstation.regensensor + ' mm';

      var temperaturpool = document.createElement('div');
      temperaturpool.className = "datenfeld";
      temperaturpool.innerHTML = data[(data.length) - 1].pool + ' °C';

      var entfernungssensor = document.createElement('div');
      entfernungssensor.className = "datenfeld";
      entfernungssensor.innerHTML = data[(data.length) - 1].gewaechshaus.dach.entfernungssensor + ' cm';

      var motor = document.createElement('div');
      motor.className = "datenfeld";
      motor.innerHTML = data[(data.length) - 1].gewaechshaus.dach.motor + ' Sekunden';

      var ventil1 = document.createElement('div');
      ventil1.className = "datenfeld";
      ventil1.innerHTML = data[(data.length) - 1].gewaechshaus.bewaesserung.pumpe.ventil1;

      var ventil2 = document.createElement('div');
      ventil2.className = "datenfeld";
      ventil2.innerHTML = data[(data.length) - 1].gewaechshaus.bewaesserung.pumpe.ventil2;

      var ventil3 = document.createElement('div');
      ventil3.className = "datenfeld";
      ventil3.innerHTML = data[(data.length) - 1].gewaechshaus.bewaesserung.pumpe.ventil3;

      var ventil4 = document.createElement('div');
      ventil4.className = "datenfeld";
      ventil4.innerHTML = data[(data.length) - 1].gewaechshaus.bewaesserung.pumpe.ventil4;

      var pumpe = document.createElement('div'); //wie lange zuletzt gelaufeb
      pumpe.className = "datenfeld";
      pumpe.innerHTML = data[(data.length) - 1].gewaechshaus.bewaesserung.pumpe.ventil4;

      var temperaturzentrum = document.createElement('div');
      temperaturzentrum.className = "datenfeld";
      temperaturzentrum.innerHTML = data[(data.length) - 1].gewaechshaus.temperaturzentrum + " °C";

      var luftfeuchtigkeitzentrum = document.createElement('div');
      luftfeuchtigkeitzentrum.className = "datenfeld";
      luftfeuchtigkeitzentrum.innerHTML = data[(data.length) - 1].gewaechshaus.luftfeuchtigkeitzentrum + " %";

      var zeit = document.createElement('div');
      zeit.className = "datenfeld";
      zeit.innerHTML = data[(data.length) - 1].time;

      var benachrichtigung = document.createElement('div');
      benachrichtigung.className = "datenfeld";
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

      stopload();
      /*
      var temp = data.length - 1
      var out = '<div class="ich">' + data[temp].time.toString() + '</div>';
      var out = `<table style="width:100%">
          <tr>
            <th>Zeit</th>
            <th>Regensensor</th>
            <th>temperatur Gewächshaus</th>
            <th>temperatur Außen</th>
            <th>Luftfeuchtigkeit Gewächshaus</th>
            <th>Luftfeuchtigkeit Außen</th>
            <th>Bodenfeuchtigkeit 1</th>
            <th>Bodenfeuchtigkeit 2</th>
            <th>Bodenfeuchtigkeit 3</th>
            <th>Wasserstand</th>
            <th>Pumpe</th>
          </tr>`;
      for (var i = data.length - 1; i >= 0; i--) {
        out += '<tr>';
        out += `<td>${data[i].time.toString()}</td>`;
        out += `<td>${data[i].wetterstation.regensensor.toString()}</td>`;
        out += `<td>${data[i].gewaechshaus.temperaturInnen.toString()}</td>`;
        out += `<td>${data[i].wetterstation.temperaturAussen.toString()}</td>`;
        out += `<td>${data[i].gewaechshaus.luftfeuchtigkeitInnen.toString()}</td>`;
        out += `<td>${data[i].wetterstation.luftfeuchtigkeitAussen.toString()}</td>`;
        out += `<td>${data[i].gewaechshaus.bodenfeuchtigkeit.bodenfeuchtigkeit1.toString()}</td>`;
        out += `<td>${data[i].gewaechshaus.bodenfeuchtigkeit.bodenfeuchtigkeit2.toString()}</td>`;
        out += `<td>${data[i].gewaechshaus.bodenfeuchtigkeit.bodenfeuchtigkeit3.toString()}</td>`;
        out += `<td>${data[i].gewaechshaus.bewaesserung.wasserstand.toString()}</td>`;
        out += `<td>${data[i].gewaechshaus.bewaesserung.pumpe.pumpe.toString()}</td>`;

        out += '</tr>';
      }
      out += "</table>";*/

      //statuspage.innerHTML = out;
    })
    .catch(error => {
      stopload();
      console.log(error);
    })
}
