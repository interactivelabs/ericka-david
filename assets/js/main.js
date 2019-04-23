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
  const gliderElement = document.getElementById("glider");
  const menuButton = document.getElementById("menu-button");
  const closeButton = document.getElementById("close-button");
  const links = document.getElementsByClassName("link");
  if (header) {
    new Waypoint({
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
  }
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
});
