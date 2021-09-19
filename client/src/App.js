import React from "react";
import './App.css';
import MapImage from "./resources/green-map.png";

function App() {
  const [data, setData] = React.useState(null);
  const [mode, setMode] = React.useState(0);

  /*
  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);
  */

  React.useEffect(() => {
    fetch("https://api.weather.gov/alerts/active/area/FL", {
      method: "GET",
      headers: new Headers({
        "User-Agent": "(advd, matthewalantaylor2@gmail.com)"
      })
    })
      .then((res) => res.json())
      .then((data) => console.log(data["type"]))
      .catch((error) => console.log(error));
  }, []);

  function switchMode(e) {
    if (mode < 2) {
        setMode(mode + 1);
    }
    else {
      setMode(0);
    }
    console.log(mode);
  }

  return (
    <React.Fragment>
      <div id="button" onClick={switchMode}><p>Mode</p></div>
      <table id="indicator-table">
        <tbody>
          <tr>
            <td><div className={"indicator-light" + (mode === 0 ? " on" : "")}></div></td>
            <td><div className={"indicator-light" + (mode === 1 ? " on" : "")}></div></td>
            <td><div className={"indicator-light" + (mode === 2 ? " on" : "")}></div></td>
          </tr>
          <tr>
            <td><p>On</p></td>
            <td><p>Auto</p></td>
            <td><p>Off</p></td>
          </tr>
        </tbody>
      </table>
      <div id="bg-window"></div>
      <div className="centered">
        <div id="img-wrapper">
          <div id="loc-point"></div>
          <img id="map-img" src={MapImage} alt="map" />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
