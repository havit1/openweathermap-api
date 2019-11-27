import React, { Component } from "react";
import citiesList from "../../utils/city.list.json";
import http from "../../utils/httpService";
import "./Search.scss";

class Search extends Component {
  state = {
    searchedLine: "",
    searchedCityWeather: {}
  };

  onSearchChange = e => {
    this.setState({ searchedLine: e.target.value });
  };

  onHandleSearch = e => {
    e.preventDefault();
    const search =
      this.state.searchedLine.length > 0
        ? citiesList.find(city => city.name === this.state.searchedLine)
        : null;
    this.props.closeDetailedInfo();
    this.getSearchedWeatherInfo(search);
  };

  getSearchedWeatherInfo = async searchedCity => {
    if (searchedCity === undefined) {
      this.props.getSearchedCityWeather(null);
      return;
    } else if (searchedCity === null) return null;

    const searchedCityInfo = await http.get(
      `https://api.openweathermap.org/data/2.5/group?id=${searchedCity.id}&units=metric&APPID=97ea200bf11177ab3c207304b3be2608`
    );
    this.props.getSearchedCityWeather(searchedCityInfo.data.list[0]);
  };

  render() {
    const { onSearchChange, onHandleSearch } = this;

    return (
      <form className="search-bar">
        <input
          className="search-bar__input"
          type="text"
          onChange={onSearchChange}
        />
        <button className="search-bar__btn" onClick={onHandleSearch}>
          Find
        </button>
      </form>
    );
  }
}

export default Search;
