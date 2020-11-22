var artikelAnzahl=localStorage.length;
while(artikelAnzahl>0){
var li=document.createElement("li");
li.innerHTML=localStorage.key(artikelAnzahl-1);
var ul= document.getElementById("einkauf");
ul.appendChild(li);
artikelAnzahl=artikelAnzahl-1;
}
