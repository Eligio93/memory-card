import { useState, useEffect } from "react";
import gitIcon from "./assets/git-icon.svg";
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
    "Bologna",
    "Como",
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
        setImgUrls(
          responses.map((response) => ({
            url: response.results[0].urls.small,
            clicked: false,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = function (clickedUrl) {
    let updatedImg;
    //check if the image is been already clicked
    let clickedImg = imgUrls.find(
      (img) => img.url == clickedUrl && img.clicked == true
    );
    if (clickedImg) {
      //set new best score
      if (score > bestScore) {
        setBestScore(score);
      }
      setScore(0);
      //set the new array elements with clicked value on false
      updatedImg = imgUrls.map((element) => ({ ...element, clicked: false }));
    } else {
      //set the clicked value in the array with the same url on true
      updatedImg = imgUrls.map((element) =>
        clickedUrl === element.url ? { ...element, clicked: true } : element
      );
      setScore((score) => score + 1);
    }
    //set the new array with shuffled element and with the objects modified
    setImgUrls([...updatedImg.sort(() => Math.random() - 0.5)]);
  };

  const handleRestart = function () {
    setScore(0);
    setBestScore(0);
    document.querySelectorAll(".clicked").forEach((element) => {
      element.classList.remove("clicked");
    });
  };

  return (
    <>
      {/*In normalità succede questo*/}
      {score < 10 ? (
        <>
          <div className="header">
            <p>EC Italian Memories</p>
            <div className="scoreDiv">
              <p>Score: {score}</p>
              <p>Best Score:{bestScore}</p>
            </div>
          </div>
          <div className="imgRender">
            {imgUrls.map((element) => (
              <img
                key={element.url}
                src={element.url}
                alt=""
                onClick={() => handleClick(element.url)}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="popup">
            <p>Bravo! You Win!</p>
            <button onClick={handleRestart}>Restart</button>
          </div>
        </>
      )}
      <div className="footer">
        <a href="https://github.com/Eligio93/memory-card" target="_blank">
          <img src={gitIcon} alt="" />
        </a>
      </div>
    </>
  );
}

export default App;
