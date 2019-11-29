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
        this.setState({ cityInfo: userWeather }, () => {
          console.log(userWeather);
        });
      },
      err => console.warn(`ERROR(${err.code}): ${err.message}`),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }

  getWeather(latitude, longitude) {
    return http.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&APPID=97ea200bf11177ab3c207304b3be2608`
    );
  }

  componentDidMount() {
    this.getUserWeather();
  }

  getDayName = dateString => {
    dateString.split(" ").join("T");
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    const d = new Date(dateString);
    const dayName = days[d.getDay()];
    return dayName;
  };

  transformWeather = weatherListArray => {
    const weatherForNextDays = [];
    const weatherListTest = [...weatherListArray];
    for (let i = 0; i < weatherListTest.length; i++) {
      const weatherListNextDay = weatherListTest.filter(
        day =>
          new Date(weatherListTest[0].dt_txt.split(" ").join("T")).getDay() ===
          new Date(day.dt_txt.split(" ").join("T")).getDay()
      );

      weatherForNextDays.push(weatherListNextDay);

      weatherListTest.splice(
        weatherListTest.indexOf(weatherListNextDay[0]),
        weatherListTest.indexOf(
          weatherListNextDay[weatherListNextDay.length - 1]
        ) + 1
      );
    }
    weatherForNextDays.splice(0, 1);
    console.log(weatherForNextDays);
    return weatherForNextDays;
  };

  render() {
    return (
      <div className="user-info">
        {this.state.cityInfo.length === 0 ? (
          <h1>Loading</h1>
        ) : (
          <div>
            <div className="user-info__today">
              <h2>
                City: {this.state.cityInfo.data.city.name},{" "}
                {this.state.cityInfo.data.city.country}
              </h2>

              <h3>
                Temperature:{" "}
                {Math.round(this.state.cityInfo.data.list[0].main.temp)}°C
              </h3>
              <h3>
                {this.getDayName(this.state.cityInfo.data.list[0].dt_txt)}
              </h3>
              <img
                src={`http://openweathermap.org/img/wn/${this.state.cityInfo.data.list[0].weather[0].icon}@2x.png`}
              ></img>
              {/*
              <p>Humidity: {this.state.cityInfo.main.humidity}</p>
              <button
                className="user-info__button"
                onClick={() => this.props.showComponent(this.state.cityInfo.id)}
              >
                Details
              </button> */}
            </div>
            <div className="user-info__nextdays">
              {this.transformWeather(this.state.cityInfo.data.list).map(
                item => (
                  <div>
                    {item.map(item => (
                      <div>{this.getDayName(item.dt_txt)}</div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default UsersCityWeather;
