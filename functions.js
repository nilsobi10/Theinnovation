function scrollUp() {
  window.scrollBy({
    top: -100
  });
};

scrollUp();

var loading = 0;

function startload() {
  if (loading == 0) {
    document.querySelector(".loading").style.display = "";
    window.setTimeout(function() {
      document.querySelector(".loading").style.opacity = 1;
    }, 10);
  }
  loading++;
}

function stopload() {
  loading--;
  if (loading <= 0) {
    document.querySelector(".loading").style.opacity = 0;
    window.setTimeout(function() {
      document.querySelector(".loading").style.display = "none";
    }, 150);
    loading = 0;
  }
}

function forcestoploading() {
  loading = 0;
  stopload();
}
