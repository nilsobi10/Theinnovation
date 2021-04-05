var poolpage = document.querySelector("#pool");


function ini_pool() {
  startload();
  google.charts.load('current', {
    'packages': ['corechart']
  });
  google.charts.setOnLoadCallback(drawChart);
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

      var temp = data.length - 1
      var out = '<div class="ich">' + data[temp].time.toString() + '</div>';
      var out = `<table style="width:100%">
              <tr>
                <th>Zeit</th>
              </tr>`;
      for (var i = data.length - 1; i >= 0; i--) {
        out += '<tr>';
        out += `<td>${data[i].time.toString()}</td>`;
        out += '</tr>';
      }
      out += "</table>";

      poolpage.innerHTML = out;
    })
    .catch(error => {
      stopload();
      console.log(error);
    })

  function drawChart() {
    var inside = [
      ['Zeit', 'Temperatur']
    ];
    var time = [3, 6, 7, 7, 6, 8, 8, 9];
    var temper = [5, 6, 7, 8, 4, 5, 6, 7];
    for (var i = 0; i < time.length; i++) {
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

ini_pool();
