window.onload = init;

function init(){
var knopf = document.getElementById("knopfSpeichern");
knopf.onclick = knopfDruck;}

function knopfDruck(){
  var textEingabefeld = document.getElementById("artikelTextInput");
  var artikelEingabe = textEingabefeld.value;
  if (artikelEingabe == ""){
  alert("Franka gib doch bitte einen Artikel ein!");
  }else{
    var li = document.createElement("li");
    li.innerHTML = artikelEingabe;
    var ul = document.getElementById("einkauf");
    ul.appendChild(li);
  }
  }

