import React from "react";
import { GuestsProvider } from "./containers/GuestsContext";
import GuestsRegistry from "./containers/GuestsRegistry";

const App = () => (
  <GuestsProvider>
    <GuestsRegistry />
  </GuestsProvider>
);

export default App;
