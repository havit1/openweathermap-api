import React, { Component } from "react";
import "./App.scss";
import cityId from "./utils/city.list.json";
import PageContent from "./components/PageContent/PageContent";
import Search from "./components/Search/Search";

class App extends Component {
  state = {
    cities: this.getCitiesFromLS(),
    search: []
  };

  onSearch = search => {
    this.setState({ search });
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

  componentDidMount() {
    const cities = this.state.cities.map(cityNoId => {
      return cityId.find(city => city.name === cityNoId.name);
    });
    console.log(cities);
    this.setState({ cities });
  }

  render() {
    return (
      <div>
        <Search onSearch={this.onSearch}></Search>
        <PageContent
          cities={this.state.cities}
          searchedCity={this.state.search}
        />
      </div>
    );
  }
}

export default App;
