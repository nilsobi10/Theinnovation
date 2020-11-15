//wird nicht dauerhaft gespeichert:

function neuerEintrag(){
var newDiv=document.createElement("ul")
var newArt =prompt("Was möchtest du hinzufügen?");
var newContent=document.createTextNode(newArt)
newDiv.appendChild(newContent);

// füge das neu erstellte Element und seinen Inhalt ins DOM ein
var currentDiv = document.getElementById("ul1");           
  document.body.insertBefore(newDiv, currentDiv); 
};
