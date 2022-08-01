const nickelledURL = "https://help.nickelled.com/"
document.getElementById("submit").addEventListener("click", function (ev) {
  ev.preventDefault()
  const userName = document.getElementById("user").value;
  localStorage.user = userName
  document.getElementsByClassName("form")[0].style.display = "none"
  document.getElementsByClassName("login-page")[0].style.display = "block"
  document.getElementById("user-hello").innerHTML = `Hello ${localStorage.user}`
});


document.getElementById("logout").addEventListener("click", function (ev) {
  ev.preventDefault()
  localStorage.removeItem("userName");
  document.getElementsByClassName("form")[0].style.display = "block"
  document.getElementsByClassName("login-page")[0].style.display = "none"
  document.getElementById("overlay").innerHTML = ""
});

onInactive(6000, function () {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    tabURL = tabs[0].url;

    if (!tabURL.includes(nickelledURL)) {
      if (document.getElementsByClassName("login-page")[0].style.display === "block") {

        document.getElementById("overlay").innerHTML = `<div class="overlay">
  <div class="modal__locked">
    <div class="modal-body">
      <center>
        <strong>Are you lost ${localStorage.user}?</strong>
      </center>
    </div>
    <div class="modal-buttons">
      <button class="btn btn-footer btn-white" id="no">No</button>
      <button class="btn btn-footer btn-purple" id="yes">Yes</button>
    </div>
  </div>
</div>`;
        document.getElementById("no").addEventListener("click", function (ev) {
          ev.preventDefault()
          document.getElementById("overlay").innerHTML = ""
        });

        document.getElementById("yes").addEventListener("click", function (ev) {
          ev.preventDefault()
          chrome.tabs.update({
            url: nickelledURL
          });
          document.getElementById("overlay").innerHTML = ""

        });
      }
    }
  });
});

function onInactive(milliseconds, callBackFunction) {

  var wait = setTimeout(callBackFunction, milliseconds);

  document.onmousemove = document.mousedown = document.mouseup = document.onkeydown = document.onkeyup = document.focus = function () {
    clearTimeout(wait);
    wait = setTimeout(callBackFunction, milliseconds);

  };
}

