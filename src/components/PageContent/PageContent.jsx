import React, { Component } from "react";
import http from "../../utils/httpService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageContentRender from "./PageContentRender";
import { toast } from "react-toastify";

class PageContent extends Component {
  state = {
    data: [],
    searchedCityInfo: [],
    searchedCity: "",
    showPage: "",
    showUserLocationWindow: false,
    geolocationEnabled: false
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
    //good, i guess
    let _cities = [...this.state.data];
    const clickedCity = this.state.data.find(city => city.id === incomeCityId);
    const index = _cities.indexOf(clickedCity);
    if (clickedCity !== undefined) {
      _cities.splice(index, 1);
      toast.warn("Deleted this city from main page");
    } else {
      _cities.push(this.state.searchedCityInfo);
      toast.success("Added this city on main page");
    }
    this.setState({ data: _cities });
    localStorage.setItem("Cities", JSON.stringify(_cities));
  };

  changeButtonColor = incomeCityId => {
    //dk what's going on here
    const clickedCity = this.state.data.find(city => city.id === incomeCityId);
    return clickedCity !== undefined ? true : false;
  };

  getWeatherInfo = citiesList => {
    //ok
    if (!citiesList) return null;

    let idsToSearch = citiesList.map(city => city.id).join(",");

    return http.get(
      `https://api.openweathermap.org/data/2.5/group?id=${idsToSearch}&units=metric&APPID=97ea200bf11177ab3c207304b3be2608`
    );
  };

  async componentDidMount() {
    //maybe ok
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
    //wut
    const showComponent = !this.state.showComponent;
    this.setState({
      showComponent
    });
    this.setState({ showPage: id });
  };

  closeDetailedInfo = () => {
    //wat
    this.setState({ showComponent: false }, this.setState({ showPage: "" }));
  };

  onMainBtnClick = () => {
    //why
    this.closeDetailedInfo();
    this.setState({ searchedCityInfo: [] });
  };

  onCloseUserLocationWindow = () => {
    //that's ok
    this.setState({
      showUserLocationWindow: !this.state.showUserLocationWindow
    });
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <PageContentRender
          {...this} //wtf
          {...this.props} //wtf
          {...this.state} //wtf
        ></PageContentRender>
      </React.Fragment>
    );
  }
}

export default PageContent;
