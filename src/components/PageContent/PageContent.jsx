import React, { Component } from "react";
import { ApiRequest } from "../../utils/ApiRequest";
import fullCitiesList from "../../utils/city.list.json";
import CityCard from "./CityCard";
import Search from "../Search/Search";

class PageContent extends Component {
  state = {
    data: [],
    searchedCity: []
  };

  getCitiesFromLS() {
    if (!localStorage.getItem("Cities")) {
      return [
        { name: "Kiev" },
        { name: "Tokyo" },
        { name: "New York" },
        { name: "Hong Kong" },
        { name: "Paris" },
        { name: "Berlin" },
        { name: "Moskva" },
        { name: "Minsk" },
        { name: "Warszawa" },
        { name: "Seoul" }
      ];
    } else return JSON.parse(localStorage.getItem("Cities"));
  }

  handleLike = incomeCityId => {
    let _cities = [...this.state.data];
    const clickedCity = this.state.data.find(city => city.id === incomeCityId);
    const index = _cities.indexOf(clickedCity);
    _cities.splice(index, 1);
    this.setState({ data: _cities });
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

    let cities = baseCitiesList.map(cityName => {
      return fullCitiesList.find(city => city.name === cityName.name);
    });

    this.getWeatherInfo(cities);
  }

  // componentWillReceiveProps() {
  //   this.setState({ search: [] });
  // }

  onSearch = searchedCity => {
    this.setState({ searchedCity });
  };

  render() {
    return (
      <div>
        <div>
          <Search onSearch={this.onSearch}></Search>
        </div>
        {typeof this.state.searchedCity === "object" ? (
          this.state.searchedCity.length !== 0 ? (
            <CityCard
              key={this.state.searchedCity.id}
              cityInfo={this.state.searchedCity}
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
          <h1>{this.state.search}</h1>
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
