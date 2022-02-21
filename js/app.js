var codes = {};

function addEgg() {
  var button = document.getElementById("add-egg")

  var clone = document.getElementById("egg-template").cloneNode(true);

  clone.addEventListener("keyup", (event) => {
    updateEgg(clone);
  });

  clone.classList.remove("template");

  button.parentNode.insertBefore(clone, button);

  clone.childNodes[1].focus()
}

function addHunter() {
  console.log("XXX");
}

function code(element, data) {
  var code = codes[element];

  if (code == null) {
    var code = new QRCode(element, {height: 100, width: 100});

    codes[element] = code;
  }

  code.makeCode(data);
}

function initCompetition() {
  var element = document.getElementById("competition");

  lookup(element, "description").addEventListener("keyup", (event) => {
    updateCompetition();
  });

  document.getElementById("competition-link").addEventListener("click", (event) => {
    navigate("competition");

    return false;
  });

  updateCompetition();
}

function initEggs() {
  document.getElementById("add-egg").addEventListener("click", (event) => {
    addEgg();
  });

  document.getElementById("eggs-link").addEventListener("click", (event) => {
    navigate("eggs");

    return false;
  });
}

function initHunters() {
  document.getElementById("add-hunter").addEventListener("click", (event) => {
    addHunter();
  });

  document.getElementById("hunters-link").addEventListener("click", (event) => {
    navigate("hunters");

    return false;
  });
}

function lookup(element, key) {
  return element.getElementsByClassName(key)[0]
}

function navigate(id) {
  ["competition", "eggs", "hunters"].forEach((section) => {
    document.getElementById(section).classList.remove("current");
    document.getElementById(section + "-link").classList.remove("current");
  });

  document.getElementById(id).classList.add("current");
  document.getElementById(id + "-link").classList.add("current");
}

function updateCompetition() {
  var element = document.getElementById("competition");

  var data = JSON.stringify({
    'd': lookup(element, "description").value,
    'i': lookup(element, "id").value,
    't': 'competition'
  });

  code(lookup(element, "code"), data);
}

function updateEgg(element) {
  console.log(element);
}

window.addEventListener("load", (event) => {
  initCompetition();
  initEggs();
  initHunters();
});
