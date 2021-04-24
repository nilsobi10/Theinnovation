function Gesture(e, mousecatch = true) {
  var e = e;
  var t = this;
  var mousecatch = mousecatch;
  var finger1 = {
    X: 0,
    Y: 0,
    Xl: 0,
    Yl: 0,
    dX: 0,
    dY: 0,
    out: false,
    down: false,
    dir: "x"
  };
  var finger2 = {
    X: 0,
    Y: 0,
    Xl: 0,
    Yl: 0,
    dX: 0,
    dY: 0,
    out: false,
    down: false,
    dir: "x"
  };
  var lfingerdistance = 0;
  e.onwheel = function zoom(event) {
    var boundings = e.getBoundingClientRect();
    if (event.ctrlKey && t.onzoom(event.pageX - boundings.left, event.pageY - boundings.top, (event.deltaY > 0 ? 100 : -150) /** ( ? 3 : 1.5)*/ ) == true) {
      event.preventDefault();
    }
    //t.onzoom(event.pageX - e.offsetLeft, event.pageY - e.offsetTop, event.deltaY * (event.ctrlKey ? 3 : 1.5));
  };
  e.requestPointerLock = e.requestPointerLock || e.mozRequestPointerLock;
  document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
  document.addEventListener('pointerlockchange', lockChangeAlert, false);
  document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

  function lockChangeAlert() {
    if (document.pointerLockElement === e || document.mozPointerLockElement === e) {
      console.log('The pointer lock status is now locked');
      //document.addEventListener("mousemove", mouseUpdate, false);
    } else {
      console.log('The pointer lock status is now unlocked');
      //document.removeEventListener("mousemove", mouseUpdate, false);
    }
  }

  e.addEventListener("mousedown", function(event) {
    event.preventDefault();
    var boundings = e.getBoundingClientRect();
    var x = event.pageX - boundings.left;
    var y = event.pageY - boundings.top;
    finger1.down = true;
    finger1.out = false;
    finger1.Xl = x;
    finger1.Yl = y;
    finger1.dX = 0;
    finger1.dY = 0;
    finger1.X = x;
    finger1.Y = y;

  });
  e.addEventListener("mouseup", function(event) {
    event.preventDefault();
    var boundings = e.getBoundingClientRect();
    var x = event.pageX - boundings.left;
    var y = event.pageY - boundings.top;
    if (!finger1.out) {
      t.onclick(x, y);
    }
    finger1.down = false;
    finger1.out = false;
    finger1.Xl = x;
    finger1.Yl = y;
    if (mousecatch) {
      document.exitPointerLock();
    }
  });
  e.addEventListener("mousemove", function(event) {
    event.preventDefault();
    var x, y;
    if (mousecatch) {
      x = finger1.Xl + (event.movementX || event.mozMovementX || 0);
      y = finger1.Yl + (event.movementY || event.mozMovementY || 0);
    } else {
      var boundings = e.getBoundingClientRect();
      var x = event.pageX - boundings.left;
      var y = event.pageY - boundings.top;
    }
    if (finger1.down) {
      if (finger1.out) {
        t.ondrag(x, y, finger1.Xl, finger1.Yl, finger1.dir);
        finger1.dX = x - finger1.Xl;
        finger1.dY = y - finger1.Yl;
        finger1.Xl = x;
        finger1.Yl = y;
      } else {
        finger1.Xl = x;
        finger1.Yl = y;
        if (Math.pow((finger1.Xl - finger1.X) ** 2 + (finger1.Yl - finger1.Y) ** 2, 0.5) > 3) {
          if (mousecatch) {
            e.requestPointerLock();
          }
          finger1.dir = (Math.abs(finger1.Xl - finger1.X) > Math.abs(finger1.Yl - finger1.Y)) ? "x" : "y";
          finger1.out = true;
        }
      }

    }
  }, false);

  e.addEventListener("touchstart", function(event) {
    //event.preventDefault();
    var boundings = e.getBoundingClientRect();
    for (var i = 0; i < event.changedTouches.length; i++) {
      //event.changedTouches[i].identifier + " - " + event.changedTouches[i].pageX + " - " + event.changedTouches[i].pageX;
      if (event.changedTouches[i].identifier == 0) {
        var x = event.changedTouches[i].pageX - boundings.left;
        var y = event.changedTouches[i].pageY - boundings.top;
        finger1.down = true;
        finger1.out = false;
        finger1.Xl = x;
        finger1.Yl = y;
        finger1.X = x;
        finger1.Y = y;
      }
      if (event.changedTouches[i].identifier == 1) {
        var x = event.changedTouches[i].pageX - boundings.left;
        var y = event.changedTouches[i].pageY - boundings.top;
        finger2.down = true;
        finger2.out = false;
        finger2.Xl = x;
        finger2.Yl = y;
        finger2.X = x;
        finger2.Y = y;
      }
    }
    if (finger1.down && finger2.down) {
      event.preventDefault();
    }
  }, {
    passive: false
  });
  e.addEventListener("touchend", function(event) {

    for (var i = 0; i < event.changedTouches.length; i++) {
      if (event.changedTouches[i].identifier == 0) {
        var boundings = e.getBoundingClientRect();
        var x = event.changedTouches[i].pageX - boundings.left;
        var y = event.changedTouches[i].pageY - boundings.top;
        if (!finger1.out && !finger2.down) {
          t.onclick(x, y);
        }
        finger1.down = false;
        finger1.out = false;
        finger1.Xl = x;
        finger1.Yl = y;
      }
      if (event.changedTouches[i].identifier == 1) {
        var boundings = e.getBoundingClientRect();
        var x = event.changedTouches[i].pageX - boundings.left;
        var y = event.changedTouches[i].pageY - boundings.top;
        if (!finger2.out && !finger1.down) {
          t.onclick(x, y);
        }
        finger2.down = false;
        finger2.out = false;
        finger2.Xl = x;
        finger2.Yl = y;
      }
    }
    if (finger1.down && finger2.down) {
      event.preventDefault();
    }
  }, {
    passive: false
  });
  e.addEventListener("touchmove", function(event) {
    //event.preventDefault();
    var f1 = false;
    var f2 = false;
    for (var i = 0; i < event.changedTouches.length; i++) {
      if (event.changedTouches[i].identifier == 0) {
        f1 = true;
        var boundings = e.getBoundingClientRect();
        var x = event.changedTouches[i].pageX - boundings.left;
        var y = event.changedTouches[i].pageY - boundings.top;
        finger1.down = true;
        finger1.dX = x - finger1.Xl;
        finger1.dY = y - finger1.Yl;
        finger1.Xl = x;
        finger1.Yl = y;
      }
      if (event.changedTouches[i].identifier == 1) {
        f2 = true;
        var boundings = e.getBoundingClientRect();
        var x = event.changedTouches[i].pageX - boundings.left;
        var y = event.changedTouches[i].pageY - boundings.top;
        finger2.down = true;
        finger2.dX = x - finger2.Xl;
        finger2.dY = y - finger2.Yl;
        finger2.Xl = x;
        finger2.Yl = y;
      }
    }
    if (!f1) {
      finger1.dX = 0;
      finger1.dY = 0;
    }
    if (!f2) {
      finger2.dX = 0;
      finger2.dY = 0;
    }
    if (f1 + f2 == 0) {
      return;
    }
    if (finger1.down && !finger1.out && Math.pow((finger1.Xl - finger1.X) ** 2 + (finger1.Yl - finger1.Y) ** 2, 0.5) > 5) {
      if (finger1.out + finger2.out == 1) {
        lfingerdistance = Math.pow((finger1.Xl - finger2.Xl) ** 2 + (finger1.Yl - finger2.Yl) ** 2, 0.5);
      }
      finger1.dir = (Math.abs(finger1.Xl - finger1.X) > Math.abs(finger1.Yl - finger1.Y)) ? "x" : "y";
      finger1.out = true;
      finger1.dX = finger1.Xl - finger1.X;
      finger1.dY = finger1.Yl - finger1.Y;
    }
    if (finger2.down && !finger2.out && Math.pow((finger2.Xl - finger2.X) ** 2 + (finger2.Yl - finger2.Y) ** 2, 0.5) > 5) {
      if (finger1.out + finger2.out == 1) {
        lfingerdistance = Math.pow((finger1.Xl - finger2.Xl) ** 2 + (finger1.Yl - finger2.Yl) ** 2, 0.5);
      }
      finger2.dir = (Math.abs(finger2.Xl - finger2.X) > Math.abs(finger2.Yl - finger2.Y)) ? "x" : "y";
      finger2.out = true;
      finger2.dX = finger2.Xl - finger2.X;
      finger2.dY = finger2.Yl - finger2.Y;
    }
    if (finger1.out + finger2.out == 1) {
      var dX = finger1.dX * finger1.out + finger2.dX * finger2.out;
      var dY = finger1.dY * finger1.out + finger2.dY * finger2.out;
      var Xl = finger1.Xl * finger1.out + finger2.Xl * finger2.out;
      var Yl = finger1.Yl * finger1.out + finger2.Yl * finger2.out;
      t.ondrag(Xl, Yl, Xl - dX, Yl - dY, finger1.out ? finger1.dir : finger2.dir);
    }
    if (finger1.out + finger2.out == 2) {
      console.log("test");
      event.preventDefault();
      var dX = (finger1.dX + finger2.dX) / 2;
      var dY = (finger1.dY + finger2.dY) / 2;
      var Xl = (finger1.Xl + finger2.Xl) / 2;
      var Yl = (finger1.Yl + finger2.Yl) / 2;
      var distance = Math.pow((finger1.Xl - finger2.Xl) ** 2 + (finger1.Yl - finger2.Yl) ** 2, 0.5);
      t.ondrag(Xl, Yl, Xl - dX, Yl - dY, "xy");
      t.onzoom(Xl, Yl, -(distance - lfingerdistance) * 2);
      lfingerdistance = distance;
    }
  }, {
    passive: false
  });
  this.ondrag = function(x, y, lx, ly, dir) {
    //test.innerHTML="drag x:"+x+" y:"+y+" lx:"+lx+" ly:"+ly+"<br>";
  };
  this.onzoom = function(x, y, r) {
    //test.innerHTML="zoom x:"+x+" y:"+y+" r:"+r+"<br>";
  };
  this.onclick = function(x, y) {
    //test.innerHTML="click x:"+x+" y:"+y+"<br>";
  };
}
