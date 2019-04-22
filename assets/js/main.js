import Glider from "./glider";
import ScrollReveal from "ScrollReveal";
require("waypoints/lib/noframework.waypoints");

window.addEventListener("load", () => {
  const scrollReveal = new ScrollReveal();
  scrollReveal.reveal(".column-content", {
    delay: 300,
    distance: "100px",
    interval: 100
  });
  const us = document.getElementById("us");
  const header = document.getElementById("header");
  const waypoint = new Waypoint({
    element: header,
    handler: dir => {
      if (dir === "down") {
        us.classList.add("sticky");
        return header.classList.add("sticky");
      }
      us.classList.remove("sticky");
      return header.classList.remove("sticky");
    }
  });
  new Glider(document.getElementById("glider"), {
    dots: ".dots",
    rewind: true,
    arrows: {
      prev: ".glider-prev",
      next: ".glider-next"
    }
  });
});
