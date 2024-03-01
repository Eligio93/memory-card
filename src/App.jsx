import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// require('dotenv').config();
let apiKey=import.meta.env.VITE_UNSPLASH_API_KEY;
  //  "R9ZvwDB7zyok9T-goWw_pi59D9NoBkhD6EGF1txiyFI";
let cities = [
  "Venezia",
  "Roma",
  "Napoli",
  "Firenze",
  "Cinque_Terre",
  "Bari",
  "Milano",
  "Parma",
  "Alberobello",
  "Catania",
];
let urls = [];
cities.forEach((city) => {
  urls.push(
    `https://api.unsplash.com/search/photos/?client_id=${apiKey}&page=1&per_page=1&query=${city}&orientation=landscape`
  );
});


let requests = urls.map((url) =>
  fetch(url, {
    mode: "cors",
  }).then(response=>response.json())
);
Promise.all(requests)
  .then((responses) => responses.forEach(response=>console.log(response.results[0].urls.full)))

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
