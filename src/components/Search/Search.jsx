import React, { Component } from "react";
import citiesList from "../../utils/city.list.json";
import http from "../../utils/httpService";
import "./Search.scss";

class Search extends Component {
  state = {
    searched: ""
  };

  onSearchChange = e => {
    this.setState({ searched: e.target.value });
    if (e.target.value === "") {
      this.props.onSearch([]);
    }
  };

  onHandleSearch = e => {
    e.preventDefault();

    const search =
      this.state.searched.length > 0
        ? citiesList.find(city => city.name === this.state.searched)
        : null;
    this.props.closeDetailedInfo();
    this.getSearchedWeatherInfo(search);
  };

  getSearchedWeatherInfo = async searchedCity => {
    if (typeof searchedCity !== "object") {
      this.setState({ search: "This city doesn't exist" });
      this.props.onSearch("This city doesn't exist");
      return;
    } else if (searchedCity === null) return null;

    const searchedCityInfo = await http.get(
      `https://api.openweathermap.org/data/2.5/group?id=${searchedCity.id}&units=metric&APPID=97ea200bf11177ab3c207304b3be2608`
    );
    this.props.onSearch(searchedCityInfo.data.list[0]);
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
          Search
        </button>
      </form>
    );
  }
}

export default Search;
