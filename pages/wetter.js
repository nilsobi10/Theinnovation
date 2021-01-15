
var wetterpage = document.querySelector("#klima");
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
      var data = d;
      var speed = parseInt(d.wind.speed.toString());    //Windgeschwindigkeit

      speed=speed*3.6;
      speed=speed+" km/h"
      //speed= 'Die aktuelle Windgeschwindigkeit beträt: '+speed;

      var deg = parseInt(d.wind.deg.toString());          //Windrichtung
      if (deg <=22.5){deg='Norden';}
      else if(deg <= 67.5){deg='Nordost'}
      else if(deg <= 112.5){deg='Osten'}
      else if(deg <= 112.5+45){deg='Südosten'}
      else if(deg <= 112.5+45*2){deg='Süden'}
      else if(deg <= 112.5+45*3){deg='Südwesten'}
      else if(deg <= 112.5+45*4){deg='Westen'}
      else if(deg <= 112.5+45*5){deg='Nordwesten'}
      else if(deg <= 112.5+45*6){deg='Norden'};
      //deg='Die aktuelle Windrichtung beträgt: '+deg;

      var pic='<img class="bild" src="picture/bewölkt.png" draggable="false">'   //Wetterereignisserkennung

      var out='<div class=wetter>'+pic+deg+speed+'</div>';

      wetterpage.innerHTML = out;

    })
    .catch(error => {
      stopload();
      console.log(error);
    })
    }






// 60deg = Nordost?
// These: 90deg Ost...
