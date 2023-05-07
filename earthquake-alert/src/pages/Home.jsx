import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GoogleMap from "../components/GoogleMap";
import "../styles/App.css";
import "../styles/Sidebar.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState(37.569227); // 위도
  const [lng, setLng] = useState(126.9777256); // 경도
  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const getMyLocation = () => {
    function onGeoOk(position) {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
    }

    function onGeoError() {
      alert("위치를 찾을 수 없습니다.");
    }

    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
  };

  useEffect(() => {
    getMyLocation(); // 위치 정보를 받아옴
    setInterval(() => {
      getMyLocation();
    }, 10000); // 30초마다 위치 정보를 받아옴
  }, []);

  useEffect(() => {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setLocation(data.results[0].formatted_address);
      });
    console.log(location);
  }, [lat, lng]);

  return (
    <div>
      <div className="root">
        <Header isOpen={isOpen} />
        <button
          className={`bookmark_button ${isOpen ? "open" : ""}`}
          onClick={toggleSidebar}
        >
          ⭐
        </button>
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
          {/* <div className="bookmark_add">+</div>
          <div className="bookmark_remove">-</div> */}
        </div>
        <main className={`main ${isOpen ? "open" : ""}`}>
          <div className="map_title">내 주변 대피소를 찾아보세요</div>
          <div className="map">
            <GoogleMap lat={lat} lng={lng} />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
