import React, { Component } from "react";
import http from "../../utils/httpService";
import DetailedInfoBody from "./DetailedInfoBody";
import { paginate } from "../../utils/paginate";

class DetailedInfo extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      showComponent: false,
      image: {},
      currentPage: 1,
      sortedData: []
    };
  }

  getDetailedInfo = id => {
    return http.get(
      `https://api.openweathermap.org/data/2.5/forecast?id=${id}&units=metric&APPID=97ea200bf11177ab3c207304b3be2608`
    );
  };

  getPhoto = name => {
    return http.get(
      `https://api.unsplash.com/search/photos?count=10&query=${name},town&client_id=1daed900b99463debb658164eea9672dc7f95f9939b97a745a479ddbe5592be8`
    );
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  async componentDidMount() {
    let idToSearch = this.props.city;
    const detailedInfo = await this.getDetailedInfo(idToSearch);

    this.setState({ data: detailedInfo.data });

    const sortedData = this.getWeatherForEachDay(detailedInfo.data.list);

    this.setState({ sortedData });

    const photo = await this.getPhoto(this.state.data.city.name);

    console.log(photo);

    this.setState({
      image: photo.data.results,
      showComponent: true
    });
  }

  getDayName = dateString => {
    dateString.split(" ").join("T");
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    const d = new Date(dateString);
    const dayName = days[d.getDay()];
    return dayName;
  };

  getWeatherForEachDay = weatherListArray => {
    const weatherForNextDays = [];
    const weatherListTest = [...weatherListArray];

    for (let i = 0; i < weatherListTest.length; i++) {
      const weatherListNextDay = weatherListTest.filter(
        day =>
          new Date(weatherListTest[0].dt_txt.split(" ").join("T")).getDay() ===
          new Date(day.dt_txt.split(" ").join("T")).getDay()
      );

      weatherForNextDays.push(weatherListNextDay);

      weatherListTest.splice(
        weatherListTest.indexOf(weatherListNextDay[0]),
        weatherListTest.indexOf(
          weatherListNextDay[weatherListNextDay.length - 1]
        ) + 1
      );
    }

    console.log(weatherForNextDays);

    return weatherForNextDays;
  };

  render() {
    const { image, showComponent, currentPage, sortedData } = this.state;

    const info = paginate(sortedData, currentPage, 1);

    const paginatedData = { ...sortedData, info };

    return (
      <DetailedInfoBody
        getDayName={this.getDayName}
        sortedData={sortedData}
        photo={image}
        data={paginatedData}
        showComponent={showComponent}
        handlePageChange={this.handlePageChange}
        currentPage={currentPage}
      />
    );
  }
}

export default DetailedInfo;
