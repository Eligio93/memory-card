import { useState, useEffect } from "react";

import "./App.css";

// require('dotenv').config();

function App() {
  const [imgUrls, setImgUrls] = useState([]);
  //importing Api Key
  let apiKey = import.meta.env.VITE_UNSPLASH_API_KEY;
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        let urls = [];
        cities.forEach((city) => {
          urls.push(
            `https://api.unsplash.com/search/photos/?client_id=${apiKey}&page=1&per_page=1&query=${city}&orientation=landscape`
          );
        });
        let requests = urls.map((url) =>
          fetch(url, {
            mode: "cors",
          }).then((response) => response.json())
        );
        const responses = await Promise.all(requests);
        setImgUrls(responses.map((response) => response.results[0].urls.full));
        console.log(imgUrls);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return <></>;
}

export default App;
