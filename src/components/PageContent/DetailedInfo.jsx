import React, { Component } from "react";
import { ApiRequest } from "../../utils/ApiRequest";

class DetailedInfo extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    ApiRequest.create(
      `https://api.openweathermap.org/data/2.5/forecast?id=${this.props.city.cityInfo.id}&units=metric&APPID=97ea200bf11177ab3c207304b3be2608`
    ).get(
      response => {
        console.log("calling for city", response);
        this.setState({ data: response.list });
      },
      e => {
        console.log(e);
      }
    );
  }

  render() {
    return (
      <div>
        <header>{this.props.city.cityInfo.name}</header>
      </div>
    );
  }
}

export default DetailedInfo;
