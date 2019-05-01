import React from "react";
import { render } from "react-dom";
import App from "./guests-app/App";

window.addEventListener("load", () => {
  const container = document.getElementById("guest-app");
  render(<App />, container);
});
