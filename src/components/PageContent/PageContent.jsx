import React, { Component } from "react";
import { ApiRequest } from "../../utils/ApiRequest";
import CityCard from "./CityCard";

class PageContent extends Component {
  state = {
    data: [],
    search: []
  };

  // componentWillReceiveProps() {
  //   this.setState({ search: [] });
  // }

  componentWillReceiveProps() {
    this.setState({ search: [] });
  }

  componentDidUpdate() {
    if (this.state.data.length === 0) {
      const ids = this.props.cities.map(city => {
        return city.id;
      });
      this.idsInStr = ids.join(",");

      ApiRequest.create(
        `https://api.openweathermap.org/data/2.5/group?id=${this.idsInStr}&units=metric&APPID=97ea200bf11177ab3c207304b3be2608`
      ).get(
        response => {
          console.log("calling for cities", response);
          this.setState({ data: response.list });
        },
        e => {
          console.log(e);
        }
      );

      /// тут будет поиск с айдишниками, который возвращает найденные обьекты в стейт.
    }

    // if (typeof this.props.searchedCity !== "object") {
    //   this.setState({ search: "This city doesn't exist" });
    // } else
    if (
      typeof this.props.searchedCity === "object" &&
      this.state.search.length === 0 &&
      this.props.searchedCity.length !== 0
    ) {
      ApiRequest.create(
        `https://api.openweathermap.org/data/2.5/group?id=${this.props.searchedCity.id}&units=metric&APPID=97ea200bf11177ab3c207304b3be2608`
      ).get(
        response => {
          console.log("call for search", response);
          this.setState({ search: response.list[0] });
          console.log(this.state.search);
        },
        e => {
          console.log(e);
        }
      );
    }
    // else if (this.state.search.length === 0) {
    //   this.setState({ search: ["This city doesn't exist"] });
    // }
  }

  render() {
    return (
      <div>
        {typeof this.state.search === "object" ? (
          this.state.search.length !== 0 ? (
            <CityCard
              key={this.state.search.id}
              cityInfo={this.state.search}
            ></CityCard>
          ) : this.state.data.length !== 0 ? (
            this.state.data.map(city => (
              <CityCard key={city.id} cityInfo={city} />
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
//будут рисоваться карточки с инфой с обьектов в стейте
// на кнопку подробнее рисуется просто другой большой div,
//где уже будет более детальная инфа
//с поиском пока не придумал
//"добавить на главную страницу" будет обновлять стейт в app, при значении которого айди нужного
//города будет записываться в локалсторейдж
//с удаление аналогично наоборот
