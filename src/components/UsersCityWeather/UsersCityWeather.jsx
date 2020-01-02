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
        this.setState({ cityInfo: userWeather });
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
    if (this.props.weatherInfo) return;
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

  getWeatherForFutureDays = weatherListArray => {
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

    const minMaxTemp = this.getMinMaxTemp(weatherForNextDays);

    return minMaxTemp;
  };

  getMinMaxTemp = tempList => {
    const minMaxWeatherForEachDay = [];

    tempList.map(day => {
      let maxTemp = day[0].main.temp_max,
        minTemp = day[0].main.temp_min,
        date = day[0].dt_txt,
        icon = day[0].weather[0].icon;
      day.map(time => {
        if (time.main.temp_max > maxTemp)
          maxTemp = Math.round(time.main.temp_max);
        if (time.main.temp_min < minTemp)
          minTemp = Math.round(time.main.temp_min);
      });
      minMaxWeatherForEachDay.push({ minTemp, maxTemp, date, icon });
    });
    return minMaxWeatherForEachDay;
  };

  render() {
    return (
      <div className="user-info">
        {this.state.cityInfo.length === 0 ? (
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        ) : (
          <div className="user-info__wrapper">
            <div className="user-info__today">
              <h3 className="user-info__today-header">
                {this.getDayName(this.state.cityInfo.data.list[0].dt_txt)}
              </h3>
              <h4>
                {this.state.cityInfo.data.city.name},{" "}
                {this.state.cityInfo.data.city.country}
              </h4>
              <div className="user-info__today-temp-icon">
                <h1>
                  {Math.round(this.state.cityInfo.data.list[0].main.temp)}°C
                </h1>
                <img
                  alt="/"
                  src={`http://openweathermap.org/img/wn/${this.state.cityInfo.data.list[0].weather[0].icon}@2x.png`}
                ></img>
              </div>
              <div className="user-info__today-additional">
                <span>
                  Humidity: {this.state.cityInfo.data.list[0].main.humidity}
                </span>
                <span>Wind: {this.state.cityInfo.data.list[0].wind.speed}</span>
              </div>
            </div>
            <div className="user-info__nextdays">
              {this.getWeatherForFutureDays(this.state.cityInfo.data.list).map(
                item => (
                  <div className="user-info__nextdays-nextday" key={item.date}>
                    <h3 className="user-info__nextdays-nextday-header">
                      {this.getDayName(item.date)}
                    </h3>
                    <img
                      alt="/"
                      src={`http://openweathermap.org/img/wn/${item.icon}@2x.png`}
                    ></img>
                    <div className="user-info__nextdays-nextday-temperature">
                      <div>{item.maxTemp}°C</div>
                      <div>{item.minTemp}°</div>
                    </div>
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
