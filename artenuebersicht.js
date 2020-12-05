window.onload = init;

function init(){
var knopf = document.getElementById("suchen");
knopf.onclick = knopfDruck;}

function knopfDruck(){
  var textEingabefeld = document.getElementById("artsuchen");
  var artikelEingabe = textEingabefeld.value;
console.log(artikelEingabe);
}