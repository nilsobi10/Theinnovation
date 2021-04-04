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
    weitereInfos.onclick = () => openInfo(i);
    weitereInfos.id = "weitereInfos";
    weitereInfos.innerHTML = "weitere Infos";

    let pflanzen = document.createElement("div");
    let info = document.createElement("div");
    info.id = "Info"+1;
    info.innerHTML = "test";
    info.style.display = "none";
    pflanzen.innerHTML = plants[i];
    pflanzen.appendChild(info);
    box.appendChild(weitereInfos)
    box.appendChild(pflanzen);
    weitereInfos.onclick = () => {
      info.style.display = "block";
    }

    stopload();
  };
}
