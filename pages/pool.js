var poolpage = document.querySelector("#pool");


function ini_pool() {
  startload();
  google.charts.load('current', {
    'packages': ['corechart']
  });
  google.charts.setOnLoadCallback(drawChart);

  async function drawChart() {
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
        stopload();
        var data = d.data;
        window.laengdata = data.length;
        window.time = [];
        window.temper = [];
        for (var i = 0; i < data.length; i++) {
          window.time.push(data[i].time);
          window.temper.push(data[i].pool);
        }
        console.log(window.time);
        console.log(window.temper);
        graph();
      })
      .catch(error => {
        stopload();
        console.log(error);
      })

    function graph() {
      var inside = [
        ['Zeit', 'Temperatur']
      ];
      var temper = [5, 6, 7, 8, 4, 5, 6, 7];
      for (var i = 0; i < window.laengdata; i++) {
        inside[inside.length] = [window.time[i], parseInt(window.temper[i])];
      };
      var data = google.visualization.arrayToDataTable(inside);

      var options = {
        title: 'Wassertemperatur',
        titlePosition: 'in', //Titel im Graph
        curveType: 'none', //function = runde Funktion
        legend: {
          position: 'bottom', //Legenden Position
          textStyle: {
            color: 'blue', //stylt legende
            fontSize: 16
          }

        }

      };

      var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

      chart.draw(data, options);

      stopload();
    }
  }

}
