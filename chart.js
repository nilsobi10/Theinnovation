function Random(seed = new Date() * 894651320 % 49734321) {
  var seed = seed;
  this.rand = function(min, max, int = false) {
    min = min || 0;
    max = max || 1;
    seed = seed & 0xffffffff;
    seed = (seed + 0x7ed55d16 + (seed << 12)) & 0xffffffff;
    seed = (seed ^ 0xc761c23c ^ (seed >>> 19)) & 0xffffffff;
    seed = (seed + 0x165667b1 + (seed << 5)) & 0xffffffff;
    seed = ((seed + 0xd3a2646c) ^ (seed << 9)) & 0xffffffff;
    seed = (seed + 0xfd7046c5 + (seed << 3)) & 0xffffffff;
    seed = (seed ^ 0xb55a4f09 ^ (seed >>> 16)) & 0xffffffff;
    var oseed = (seed & 0xfffffff) / 0x10000000;

    return int ? Math.floor(min + oseed * (max - min + 1)) : min + oseed * (max - min);
  };
  this.seed = function(nseed = null) {
    if (nseed != null && typeof nseed == "number") {
      seed = nseed * 894651320 % 49734321;
    }
    return seed;
  }
}

function Chart(e, darki = false) {
  var t = this;
  var element = e;
  var c = document.createElement("canvas");
  c.style.cssText = "width:100%;height:100%;";
  var popup = document.createElement("div");
  popup.style.cssText = `
    position:absolute;
    opacity:0;
    transition: opacity 0.15s linear 0s, top 0.4s ease 0s, left 0.4s ease 0s;;
    min-height:50px;
    min-width:100px;
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0px 0px 5px -2px ${t.popupshadow};
    background: ${t.popupbackground};
    width:auto;
  `;
  popup.style.zIndex = parseInt("0" + e.style.zIndex) + 1;
  element.appendChild(c);
  element.appendChild(popup);
  var ctx = c.getContext("2d");
  var rand = new Random();

  var PIXEL_RATIO = function() {
    var dpr = window.devicePixelRatio || 1,
      bsr = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
    //return 1;
    return dpr / bsr;
  };

  this.dark = darki;
  var draw = false;
  var rawdata = [];
  var data = [];
  var showv = [];
  var fromX = 0;
  var toX = 0;
  var max = 0;
  var min = 0;
  var maxX = 0;
  var minX = 0;
  var offsetunten = 0;
  var offsetlinks = 0;
  var width;
  var height;
  var colors = {};
  var names = {};
  var lines = [];
  var linecolors = {};

  var zoomsize = 1;

  var cursorline = null;

  function countzeros(str) {
    var c = 0;
    for (var i = 0; i < str.length; i++) {
      if (str[i] == "0") {
        c++;
      }
    }
    return c;
  }

  function checkcanvas(daten, check) {
    for (var i = 0; i < daten.length; i = i + 8) {
      var returnnow = true;
      for (var j = 0;j<check.length;j++){
        var now = check[j];
        var cr=0;
        var cg=0;
        var cb=0;
        if(now.startsWith("rgb")){
          now = now.substr(4);
          if(now.startsWith("(")){
            now = now.substr(1);
          }
          var nowlist = now.split(",");
          cr = parseInt(nowlist[0]);
          cg = parseInt(nowlist[1]);
          cb = parseInt(nowlist[2]);
        }else if(now.startsWith("#")){
          now = now.substr(1);
          cr = parseInt(now.substr(0,2),16);
          cg = parseInt(now.substr(2,2),16);
          cb = parseInt(now.substr(4,2),16);
        }
        if(daten[i]==cr&&daten[i+1]==cr&&daten[i+2]==cr){
          returnnow = false;
        }
      }
      if(returnnow){
        return true;
      }
    }
    return false;
  }

  function getX(v) {
    var widthh = width - offsetlinks;
    return Math.floor((v - fromX) * widthh / (toX - fromX) + offsetlinks);
  }

  function getY(v) {
    var heightt = height - offsetunten;
    return Math.floor(heightt - ((v - min) * heightt / (max - min)));
  }
  //code.split("").map((d)=>{return d.charCodeAt(0).toString().padStart(3,"0")}).join("")
  /*if (!window.cordova){
    if(window.location.hostname!="jusax.de"){
      window.location = "https://google.de/";
    }
  }*/


  function loop() {
    window.requestAnimationFrame(loop);
    if (draw) {
      draw = false;
      width = element.offsetWidth * PIXEL_RATIO();
      height = element.offsetHeight * PIXEL_RATIO();
      zoomsize=Math.pow(PIXEL_RATIO(),0.5);
      c.width = width;
      c.height = height;
      ctx.fillStyle = t.background;
      ctx.clearRect(0, 0, width, height);
      ctx.fillRect(0, 0, width, height);
      if(data.length==0){
        ctx.fillStyle = t.fontcolor;
        ctx.font = (t.fontValue*zoomsize).toString()+t.font;
        var metrcisnodata = ctx.measureText(t.nodatastring);
        ctx.fillText(t.nodatastring,(width-metrcisnodata.width)/2,(height-(metrcisnodata.actualBoundingBoxAscent + metrcisnodata.actualBoundingBoxDescent))/2);
        return;
      }
      min = Infinity;
      max = -Infinity;
      for (var i = 0; i < data.length; i++) {
        if (data[i].x >= fromX && data[i].x <= toX || (i > 0 && i + 1 < data.length && (data[i + 1].x >= fromX && data[i - 1].x <= toX))) {
          let fordata = Object.keys(data[i].y)
          for(var ii = 0; ii<fordata.length;ii++){
            let item = fordata[ii];
            if (showv.indexOf(item) != -1) {
              if (data[i].y[item] < min) {
                min = data[i].y[item];
              }
              if (data[i].y[item] > max) {
                max = data[i].y[item];
              }
            }
          }
        }
      }
      if (min < max) {
        var d = max - min;
        min -= d * 0.1*zoomsize;
        max += d * 0.1*zoomsize;

        ctx.fillStyle = t.fontcolor;
        ctx.font = (t.fontValue*zoomsize).toString()+t.font;
        var metrics = ctx.measureText("88:0");
        var actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        offsetunten = Math.round(actualHeight * 2.5);
        if (offsetunten < 30) {
          offsetunten = 31;
        }
        offsetlinks = Math.round(metrics.width * 1.5);

        var distance = (max - min) / (height / (offsetunten * 2));
        var ppp = (() => {
          var ddd = distance.toString();
          var out = "";
          var c = 2;
          for (var i = 0; i < ddd.length; i++) {
            if (ddd[i] == ".") {
              out += ".";
            } else {
              if (ddd[i] == "0") {
                out += "0";
              } else {
                if (c > 0) {
                  out += ddd[i];
                  c--;
                } else {
                  out += "0";
                }
              }
            }
          }
          return parseFloat(out);
        })();
        ctx.strokeStyle = t.minorline;
        ctx.fillStyle = t.fontcolor;
        ctx.font = (t.fontValue*zoomsize).toString()+t.font;
        ctx.lineWidth = 2;
        for (var i = ppp; getY(i) > 0; i += ppp) {
          var mesure = ctx.measureText(Math.floor(i * 100) / 100).width + 10;
          if (offsetlinks < mesure) {
            offsetlinks = Math.round(mesure);
          }
          ctx.beginPath();
          ctx.moveTo(offsetlinks, getY(i));
          ctx.lineTo(width, getY(i));
          ctx.stroke();
        }
        for (var i = ppp; getY(i) < height; i -= ppp) {
          var mesure = ctx.measureText(Math.floor(i * 100) / 100).width + 10;
          if (offsetlinks < mesure) {
            offsetlinks = Math.round(mesure);
          }
          ctx.beginPath();
          ctx.moveTo(offsetlinks, getY(i));
          ctx.lineTo(width, getY(i));
          ctx.stroke();
        }
        ctx.lineWidth = 1;
        var last = {};
        var lastX = 0;
        var neww = {};
        for (var i = 0; i < data.length; i++) {
          if (data[i].x >= fromX && data[i].x <= toX || (i > 0 && i + 1 < data.length && (data[i + 1].x >= fromX && data[i - 1].x <= toX)) ) {
            neww = {};
            let fordata = Object.keys(data[i].y);
            for(var ii=0;ii<fordata.length;ii++){
              let item = fordata[ii];
              if (showv.indexOf(item) != -1) {
                neww[item] = data[i].y[item];
                if (typeof last[item] != "undefined") {
                  ctx.strokeStyle = colors[item];
                  ctx.beginPath();
                  ctx.moveTo(getX(lastX), getY(last[item]));
                  ctx.lineTo(getX(data[i].x), getY(data[i].y[item]));
                  ctx.stroke();
                }
              }
            }
            last = neww;
            lastX = data[i].x;
          }
        }
      }
      ctx.lineWidth = 3;
      ctx.fillStyle = t.background;
      ctx.clearRect(0, 0, offsetlinks, height);
      ctx.clearRect(0, height - offsetunten, width, height);

      ctx.fillRect(0, 0, offsetlinks, height);
      ctx.fillRect(0, height - offsetunten, width, height);

      ctx.strokeStyle = t.mainline;
      ctx.beginPath();
      ctx.moveTo(offsetlinks, 0);
      ctx.lineTo(offsetlinks, height - offsetunten);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(offsetlinks, height - offsetunten);
      ctx.lineTo(width, height - offsetunten);
      ctx.stroke();

      ctx.fillStyle = t.fontcolor;
      ctx.font = (t.fontValue*zoomsize).toString()+t.font;

      for (var i = ppp; getY(i) > 0; i += ppp) {
        if (getY(i) < height - offsetunten) {
          var text = (Math.floor(i * 100) / 100).toString()
          ctx.fillText(text, 5 + ((offsetlinks - 12 - ctx.measureText(text).width) / 2), getY(i) + offsetunten / 5);
        }
      }
      for (var i = 0; getY(i) + offsetunten < height - offsetunten; i -= ppp) {
        if (getY(i) > 0) {
          var text = (Math.floor(i * 100) / 100).toString()
          ctx.fillText(text, 5 + ((offsetlinks - 12 - ctx.measureText(text).width) / 2), getY(i) + offsetunten / 5);
        }
      }
      ctx.strokeStyle = "#ff0000";
      ctx.fillStyle = t.fontcolor;
      ctx.font = (t.fontValue*zoomsize).toString()+t.font;
      for(let i = 0; i<lines.length;i++){
        let line = lines[i];
        if (line.x > fromX && line.x < toX) {
          ctx.lineWidth = line.width;
          if (typeof linecolors[line.nid] == "undefined") {
            ctx.strokeStyle = "#ff0000";
          } else {
            ctx.strokeStyle = linecolors[line.nid];
          }
          ctx.beginPath();
          ctx.moveTo(getX(line.x), 0);
          ctx.lineTo(getX(line.x)/* - Math.round(line.width / 2)*/, height - (offsetunten * (line.pos == "bottom" ? 1.75 : 1)));
          ctx.stroke();
          var mwidth = ctx.measureText(line.text).width;
          if (line.pos == "bottom") {
            if (!checkcanvas(ctx.getImageData(getX(line.x) - Math.round(mwidth / 2), height - (offsetunten * 1.5), mwidth, 1).data,[t.background,t.minorline])) {
              ctx.fillText(line.text, getX(line.x) - Math.round(mwidth / 2), height - (offsetunten * 1.2));
            }
          } else {
            if (getX(line.x) - mwidth > offsetlinks + 5) {
              if (!checkcanvas(ctx.getImageData(getX(line.x) - 5 - Math.round(mwidth), offsetunten / 2.5, mwidth, 1).data, [t.background,t.minorline])) {
                ctx.fillText(line.text, getX(line.x) - 5 - Math.round(mwidth), offsetunten / 2.1);
              }
            } else {
              if (!checkcanvas(ctx.getImageData(getX(line.x) + 5, offsetunten / 2.5, mwidth, 1).data, [t.background,t.minorline])) {
                ctx.fillText(line.text, getX(line.x) + 5, offsetunten / 2.1);
              }
            }
          }
        }
      }
      var mmwidth = ctx.measureText("00:00").width;
      var minline = 0;
      var startline = false;
      var xdistance = (mmwidth * 1.1) * ((toX - fromX) / 60) / (width - offsetlinks);
      //var xdistance = ((toX - fromX) / 60) / ((width - offsetlinks) / (mmwidth * 1.5));
      var xrdistance = 1;
      var steps = [2, 4, 5, 10, 15, 30, 60];
      var runnn = xdistance >= 1;
      var i = 0;
      while (runnn) {
        var next = 0;
        if (i < 7) {
          next = steps[i];
          i++;
        } else {
          next = xrdistance + 60;
        }
        xrdistance = next;
        if (next > xdistance) {
          runnn = false;
        }
      }
      xrdistance *= 60;
      for (var i = fromX + (xrdistance - (fromX % xrdistance)); i < toX; i += xrdistance) {
        ctx.fillText(t.calcX(i), getX(i) - Math.round(mmwidth / 2), height - (offsetunten / 3.75));
      }
      ctx.fillStyle = t.background;
      ctx.font = (t.fontValue*zoomsize).toString()+t.font;
      var dateee = t.calcX(fromX, true);
      var dateeemeasure = ctx.measureText(dateee);
      var dateeeheight = (dateeemeasure.actualBoundingBoxAscent + dateeemeasure.actualBoundingBoxDescent) * 2;
      ctx.clearRect(offsetlinks + 3, height - offsetunten - dateeeheight - 3, dateeemeasure.width, dateeeheight);
      ctx.fillRect(offsetlinks + 3, height - offsetunten - dateeeheight - 3, dateeemeasure.width, dateeeheight);
      ctx.fillStyle = t.fontcolor;
      ctx.fillText(dateee, offsetlinks + 3, height - offsetunten - (dateeeheight / 4) - 3);

      if (cursorline != null && cursorline.x > fromX && cursorline.x < toX) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = t.popuplinecolour;
        ctx.beginPath();
        ctx.moveTo(getX(cursorline.x), 0);
        ctx.lineTo(getX(cursorline.x), height - offsetunten);
        ctx.stroke();

        let fordata = Object.keys(cursorline.y);
        for(let i=0;i<fordata.length;i++){
          let item = fordata[i];
          if (showv.indexOf(item) != -1) {
            ctx.fillStyle = colors[item];
            ctx.beginPath();
            ctx.arc(getX(cursorline.x), getY(cursorline.y[item]), 5, 0, 2 * Math.PI);
            ctx.fill();

          }
        }
      }
    }
  }
  window.requestAnimationFrame(loop);

  function setData(d, liness) { //[{x:1231,y:{"t1":123,"t2":12312}}]       ;  {"t1":"Temperatursensor 1","t2":"Temperatursensor 2"}
    rawdata = d;
    lines = liness;
    lines.sort(function(a, b) {
      return a.x - b.x;
    })
    calc();
    showAll();
  }

  function show(d = showv, from = fromX, to = toX) { // ["t1","t2"]
    fromX = from;
    toX = to;
    showv = d;
    draw = true;
  }

  function showAll() {
    var keys = [];
    minX = Infinity;
    maxX = -Infinity;
    data.forEach((item, i) => {
      if (item.x < minX) {
        minX = item.x;
      }
      if (item.x > maxX) {
        maxX = item.x;
      }
      Object.keys(item.y).forEach((iii, ii) => {
        if (keys.indexOf(iii) == -1) {
          keys.push(iii);
        }
      });
    });
    //colors
    show(keys, minX, maxX);
  }


  function calc() {
    rawdata.sort(function(a, b) {
      return a.x - b.x;
    });
    data = [];
    minX = Infinity;
    maxX = -Infinity;
    var namekeys = [];
    //rawdata.forEach((item, i) => {
    for(var i = 0; i < rawdata.length;i++){
      let item = rawdata[i];
      var yN = {};
      if (item.x < minX) {
        minX = item.x;
      }
      if (item.x > maxX) {
        maxX = item.x;
      }
      //Object.keys(item.y).forEach((tt, ii) => {
      let fordata = Object.keys(item.y);
      for(var ii = 0; ii < fordata.length;ii++){
        let tt = fordata[ii];
        yN[tt] = t.calcY(item.x, tt, item.y[tt]);
        if (namekeys.indexOf(tt) == -1) {
          namekeys.push(tt);
        }
      }//);
      data.push({
        "xN": t.calcX(item.x),
        "y": yN,
        "x": item.x
      });
      /*Object.keys(item.y).forEach((iii, ii) => {
        if (namekeys.indexOf(iii) == -1) {
          namekeys.push(iii);
        }
      });*/
    }//);
    lines.forEach((item, i) => {
      linecolors[item.nid] = t.linecolor(item.nid, item);
    });

    var seed = 0;

    //var namekeys = Object.keys(names);
    namekeys.sort(function(a, b) {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });
    namekeys.forEach((item, i) => {
      names[item] = t.lineNames(item);
      for (var i = 0; i < item.length; i++) {
        seed += item[i].charCodeAt(0);
      }
    });
    rand.seed(seed);
    var lastcolors = [];
    namekeys.forEach((item, i) => {
      colors[item] = t.graphcolor(item, rand,lastcolors);
    });
  }

  function onresize() {
    draw = true;
  }

  function showpopup(x, y) {
    if(data.length==0){
      return;
    }
    var pos = ((x * PIXEL_RATIO() - offsetlinks) / (width - offsetlinks)) * (toX - fromX) + fromX;
    if (pos < fromX || pos > toX) {
      closepopup();
      return false;
    }
    var showobj = (function() {
      for (var i = 0; i < data.length; i++) {
        if (i + 1 >= data.length || data[i + 1].x > pos) {
          return data[i];
        }
      }
      return data[0];
    })();
    popup.style.background = t.popupbackground;
    popup.style.boxShadow = "0px 0px 5px 1px " + t.popupshadow;
    popup.style.fontcolor = this.popuptextcolor;
    var diditpos = false;
    if (popup.style.display == "none") {
      popup.style.left = 5 + (element.offsetLeft + (((showobj.x - fromX) / (toX - fromX) * (width - offsetlinks)) + offsetlinks) / PIXEL_RATIO()) + "px";
      popup.style.top = (element.offsetTop + y) + "px";
      diditpos = true;
    }
    cursorline = showobj;
    window.setTimeout(function() {
      popup.style.display = "";
      window.setTimeout(function() {
        popup.style.opacity = 1;
        show();
      }, 20);
    }, 10);
    if (!diditpos) {
      popup.style.left = 5 + (element.offsetLeft + (((showobj.x - fromX) / (toX - fromX) * (width - offsetlinks)) + offsetlinks) / PIXEL_RATIO()) + "px";
      popup.style.top = (element.offsetTop + y) + "px";
    }
    popup.innerHTML = "";
    popup.innerHTML += `<h5>${t.calcX(showobj.x,true)}</h5>`;
    Object.keys(showobj.y).forEach((item, i) => {
      if (showv.indexOf(item) != -1) {
        popup.innerHTML += `<label style="color:${colors[item]||"#000"};">${names[item]} (${item}): ${(Math.round((showobj.y[item])*100)/100)} ${t.unit(item)}</label><br>`;
      }
    });
    function checkk() {
      var ot = parseInt(popup.style.top)-element.offsetTop;
      var ol = parseInt(popup.style.left)-element.offsetLeft;
      var or = c.offsetWidth - popup.offsetWidth - ol;
      var ob = c.offsetHeight - popup.offsetHeight - ot;
      var gooon = false;
      if (or < 0 && ol > -or) {
        popup.style.left = (parseInt(popup.style.left) + or - 5) + "px";
        gooon = true;
      }
      if (ob < 0 && ot > -ob) {
        popup.style.top = (parseInt(popup.style.top) + ob - 5) + "px";
        gooon = true;
      }
      if (gooon) {
        window.setTimeout(checkk, 100);
      }
    }
    window.setTimeout(checkk, 100);
    window.requestAnimationFrame(checkk);
  }

  function closepopup() {
    popup.style.opacity = 0;
    cursorline = null;
    window.setTimeout(function() {
      popup.style.display = "none";
      show();
    }, 150);

  }

  function zoom(x, r) {
    var zmove = /*Math.round*/ ((toX - fromX) * (r) / ((width - offsetlinks) / PIXEL_RATIO()));
    if (zmove < 0 && toX - fromX < 60 * 10) {
      return;
    }
    var where = (x*PIXEL_RATIO() - offsetlinks) / (width - offsetlinks);
    fromX -= zmove * where;
    toX += zmove * (1 - where);
    if (fromX < minX) {
      fromX = minX;
    }
    if (toX > maxX) {
      toX = maxX;
    }
    show();
  }

  function drag(x, lx) {
    var move = /*Math.round*/ ((toX - fromX) * (x - lx) / ((width - offsetlinks) / PIXEL_RATIO()));
    fromX -= move;
    toX -= move;
    if (fromX < minX) {
      toX += minX - fromX;
      fromX += minX - fromX;
    }
    if (toX > maxX) {
      fromX -= toX - maxX;
      toX -= toX - maxX;
    }
    show();
  }

  this.toCSV = function(sepperator,komma){
    var out = sepperator+"Unix Timestamp"+sepperator;
    var keys = Object.keys(names);
    keys.forEach(item => {
      out+=names[item]+sepperator;
    });
    out = out.substr(0,out.length-1);
    out+=""+"\n";
    data.forEach(function(item){
      out+=item.xN+sepperator;
      out+=item.x+sepperator;
      keys.forEach(item2 => {
        if(item.y[item2]){
          out+=(item.y[item2]).toString().replace(".",komma);
        }
        out+=sepperator;
      });
      out = out.substr(0,out.length-1);
      out+=""+"\n";
    });
    out = out.substr(0,out.length-1);
    return out;
  };

  this.colors = function() {
    return colors;
  };
  this.clear = function(){
    ctx.clearRect(0, 0, width, height);
    draw = false;
    rawdata = [];
    data = [];
    showv = [];
    fromX = 0;
    toX = 0;
    max = 0;
    min = 0;
    maxX = 0;
    minX = 0;
    offsetunten = 0;
    offsetlinks = 0;
    width = 0;
    height = 0;
    colors = {};
    names = {};
    lines = [];
    linecolors = {};
    cursorline = null;

  };
  this.getColors = function(){
    return Object.assign([],colors);
  };
  this.getAllKeys = function(){
    return Object.keys(names);
  };
  this.getVisibleKeys = function(){
    return Object.assign([],showv);
  };
  this.showpopup = showpopup;
  this.closepopup = closepopup;
  this.zoom = zoom;
  this.drag = drag;
  this.setData = setData;
  this.show = show;
  this.onresize = onresize;
  this.recalc = calc;
  this.showAll = showAll;
  this.background = "#ffffff";
  this.mainline = "#212121";//
  this.minorline = "#BDBDBD";
  this.fontcolor = "#000000";
  this.fontValue = 20;
  this.font = "px Arial";
  this.popupbackground = "#eeeeee";
  this.popupshadow = "#555555";
  this.popuplinecolour = "#000000";
  this.popuptextcolor = "#000000";
  this.nodatastring = "Keine Daten verfügbar!"
  this.dark = false;
  this.unit = function(id){
    return "";
  };
  this.lineNames = function(id){
    return id;
  };
  this.calcX = function(x /*121231*/ , full = false) { //may overwrite; gets called
    return x.toString();
  };
  this.calcY = function(x /*to now where*/ , yt /*e.g.: t1*/ , y) { //may overwrite; gets called for every value to maychange values (e.g.: K° -> C°)
    return y;
  };
  this.linecolor = function(id) {
    return "#ff0000";
  };
  this.graphcolor = function(id, rand,last) {
    var r=0,g=0,b=0,tries=0;

    function closest(r,g,b){
      var min = Infinity;
      for(var i = 0; i < last.length;i++){
        var nowdis = Math.pow(Math.pow(r-last[i][0],4)+Math.pow(g-last[i][1],4)+Math.pow(b-last[i][2],4),0.5);
        if(nowdis<min){
          min = nowdis;
        }
      }
      return min;
    }
    do{
      r = rand.rand(t.dark ? 150 : 0, t.dark ? 255 : 100, true);
      g = rand.rand(t.dark ? 150 : 0, t.dark ? 255 : 100, true);
      b = rand.rand(t.dark ? 150 : 0, t.dark ? 255 : 100, true);
      tries++;
    }while(closest(r,g,b)<400&&tries<20)

    last.push([r,g,b]);

    var ro = r.toString(16);
    var go = g.toString(16);
    var bo = b.toString(16);
    if (ro.length == 1) {
      ro = "0" + ro;
    }
    if (go.length == 1) {
      go = "0" + go;
    }
    if (bo.length == 1) {
      bo = "0" + bo;
    }
    return "#" + ro + go + bo;
  }
  this.test = function(){
    console.log(c,data,draw);
  }
}
