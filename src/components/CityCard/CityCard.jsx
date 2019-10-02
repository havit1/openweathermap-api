import React from "react";
import "./CityCard.scss";
import Like from "../like/like";

function CityCard(props) {
  return (
    <div>
      <div className="city-card">
        <Like
          cityId={props.cityInfo.id}
          onMainPage={props.changeButtonColor}
          handleLike={props.handleLike}
        ></Like>
        <div onClick={() => props.showComponent(props.cityInfo.id)}>
          <h2>City: {props.cityInfo.name}</h2>
          <p>Country: {props.cityInfo.sys.country}</p>
          <h3>Temperature: {Math.round(props.cityInfo.main.temp)}°C</h3>
          <p>Humidity: {props.cityInfo.main.humidity}</p>
        </div>
      </div>
    </div>
  );
}

export default CityCard;
