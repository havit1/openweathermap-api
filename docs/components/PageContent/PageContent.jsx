import React, { Component } from "react";
import { ApiRequest } from "../../utils/ApiRequest";
import CityCard from "../CityCard/CityCard";
import Search from "../Search/Search";
import UsersCityWeather from "../UsersCityWeather/UsersCityWeather";
import "./PageContent.scss";
import DetailedInfo from "../DetailedInfo/DetailedInfo";

class PageContent extends Component {
  state = {
    data: [],
    searchedCity: [],
    showPage: ""
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

  changeButtonColor = incomeCityId => {
    const clickedCity = this.state.data.find(city => city.id === incomeCityId);
    return clickedCity !== undefined ? true : false;
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

  _onButtonClick = id => {
    const showComponent = !this.state.showComponent;
    this.setState({
      showComponent
    });
    this.setState({ showPage: id });
  };

  closeDetailedInfo = () => {
    this.setState({ showComponent: false }, this.setState({ showPage: "" }));
  };

  onMainBtnClick = () => {
    this.closeDetailedInfo();
    this.setState({ searchedCity: [] });
  };

  render() {
    return (
      <div className="wrapper">
        <nav className="top-nav">
          <button className="top-nav__home-btn" onClick={this.onMainBtnClick}>
            Main page
          </button>
          <div className="top-nav__search-bar">
            <Search
              closeDetailedInfo={this.closeDetailedInfo}
              onSearch={this.onSearch}
            ></Search>
          </div>
        </nav>

        {!this.state.showComponent ? (
          <div className="main-content-wrapper">
            {this.props.isGeolocationEnabled ? null : (
              <div>
                <UsersCityWeather
                  showComponent={this._onButtonClick}
                ></UsersCityWeather>
              </div>
            )}
            <div className="main-content">
              {typeof this.state.searchedCity !== "string" ? (
                this.state.searchedCity.length !== 0 ? (
                  <CityCard
                    changeButtonColor={this.changeButtonColor}
                    key={this.state.searchedCity.id}
                    cityInfo={this.state.searchedCity}
                    handleLike={this.handleLike}
                    showComponent={this._onButtonClick}
                  ></CityCard>
                ) : this.state.data.length !== 0 ? (
                  this.state.data.map(city => (
                    <CityCard
                      changeButtonColor={this.changeButtonColor}
                      key={city.id}
                      cityInfo={city}
                      handleLike={this.handleLike}
                      showComponent={this._onButtonClick}
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
          </div>
        ) : (
          <div>
            <button
              className="detailed-info__btn"
              onClick={this.closeDetailedInfo}
            >
              Close detailed info
            </button>
            <DetailedInfo city={this.state.showPage}></DetailedInfo>
          </div>
        )}
      </div>
    );
  }
}

export default PageContent;
