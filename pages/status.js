var statuspage = document.querySelector("#status");

function ini_status(){
    startload();
    fetch("https://theinnovation-db.gewaechshaus.vercel.app/api/getData.js", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: ""
      })
      .then(text => text.json())
      .then(d => {
        stopload();
        statuspage.innerHTML = JSON.stringify(d);
      })
      .catch(error => {
        stopload(); 
    })
}
