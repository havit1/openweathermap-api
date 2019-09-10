import React, { Component } from "react";
import { ApiRequest } from "../../utils/ApiRequest";

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
    return <h2>{this.state.cityInfo.name}</h2>;
  }
}

export default UsersCityWeather;
