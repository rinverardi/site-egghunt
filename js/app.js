let codes = {};
let timer;

function addEgg() {
  let sectionElement = document.getElementById("eggs");

  let eggElement = lookup(sectionElement, "template").cloneNode(true);

  eggElement.addEventListener("keyup", (event) => {
    updateEgg(eggElement);
  });

  eggElement.classList.remove("template");

  let buttonElement = lookup(sectionElement, "button");

  buttonElement.parentNode.insertBefore(eggElement, buttonElement);

  lookup(eggElement, "description").focus();
  lookup(eggElement, "tag").value = tag();

  updateEgg(eggElement);
}

function addHunter() {
  let sectionElement = document.getElementById("hunters");

  let hunterElement = lookup(sectionElement, "template").cloneNode(true);

  hunterElement.addEventListener("keyup", (event) => {
    updateHunter(hunterElement);
  });

  hunterElement.classList.remove("template");

  let buttonElement = lookup(sectionElement, "button");

  buttonElement.parentNode.insertBefore(hunterElement, buttonElement);

  lookup(hunterElement, "description").focus();
  lookup(hunterElement, "tag").value = tag();

  updateHunter(hunterElement);
}

function code(codeElement, data) {
  let tag = lookup(codeElement.parentNode, "tag").value;

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

  lookup(sectionElement, "description").addEventListener("keyup", (event) => {
    updateCompetition();
  });

  lookup(sectionElement, "tag").value = tag()

  updateCompetition();
}

function initEggs() {
  let sectionElement = document.getElementById("eggs");

  lookup(sectionElement, "button").addEventListener("click", (event) => {
    addEgg();
  });
}

function initHunters() {
  let sectionElement = document.getElementById("hunters");

  lookup(sectionElement, "button").addEventListener("click", (event) => {
    addHunter();
  });
}

function initNavigation() {
  let navElement = document.getElementsByTagName("nav")[0];

  ["competition", "eggs", "hunters"].forEach((section) => {
    lookup(navElement, section).addEventListener("click", (event) => {
      navigate(section);
    });
  });
}

function lookup(element, key) {
  return element.getElementsByClassName(key)[0];
}

function navigate(section) {
  let navElement = document.getElementsByTagName("nav")[0];

  ["competition", "eggs", "hunters"].forEach((section) => {
    lookup(navElement, section).classList.remove("current");
    document.getElementById(section).classList.add("hidden");
  });

  lookup(navElement, section).classList.add("current");
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
    "cd": lookup(competitionElement, "description").value,
    "ct": lookup(competitionElement, "tag").value
  });

  code(lookup(competitionElement, "code"), data);

  debounce(() => {
    updateEggs();
    updateHunters();
  });
}

function updateEgg(eggElement) {
  let competitionElement = document.getElementById("competition");

  let data = JSON.stringify({
    "cd": lookup(competitionElement, "description").value,
    "ct": lookup(competitionElement, "tag").value,
    "ed": lookup(eggElement, "description").value,
    "et": lookup(eggElement, "tag").value
  });

  code(lookup(eggElement, "code"), data);
}

function updateEggs() {
  let eggsElement = document.getElementById("eggs");

  Array.from(eggsElement.getElementsByClassName("code")).forEach((codeElement) => {
    let eggElement = codeElement.parentNode;

    if (!eggElement.classList.contains("template")) {
      updateEgg(eggElement);
    }
  });
}

function updateHunter(hunterElement) {
  let competitionElement = document.getElementById("competition");

  let data = JSON.stringify({
    "cd": lookup(competitionElement, "description").value,
    "ct": lookup(competitionElement, "tag").value,
    "hd": lookup(hunterElement, "description").value,
    "ht": lookup(hunterElement, "tag").value
  });

  code(lookup(hunterElement, "code"), data);
}

function updateHunters() {
  let huntersElement = document.getElementById("hunters");

  Array.from(huntersElement.getElementsByClassName("code")).forEach((codeElement) => {
    let hunterElement = codeElement.parentNode;

    if (!hunterElement.classList.contains("template")) {
      updateHunter(hunterElement);
    }
  });
}

window.addEventListener("load", (event) => {
  initCompetition();
  initEggs();
  initHunters();
  initNavigation();
});
