import { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [imgUrls, setImgUrls] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
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
        console.log(responses)
        setImgUrls(responses.map((response) => response.results[0].urls.small));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = function (e) {
    if (e.target.classList.contains("clicked")) {
      if (score > bestScore) {
        setBestScore(score);
      }
      setScore(0);
     console.log(document.querySelectorAll(".clicked"))
     document.querySelectorAll(".clicked").forEach(element=>{
      element.classList.remove("clicked")
     })
    } else {
      e.target.className = "clicked";
      setScore((score) => score + 1);
    }

    setImgUrls([...imgUrls.sort(() => Math.random() - 0.5)]);
  };
  return (
    <>
      <div className="header">
        <p>Score: {score}</p>
        <p>Best Score:{bestScore}</p>
      </div>
      <div className="imgRender">
        {imgUrls.map((url) => (
          <img key={url} src={url} alt="" onClick={handleClick} />
        ))}
      </div>
    </>
  );
}

export default App;
