import React, { Component } from "react";
import citiesList from "../../utils/city.list.json";
import { ApiRequest } from "../../utils/ApiRequest";
import "./Search.scss";

class Search extends Component {
  state = {
    searched: ""
  };

  onSearchChange = e => {
    this.setState({ searched: e.target.value });
    console.log(this.state.searched);
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

  getSearchedWeatherInfo = searchedCity => {
    if (typeof searchedCity !== "object") {
      this.setState({ search: "This city doesn't exist" });
      this.props.onSearch("This city doesn't exist");
      return;
    } else if (searchedCity === null) return null;
    {
      ApiRequest.create(
        `https://api.openweathermap.org/data/2.5/group?id=${searchedCity.id}&units=metric&APPID=97ea200bf11177ab3c207304b3be2608`
      ).get(
        response => {
          console.log("call for search", response);
          this.props.onSearch(response.list[0]);
        },
        e => {
          console.log(e);
        }
      );
    }
  };

  render() {
    return (
      <form className="search-bar">
        <input
          className="search-bar__input"
          type="text"
          onChange={this.onSearchChange}
        />
        <button className="search-bar__btn" onClick={this.onHandleSearch}>
          Search
        </button>
      </form>
    );
  }
}

export default Search;
