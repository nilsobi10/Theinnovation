var poolpage = document.querySelector("#pool");


function ini_pool() {
  startload();
  google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);


  function drawChart() {
    var inside = [['Zeit', 'Temperatur']];
    var time = [3];
    var temper = [5];
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
