var temperatur = document.getElementById('Temperatur');
var uhrzeit = document.getElementById('Uhrzeit');
temperatur.innerHTML = localStorage.getItem('Temperatur')+ ' °C';
uhrzeit.innerHTML = 'Stand: '+new Date(localStorage.getItem('Uhrzeit')*1000).toLocaleString();

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
    localStorage.setItem('Temperatur',parseFloat(data[data.length-1].pool));
    localStorage.setItem('Uhrzeit',parseFloat(data[data.length-1].uts));
    temperatur.innerHTML = localStorage.getItem('Temperatur')+ ' °C';
    uhrzeit.innerHTML = 'Stand: '+new Date(localStorage.getItem('Uhrzeit')*1000).toLocaleString();
  })
  .catch(error => {
    console.log(error);

  })
