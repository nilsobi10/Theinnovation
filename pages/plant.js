let plants = ['kartoffel', 'Gurken', 'Erdnüsse', 'Cocktailtomaten', 'Rispemtomaten'];


function addplant(temp) {
  plants[plants.length] = temp;
};

function sort() {
  plants.sort(function(l, u) {
    return l.toLowerCase().localeCompare(u.toLowerCase());
  });
};


function openInfo(i) {}

function ini_plant() {
  startload();
  let box = document.getElementById('box-Pflanzen');
  box.innerHTML = " "; //Box-Pflanzen wird geleert
  for (var i = 0; i < plants.length; i++) {
    let weitereInfos = document.createElement("div");
    weitereInfos.id = "weitereInfos";
    weitereInfos.innerHTML = "weitere Infos";

    let pflanzen = document.createElement("div");
    let info = document.createElement("div");
    info.id = "Info"+i;
    info.innerHTML = "test";
    info.style.display = "block";
    pflanzen.innerHTML = plants[i];
    weitereInfos.onclick = () => {
      if (info.style.display === 'none') {
        info.style.display = 'block';
      } else {
        info.style.display = 'none'
      }
    };
    pflanzen.appendChild(info);
    box.appendChild(weitereInfos)
    box.appendChild(pflanzen);

    stopload();
  };
}
