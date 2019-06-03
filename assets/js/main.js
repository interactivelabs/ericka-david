import Glider from "./glider";
import differenceInDays from "date-fns/difference_in_days";
import differenceInHours from "date-fns/difference_in_hours";
import differenceInMinutes from "date-fns/difference_in_minutes";
import addDays from "date-fns/add_days";
import addHours from "date-fns/add_hours";

require("waypoints/lib/noframework.waypoints");

const WEDDING_DATE = new Date(2019, 7, 20, 18, 0);

const menuInit = us => {
  const header = document.getElementById("header");
  const links = document.getElementsByClassName("link");
  const menuButton = document.getElementById("menu-button");
  const closeButton = document.getElementById("close-button");
  menuButton.addEventListener("click", () => {
    menuButton.classList.remove("closed");
    header.classList.remove("closed");
  });
  const handleClose = () => {
    menuButton.classList.add("closed");
    header.classList.add("closed");
  };
  closeButton.addEventListener("click", handleClose);
  for (let idx = 0; idx < links.length; idx++) {
    const link = links[idx];
    link.addEventListener("click", handleClose);
  }
  new Waypoint({
    element: header,
    handler: dir => {
      if (dir === "down") {
        if (us) {
          us.classList.add("sticky");
        }
        return header.classList.add("sticky");
      }
      if (us) {
        us.classList.remove("sticky");
      }
      return header.classList.remove("sticky");
    }
  });
};

const mainSiteInit = () => {
  const gliderElement = document.getElementById("glider");
  const etlDays = document.getElementById("etl-days");
  const etlHours = document.getElementById("etl-hours");
  const etlMinutes = document.getElementById("etl-minutes");
  const scrollReveal = new ScrollReveal();
  scrollReveal.reveal(".column-content", {
    delay: 300,
    distance: "100px",
    interval: 100
  });
  if (gliderElement) {
    new Glider(gliderElement, {
      dots: ".dots",
      rewind: true,
      arrows: {
        prev: ".glider-prev",
        next: ".glider-next"
      }
    });
  }
  const updateETL = () => {
    let currentDate = new Date();
    const daysToWedding = differenceInDays(WEDDING_DATE, currentDate);
    currentDate = addDays(currentDate, daysToWedding);
    const hoursToWedding = differenceInHours(WEDDING_DATE, currentDate);
    currentDate = addHours(currentDate, hoursToWedding);
    const minutesToWedding = differenceInMinutes(WEDDING_DATE, currentDate);
    etlDays.innerHTML = daysToWedding;
    etlHours.innerHTML = hoursToWedding;
    etlMinutes.innerHTML = minutesToWedding;
  };
  updateETL();
  setInterval(() => updateETL, 1000);
};

const searchGuest = async guest =>
  await fetch(`/api/guests?name=${guest}`)
    .then(r => r.json())
    .then(data => data);

const rsvpInit = () => {
  let guests = [];
  const rsvpForm = document.getElementById("rsvp-form");
  const codeInput = document.getElementById("code");
  const nameInput = document.getElementById("name");
  const selectGuest = code => {
    const info = document.getElementById("info");
    const name = document.getElementById("disp-name");
    const familyname = document.getElementById("disp-familyname");
    const guest = guests.filter(g => (g.code = code))[0];
    info.classList.remove("hide");
    name.innerHTML = `${guest.firstname} ${guest.lastname}`;
    familyname.innerHTML = guest.familyname;
  };
  const awesomplete = new Awesomplete(nameInput, {
    replace: suggestion => {
      codeInput.value = suggestion.value;
      nameInput.value = suggestion.label;
      selectGuest(suggestion.value);
    }
  });
  nameInput.addEventListener("keyup", async () => {
    guests = await searchGuest(nameInput.value);
    if (guests && guests.length) {
      const list = guests.map(g => ({
        label: `${g.firstname} ${g.lastname}`,
        value: g.code
      }));
      awesomplete.list = list;
    }
  });
  rsvpForm.addEventListener("submit", evt => {
    if (!codeInput.value) {
      evt.preventDefault();
    }
  });
};

window.addEventListener("load", () => {
  const us = document.getElementById("us");
  const rsvpForm = document.getElementById("rsvp-page");
  menuInit();
  if (us) {
    mainSiteInit(us);
  }
  if (rsvpForm) {
    rsvpInit(rsvpForm);
  }
});
