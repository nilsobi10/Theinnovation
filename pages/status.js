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
        var out = `<table style="width:100%">
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
          </tr>`;
        for(var i = data.length-1; i >=0;i--){
          out+='<tr>';
          out+=`<td>${data[i].time.toString()}</td>`;
          out+=`<td>${data[i].regensensor.toString()}</td>`;
          out+=`<td>${data[i].temperatur.temperaturInnen.toString()}</td>`;
          out+=`<td>${data[i].temperatur.temperaturAussen.toString()}</td>`;
          out+=`<td>${data[i].luftfeuchtigkeit.luftfeuchtigkeitInnen.toString()}</td>`;
          out+=`<td>${data[i].luftfeuchtigkeit.luftfeuchtigkeitAussen.toString()}</td>`;
          out+=`<td>${data[i].bodenfeuchtigkeit.bodenfeuchtigkeit1.toString()}</td>`;
          out+=`<td>${data[i].bodenfeuchtigkeit.bodenfeuchtigkeit2.toString()}</td>`;
          out+=`<td>${data[i].bodenfeuchtigkeit.bodenfeuchtigkeit3.toString()}</td>`;
          out+=`<td>${data[i].bewaesserung.wasserstand.toString()}</td>`;
          out+=`<td>${data[i].bewaesserung.pumpe.pumpe.toString()}</td>`;
          out+='</tr>';
        }
        out+="</table>";
        statuspage.innerHTML = out;
      })
      .catch(error => {
        stopload();
    })
}
