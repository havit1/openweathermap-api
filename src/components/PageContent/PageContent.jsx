import React, { Component } from "react";
import http from "../../utils/httpService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageContentRender from "./PageContentRender";

class PageContent extends Component {
  state = {
    data: [],
    searchedCityInfo: [],
    searchedCity: "",
    showPage: "",
    showUserLocationWindow: true,
    geolocationEnabled: false,
    showComponent: false
  };

  getCitiesFromLS() {
    //good
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
    const clickedCity = this.state.data.find(city => city.id === incomeCityId);
    const index = _cities.indexOf(clickedCity);
    if (clickedCity !== undefined) {
      _cities.splice(index, 1);
    } else {
      _cities.push(this.state.searchedCityInfo);
    }
    this.setState({ data: _cities });
    localStorage.setItem("Cities", JSON.stringify(_cities));
  };

  changeButtonColor = incomeCityId => {
    const clickedCity = this.state.data.find(city => city.id === incomeCityId);
    return clickedCity !== undefined ? true : false;
  };

  getWeatherInfo = citiesList => {
    if (!citiesList) return null;

    let idsToSearch = citiesList.map(city => city.id).join(",");

    return http.get(
      `https://api.openweathermap.org/data/2.5/group?id=${idsToSearch}&units=metric&APPID=97ea200bf11177ab3c207304b3be2608`
    );
  };

  async componentDidMount() {
    const baseCitiesList = this.getCitiesFromLS();
    const weatherInfo = await this.getWeatherInfo(baseCitiesList);
    this.setState({ data: weatherInfo.data.list, cities: baseCitiesList });
    navigator.permissions.query({ name: "geolocation" }).then(status => {
      this.setState({ geolocationEnabled: status.state });
    });
  }

  getSearchedCityWeather = searchedCityInfo => {
    this.setState({ searchedCityInfo });
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
    this.setState({ searchedCityInfo: [] });
  };

  onCloseUserLocationWindow = () => {
    this.setState({
      showUserLocationWindow: !this.state.showUserLocationWindow
    });
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <PageContentRender
          {...this}
          {...this.props}
          {...this.state}
        ></PageContentRender>
      </React.Fragment>
    );
  }
}

export default PageContent;
