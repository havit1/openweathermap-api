import React, { Component } from "react";
import http from "../../utils/httpService";
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
      async pos => {
        const userWeather = await this.getWeather(
          pos.coords.latitude,
          pos.coords.longitude
        );
        this.setState({ cityInfo: userWeather.data });
      },
      err => console.warn(`ERROR(${err.code}): ${err.message}`),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }

  getWeather(latitude, longitude) {
    return http.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=97ea200bf11177ab3c207304b3be2608`
    );
  }

  componentDidMount() {
    this.getUserWeather();
  }

  render() {
    return (
      <div className="user-info">
        {this.state.cityInfo.length === 0 ? (
          <h1>Loading</h1>
        ) : (
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
