var statuspage = document.querySelector("#status");

function ini_status(){
    startload();
    fetch("https://theinnovation-db.gewaechshaus.vercel.app/api/getData.js", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: ""
      })
      .then(text => text.json())
      .then(d => {
        stopload();
        var data = d.data;

        var temp = data.length-1
        var out = '<div class="ich">'+data[temp].time.toString()+'</div>';
        /*var out = `<table style="width:100%">
          <tr>
            <th>Zeit</th>
            <th>Regensensor</th>
            <th>temperatur Innen</th>
            <th>temperatur Außen</th>
            <th>Luftfeuchtigkeit Innen</th>
            <th>Luftfeuchtigkeit Außen</th>
            <th>Bodenfeuchtigkeit 1</th>
            <th>Bodenfeuchtigkeit 2</th>
            <th>Bodenfeuchtigkeit 3</th>
            <th>Wasserstand</th>
            <th>Pumpe</th>
            <th>Windgeschwindigkeit</th>
            <th>Niederschlag (in letzter zeit)</th>
            <th>Windrichtung</th>
          </tr>`;
        for(var i = data.length-1; i >=0;i--){
          out+='<tr>';
          out+=`<td>${data[i].time.toString()}</td>`;
          out+=`<td>${data[i].wetterstation.regensensor.toString()}</td>`;
          out+=`<td>${data[i].gewaechshaus.temperaturInnen.toString()}</td>`;
          out+=`<td>${data[i].wetterstation.temperaturAussen.toString()}</td>`;
          out+=`<td>${data[i].gewaechshaus.luftfeuchtigkeitInnen.toString()}</td>`;
          //out+=`<td>${data[i].wetterstation.luftfeuchtigkeitAussen.toString()}</td>`;
          out+=`<td>${data[i].gewaechshaus.bodenfeuchtigkeit.bodenfeuchtigkeit1.toString()}</td>`;
          out+=`<td>${data[i].gewaechshaus.bodenfeuchtigkeit.bodenfeuchtigkeit2.toString()}</td>`;
          out+=`<td>${data[i].gewaechshaus.bodenfeuchtigkeit.bodenfeuchtigkeit3.toString()}</td>`;
          out+=`<td>${data[i].gewaechshaus.bewaesserung.wasserstand.toString()}</td>`;
          out+=`<td>${data[i].gewaechshaus.bewaesserung.pumpe.pumpe.toString()}</td>`;
          out+=`<td>${data[i].wetterstation.windspeed.toString()}</td>`;
          out+=`<td>${data[i].wetterstation.windrichtung.toString()}</td>`;
          out+=`<td>${data[i].wetterstation.niederschlag.toString()}</td>`;
          out+='</tr>';
        }
        out+="</table>";*/

        statuspage.innerHTML = out;
      })
      .catch(error => {
        stopload();
        console.log(error);
    })
}
