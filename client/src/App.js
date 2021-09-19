import React from "react";
import './App.css';
import MapImage from "./resources/green-map.png";

let latitude = null;
let longitude = null;

function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
}



function App() {
  const [mode, setMode] = React.useState(0);
  const [locX, setLocX] = React.useState(0);
  const [locY, setLocY] = React.useState(0);

  /*
  React.useEffect(() => {
    fetch("https://api.weather.gov/alerts/active/area/FL", {
      method: "GET",
      headers: new Headers({
        "User-Agent": "(advd, matthewalantaylor2@gmail.com)"
      })
    })
      .then((res) => res.json())
      .then((data) => console.log(data.type))
      .catch((error) => console.log(error));
  }, []);
  */

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }

  function setLocation(e) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }

    if (latitude !== null && longitude !== null) {
      console.log(longitude);
      let xPos = (-longitude - 65) / 65.0;
      console.log(xPos * 100);
      setLocX(xPos * 100);

      console.log(latitude);
      let yPos = (latitude - 25) / 25.0;
      setLocY(yPos * 100);
      console.log(yPos);
    }
    else {
      console.log("Failed to access geolocation");
    }
  }

  function switchMode(e) {
    if (mode === 0) {
      setMode(1);
    }
    else if (mode === 1) {
      setMode(2);
      fetch("/api?command=on")
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    }
    else if (mode === 2) {
      setMode(0);
      fetch("/api?command=off")
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    }
  }

  return (
    <React.Fragment>
      <div className="button" id="mode-button" onClick={switchMode}><p>Mode</p></div>
      <table id="indicator-table">
        <tbody>
          <tr>
            <td><div className={"indicator-light" + (mode === 0 ? " on" : "")}></div></td>
            <td><div className={"indicator-light" + (mode === 1 ? " on" : "")}></div></td>
            <td><div className={"indicator-light" + (mode === 2 ? " on" : "")}></div></td>
          </tr>
          <tr>
            <td><p>Off</p></td>
            <td><p>Auto</p></td>
            <td><p>On</p></td>
          </tr>
        </tbody>
      </table>
      <div id="bg-window">
        <h1 id="title">&lt;advd/&gt;</h1>
      </div>
      <div className="centered">
        <div id="img-wrapper">
          <div id="loc-point" style={{right: locX.toString() + "%", bottom: locY.toString() + "%"}}></div>
          <img id="map-img" src={MapImage} alt="map" />
        </div>
      </div>
      <div className="button" id="loc-button" onClick={setLocation}><p>Set Location</p></div>
    </React.Fragment>
  );
}

export default App;
