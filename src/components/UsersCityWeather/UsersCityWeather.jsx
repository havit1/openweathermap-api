import React, { Component } from "react";
import { ApiRequest } from "../../utils/ApiRequest";
import "./UserCityWeather.scss";

class UsersCityWeather extends Component {
  constructor() {
    super();
    this.state = {
      cityInfo: []
    };
  }

  getUserWeather() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.getWeather(pos.coords.latitude, pos.coords.longitude);
      },
      err => console.warn(`ERROR(${err.code}): ${err.message}`),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }

  getWeather(latitude, longitude) {
    ApiRequest.create(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=97ea200bf11177ab3c207304b3be2608`
    ).get(
      response => {
        console.log("calling for user's city", response);
        this.setState({ cityInfo: response });
      },
      e => {
        console.log(e);
      }
    );
  }

  componentDidMount() {
    this.getUserWeather();
  }

  render() {
    return (
      <div className="user-info">
        {this.state.cityInfo.length === 0 ? null : (
          <div>
            <h2>City: {this.state.cityInfo.name}</h2>
            <p>Country: {this.state.cityInfo.sys.country}</p>
            <h3>Temperature: {Math.round(this.state.cityInfo.main.temp)}°C</h3>
            <p>Humidity: {this.state.cityInfo.main.humidity}</p>
            <button
              className="user-info__button"
              onClick={() => this.props.showComponent(this.state.cityInfo.id)}
            >
              Details
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default UsersCityWeather;
