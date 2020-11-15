function neuerEintrag(){
var newDiv=document.createElement("div")
var newContent=document.createTextNode("Hallo")
newDiv.appendChild(newContent);

var currentDiv = document.getElementById("div1"); 
  document.body.insertBefore(newDiv, currentDiv); 
};
