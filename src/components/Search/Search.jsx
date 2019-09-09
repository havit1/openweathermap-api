import React, { Component } from "react";
import citiesList from "../../utils/city.list.json";
import { ApiRequest } from "../../utils/ApiRequest";

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

    this.getSearchedWeatherInfo(search);
  };

  getSearchedWeatherInfo = searchedCity => {
    if (typeof searchedCity !== "object") {
      this.setState({ search: "This city doesn't exist" });
      this.props.onSearch("This city doesn't exist");
      return;
    }
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
      <form>
        <input type="text" onChange={this.onSearchChange} />
        <button onClick={this.onHandleSearch}>Search</button>
      </form>
    );
  }
}

export default Search;
