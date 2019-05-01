import Glider from "./glider";
// import ScrollReveal from "ScrollReveal";
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

const handleConfirm = () => {};

const confirm = guestId =>
  fetch("/api/guest/confirm")
    .then(r => r.json())
    .then(data => handleConfirm(data));

const getGuestLi = guest => {
  const item = new li();
  const link = new a();
  link.innerHTML = guest.name;
  link.classList.add("guest-link");
  link.addEventListener("click", () => confirm(guest.id));
  item.append(link);
  item.classList.add("guest-item");
  return item;
};

const updateGuest = data => {
  const guestsList = document.getElementById("guests-list");
  const { guests } = data;
  const items = guests.map(g => getGuestLi(g));
  guestsList.append(items);
};

const searchGuest = guest =>
  fetch(`/api/guest/${guest}`)
    .then(r => r.json())
    .then(data => updateGuest(data));

const rsvpInit = () => {
  const envelope = document.getElementById("envelope");
  envelope.addEventListener("click", () => {
    envelope.classList.remove("new");
    envelope.classList.add("open");
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
