
var wetterpage = document.querySelector("#wetter");
function ini_wetter() {
  startload();
  fetch("http://api.openweathermap.org/data/2.5/weather?q=Erfurt&appid=f110ed3e8279b2f034514ff87e0a387f", {
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
      var data = d.wind;
      var out = `<tabele style="width:100%">
      <tr>
      <th>Hallo</th>
      </tr>`;
      out+=`<td>${wind.speed.toString()}</td>`;
      out+="</table>";
      wetterpage.innerHTML = out;
    })
    .catch(error => {
      stopload();
      console.log(error);
    })
    }
