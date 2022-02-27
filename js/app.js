let codes = {};
let timer;

function addEgg() {
  let sectionElement = document.getElementById("eggs");

  let eggElement = lookupByClass(sectionElement, "template").cloneNode(true);

  eggElement.addEventListener("keyup", (event) => {
    updateEgg(eggElement);
  });

  eggElement.classList.remove("template");

  let buttonElement = lookupByTag(sectionElement, "button");

  buttonElement.parentNode.insertBefore(eggElement, buttonElement);

  lookupByClass(eggElement, "description").focus();
  lookupByClass(eggElement, "tag").value = tag();

  updateEgg(eggElement);
}

function addHunter() {
  let sectionElement = document.getElementById("hunters");

  let hunterElement = lookupByClass(sectionElement, "template").cloneNode(true);

  hunterElement.addEventListener("keyup", (event) => {
    updateHunter(hunterElement);
  });

  hunterElement.classList.remove("template");

  let buttonElement = lookupByTag(sectionElement, "button");

  buttonElement.parentNode.insertBefore(hunterElement, buttonElement);

  lookupByClass(hunterElement, "description").focus();
  lookupByClass(hunterElement, "tag").value = tag();

  updateHunter(hunterElement);
}

function code(codeElement, data) {
  let tag = lookupByClass(codeElement.parentNode, "tag").value;

  let code = codes[tag];

  if (code == null) {
    code = new QRCode(codeElement, {height: 100, width: 100});

    codes[tag] = code;
  }

  code.makeCode(data);
}

function debounce(action) {
  if (timer != null) {
    clearTimeout(timer);
  }

  timer = setTimeout(action, 1000);
}

function initCompetition() {
  let sectionElement = document.getElementById("competition");

  lookupByClass(sectionElement, "description").addEventListener("keyup", (event) => {
    updateCompetition();
  });

  lookupByClass(sectionElement, "tag").value = tag()

  updateCompetition();
}

function initEggs() {
  let sectionElement = document.getElementById("eggs");

  lookupByTag(sectionElement, "button").addEventListener("click", (event) => {
    addEgg();
  });
}

function initHunters() {
  let sectionElement = document.getElementById("hunters");

  lookupByTag(sectionElement, "button").addEventListener("click", (event) => {
    addHunter();
  });
}

function lookupByClass(element, className) {
  return element.getElementsByClassName(className)[0];
}

function lookupByTag(element, tagName) {
  return element.getElementsByTagName(tagName)[0];
}

function navigate(section) {
  let navElement = document.getElementsByTagName("nav")[0];

  ["competition", "eggs", "hunters"].forEach((section) => {
    lookupByClass(navElement, section).classList.remove("current");
    document.getElementById(section).classList.add("hidden");
  });

  lookupByClass(navElement, section).classList.add("current");
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
  let competitionElement = document.getElementById("competition");

  let data = JSON.stringify({
    "cd": lookupByClass(competitionElement, "description").value,
    "ct": lookupByClass(competitionElement, "tag").value
  });

  code(lookupByClass(competitionElement, "code"), data);

  debounce(() => {
    updateEggs();
    updateHunters();
  });
}

function updateEgg(eggElement) {
  let competitionElement = document.getElementById("competition");

  let data = JSON.stringify({
    "cd": lookupByClass(competitionElement, "description").value,
    "ct": lookupByClass(competitionElement, "tag").value,
    "ed": lookupByClass(eggElement, "description").value,
    "et": lookupByClass(eggElement, "tag").value
  });

  code(lookupByClass(eggElement, "code"), data);
}

function updateEggs() {
  let eggsElement = document.getElementById("eggs");

  Array.from(eggsElement.getElementsByClassName("code")).forEach((codeElement) => {
    let eggElement = codeElement.parentNode.parentNode.parentNode;

    if (!eggElement.classList.contains("template")) {
      updateEgg(eggElement);
    }
  });
}

function updateHunter(hunterElement) {
  let competitionElement = document.getElementById("competition");

  let data = JSON.stringify({
    "cd": lookupByClass(competitionElement, "description").value,
    "ct": lookupByClass(competitionElement, "tag").value,
    "hd": lookupByClass(hunterElement, "description").value,
    "ht": lookupByClass(hunterElement, "tag").value
  });

  code(lookupByClass(hunterElement, "code"), data);
}

function updateHunters() {
  let huntersElement = document.getElementById("hunters");

  Array.from(huntersElement.getElementsByClassName("code")).forEach((codeElement) => {
    let hunterElement = codeElement.parentNode.parentNode.parentNode;

    if (!hunterElement.classList.contains("template")) {
      updateHunter(hunterElement);
    }
  });
}

window.addEventListener("load", (event) => {
  initCompetition();
  initEggs();
  initHunters();
});
