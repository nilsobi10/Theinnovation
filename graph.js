var c = document.getElementById('chart');
var r = new Random();
var gesture = new Gesture(c);

var chart = new Chart(c);

gesture = new Gesture(c);
chart.calcX = function(x, full = false) {
  var date = new Date(x * 1000);
  var h = date.getHours().toString();
  var m = date.getMinutes().toString();
  var d = date.getDate().toString();
  var mo = (date.getMonth() + 1).toString();
  var y = date.getFullYear().toString();
  if (h.length == 1) {
    h = "0" + h;
  }
  if (m.length == 1) {
    m = "0" + m;
  }
  if (d.length == 1) {
    d = "0" + d;
  }
  if (mo.length == 1) {
    mo = "0" + mo;
  }
  if (full) {
    return d + "." + mo + "." + y + " " + h + ":" + m;
  }
  return h + ":" + m;
};
chart.calcY = function(x, yt, y) {
  if (yt.startsWith("t")) {
    return y;
  }
  return y;
};
chart.lineNames = function(id) {
  return id;
};
chart.unit = function(id) {
  return "°C"; //return sensor name by id //Einheit
};
chart.linecolor = function(nid, item) {
  return "#0000ff";
};
gesture.ondrag = function(x, y, lx, ly, dir) {
  if (dir != "y") {
    chart.drag(x, lx);
    chart.closepopup();
  }
};
gesture.onzoom = function(x, y, r) {
  chart.zoom(x, r);
  chart.closepopup();
  return true;
};
gesture.onclick = function(x, y) {
  chart.showpopup(x, y);
};
window.addEventListener("resize", function() {
  chart.onresize();
});
