var poolpage = document.querySelector("#pool");


function ini_pool() {
  startload();
  google.charts.load('current', {
    'packages': ['corechart']
  });
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
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
        var time = [];
        for (var i = 0; i < data.length; i++) {
          time[i] = data[i].time.toString();
        }
      })
      .catch(error => {
        stopload();
        console.log(error);
      })
    var inside = [
      ['Zeit', 'Temperatur']
    ];
    var temper = [5, 6, 7, 8, 4, 5, 6, 7];
    for (var i = 0; i < data.length; i++) {
      inside[inside.length] = [time[i], temper[i]];
    };

    var data = google.visualization.arrayToDataTable(inside);

    var options = {
      title: 'Wassertemperatur',
      curveType: 'function',
      legend: {
        position: 'bottom'
      }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
  }

}
