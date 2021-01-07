
var wetterpage = document.querySelector("#wetter");
function ini_wetter() {
  startload();
  fetch("https://api.openweathermap.org/data/2.5/weather?q=Erfurt&appid=f110ed3e8279b2f034514ff87e0a387f", {
      method: 'POST',
      headers: {

      },
      body: ""
    })
    .then(text => text.json())
    .then(d => {
      stopload();
      var data = d.wind;
      var out=`<div>${d.wind.speed.toString()}</div>`;
      wetterpage.innerHTML = out;
    })
    .catch(error => {
      stopload();
      console.log(error);
    })
    }











// 60deg = Nordost?
// These: 90deg Ost...
