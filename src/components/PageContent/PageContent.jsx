import React, { Component } from "react";
import { ApiRequest } from "../../utils/ApiRequest";
import CityCard from "./CityCard";
import Search from "../Search/Search";
import UsersCityWeather from "../UsersCityWeather/UsersCityWeather";

class PageContent extends Component {
  state = {
    data: [],
    searchedCity: []
  };

  getCitiesFromLS() {
    if (!localStorage.getItem("Cities")) {
      return [
        { id: "7532072" },
        { id: "7533415" },
        { id: "6695624" },
        { id: "7530738" },
        { id: "773357" },
        { id: "7530729" },
        { id: "7531906" },
        { id: "3081046" },
        { id: "7530984" },
        { id: "7531734" }
      ];
    } else return JSON.parse(localStorage.getItem("Cities"));
  }

  handleLike = incomeCityId => {
    let _cities = [...this.state.data];
    console.log(this.state.data.find(city => city.id === incomeCityId));
    const clickedCity = this.state.data.find(city => city.id === incomeCityId);
    const index = _cities.indexOf(clickedCity);
    clickedCity !== undefined
      ? _cities.splice(index, 1)
      : _cities.push(this.state.searchedCity);
    this.setState({ data: _cities });
    localStorage.setItem("Cities", JSON.stringify(_cities));
  };

  getWeatherInfo = citiesList => {
    if (!citiesList) return "no cities";

    let ids = citiesList.map(city => city.id);
    ids = ids.join(",");

    ApiRequest.create(
      `https://api.openweathermap.org/data/2.5/group?id=${ids}&units=metric&APPID=97ea200bf11177ab3c207304b3be2608`
    ).get(
      response => {
        console.log("calling for cities", response);
        this.setState({ data: response.list });
      },
      e => {
        console.log(e);
      }
    );
  };

  componentDidMount() {
    const baseCitiesList = this.getCitiesFromLS();
    this.setState({ cities: baseCitiesList });
    this.getWeatherInfo(baseCitiesList);
  }

  onSearch = searchedCity => {
    this.setState({ searchedCity });
  };

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ searchedCity: [] })}>
          Main page
        </button>
        <div>
          <Search onSearch={this.onSearch}></Search>
        </div>
        {this.props.isGeolocationEnabled ? null : (
          <div>
            <UsersCityWeather></UsersCityWeather>
          </div>
        )}
        {typeof this.state.searchedCity !== "string" ? (
          this.state.searchedCity.length !== 0 ? (
            <CityCard
              key={this.state.searchedCity.id}
              cityInfo={this.state.searchedCity}
              handleLike={this.handleLike}
            ></CityCard>
          ) : this.state.data.length !== 0 ? (
            this.state.data.map(city => (
              <CityCard
                key={city.id}
                cityInfo={city}
                handleLike={this.handleLike}
              ></CityCard>
            ))
          ) : (
            <div>
              <h1>No Cities</h1>
            </div>
          )
        ) : (
          <h1>{this.state.searchedCity}</h1>
        )}
      </div>
    );
  }
}

export default PageContent;

// componentDidUpdate() {
//   if (this.state.data.length === 0) {
//     const ids = this.props.cities.map(city => {
//       return city.id;
//     });
//     this.idsInStr = ids.join(",");

//     ApiRequest.create(
//       `https://api.openweathermap.org/data/2.5/group?id=${this.idsInStr}&units=metric&APPID=97ea200bf11177ab3c207304b3be2608`
//     ).get(
//       response => {
//         console.log("calling for cities", response);
//         this.setState({ data: response.list });
//       },
//       e => {
//         console.log(e);
//       }
//     );

//     /// тут будет поиск с айдишниками, который возвращает найденные обьекты в стейт.
//   }

// else if (this.state.search.length === 0) {
//   this.setState({ search: ["This city doesn't exist"] });
// }
// }

//   if (this.state.data.length === 0) {
//     const ids = props.cities.map(city => {
//       // debugger;
//       return city.id;
//     });
//     const idsInStr = ids.join(",");
//     // debugger;
//     ApiRequest.create(
//       `https://api.openweathermap.org/data/2.5/group?id=${idsInStr}&units=metric&APPID=97ea200bf11177ab3c207304b3be2608`
//     ).get(
//       response => {
//         console.log("calling for cities", response);
//         this.setState({ data: response.list });
//       },
//       e => {
//         console.log(e);
//       }
//     );
//   this.setState({ cities });
// }

// componentWillReceiveProps() {
//   this.setState({ search: [] });
// }
