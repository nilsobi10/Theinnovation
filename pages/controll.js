var controllpage = document.querySelector("#controll");

  function ini_controll(){
      startload();
      fetch("https://theinnovation-db.gewaechshaus.vercel.app/api/addData.js", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: "ts=0"
        })
        .then(text => text.json())
        .then(d => {
          stopload();
          var data = d.data;

          controllpage.innerHTML = out;
        })
        .catch(error => {
          stopload();
          console.log(error);
      })
  };
