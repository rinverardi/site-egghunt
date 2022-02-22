var codes = {};

function addEgg() {
  var sectionElement = document.getElementById("eggs");

  var eggElement = lookup(sectionElement, "template").cloneNode(true);

  eggElement.addEventListener("keyup", (event) => {
    updateEgg(eggElement);
  });

  eggElement.classList.remove("template");

  var buttonElement = lookup(sectionElement, "button");

  buttonElement.parentNode.insertBefore(eggElement, buttonElement);

  lookup(eggElement, "description").focus();
  lookup(eggElement, "tag").value = tag();

  updateEgg(eggElement);
}

function addHunter() {
  var sectionElement = document.getElementById("hunters");

  var hunterElement = lookup(sectionElement, "template").cloneNode(true);

  hunterElement.addEventListener("keyup", (event) => {
    updateHunter(hunterElement);
  });

  hunterElement.classList.remove("template");

  var buttonElement = lookup(sectionElement, "button");

  buttonElement.parentNode.insertBefore(hunterElement, buttonElement);

  lookup(hunterElement, "description").focus();
  lookup(hunterElement, "tag").value = tag();

  updateHunter(hunterElement);
}

function code(codeElement, data) {
  if (codeElement.id == null || codeElement.id == "") {
    codeElement.id = tag();
  }

  var code = codes[codeElement.id];

  if (code == null) {
    var code = new QRCode(codeElement, {height: 100, width: 100});

    codes[codeElement.id] = code;
  }

  code.makeCode(data);

  console.log(codes);
}

function initCompetition() {
  var sectionElement = document.getElementById("competition");

  lookup(sectionElement, "description").addEventListener("keyup", (event) => {
    updateCompetition();
  });

  lookup(sectionElement, "tag").value = tag()

  updateCompetition();
}

function initEggs() {
  var sectionElement = document.getElementById("eggs");

  lookup(sectionElement, "button").addEventListener("click", (event) => {
    addEgg();
  });
}

function initHunters() {
  var sectionElement = document.getElementById("hunters");

  lookup(sectionElement, "button").addEventListener("click", (event) => {
    addHunter();
  });
}

function initNavigation() {
  var nav = document.getElementsByTagName("nav")[0];

  ["competition", "eggs", "hunters"].forEach((section) => {
    lookup(nav, section).addEventListener("click", (event) => {
      navigate(section);
    });
  });
}

function lookup(element, key) {
  return element.getElementsByClassName(key)[0];
}

function navigate(section) {
  var nav = document.getElementsByTagName("nav")[0];

  ["competition", "eggs", "hunters"].forEach((section) => {
    lookup(nav, section).classList.remove("current");
    document.getElementById(section).classList.add("hidden");
  });

  lookup(nav, section).classList.add("current");
  document.getElementById(section).classList.remove("hidden");
}

function tag() {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let tag = ""

  while (tag.length < 6) {
    tag += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return tag
}

function updateCompetition() {
  var competitionElement = document.getElementById("competition");

  var data = JSON.stringify({
    "cd": lookup(competitionElement, "description").value,
    "ct": lookup(competitionElement, "tag").value
  });

  code(lookup(competitionElement, "code"), data);
}

function updateEgg(eggElement) {
  var competitionElement = document.getElementById("competition");

  var data = JSON.stringify({
    "cd": lookup(competitionElement, "description").value,
    "ct": lookup(competitionElement, "tag").value,
    "ed": lookup(eggElement, "description").value,
    "et": lookup(eggElement, "tag").value
  });

  code(lookup(eggElement, "code"), data);
}

function updateHunter(hunterElement) {
  var competitionElement = document.getElementById("competition");

  var data = JSON.stringify({
    "cd": lookup(competitionElement, "description").value,
    "ct": lookup(competitionElement, "tag").value,
    "hd": lookup(hunterElement, "description").value,
    "ht": lookup(hunterElement, "tag").value
  });

  code(lookup(hunterElement, "code"), data);
}

window.addEventListener("load", (event) => {
  initCompetition();
  initEggs();
  initHunters();
  initNavigation();
});
