let plants = ['Kartoffel', 'Gurken', 'Erdnüsse', 'Cocktailtomaten', 'Rispemtomaten'];
var infos = [];

function addplant(temp) {
  plants[plants.length] = temp;
};

function ini_plant() {
  startload();
  plants.sort();
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
    info.style.display = "none";
    pflanzen.innerHTML = plants[i];
    weitereInfos.onclick = () => {
      if (info.style.display === 'none') {
        info.style.display = 'block';
      } else {
        info.style.display = 'none'
      }
    };
    pflanzen.appendChild(info);
    box.appendChild(weitereInfos);
    box.appendChild(pflanzen);
    stopload();
  };
}
