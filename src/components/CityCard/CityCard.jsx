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
          <h2>
            {cityInfo.name}, {cityInfo.sys.country}
          </h2>
          <img
            alt="/"
            src={`http://openweathermap.org/img/wn/${cityInfo.weather[0].icon}@2x.png`}
          ></img>
          <h3>{Math.round(cityInfo.main.temp)}°C</h3>
          <p>Humidity: {cityInfo.main.humidity}</p>
        </div>
      </div>
    </div>
  );
}

export default CityCard;
