import React from "react";
import "./CityCard.scss";
import Like from "../like/like";

function CityCard({ cityInfo, changeButtonColor, handleLike, showComponent }) {
  return (
    <div>
      <div className="city-card">
        <Like
          cityId={cityInfo.id}
          onMainPage={changeButtonColor}
          handleLike={handleLike}
        ></Like>
        <div onClick={() => showComponent(cityInfo.id)}>
          <h2>City: {cityInfo.name}</h2>
          <p>Country: {cityInfo.sys.country}</p>
          <h3>Temperature: {Math.round(cityInfo.main.temp)}°C</h3>
          <p>Humidity: {cityInfo.main.humidity}</p>
        </div>
      </div>
    </div>
  );
}

export default CityCard;
