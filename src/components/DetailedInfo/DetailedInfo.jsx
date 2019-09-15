import React, { Component } from "react";
import { ApiRequest } from "../../utils/ApiRequest";
import DetailedInfoBody from "./DetailedInfoBody";

class DetailedInfo extends Component {
  state = {
    data: [],
    showComponent: false,
    image: []
  };

  getDetailedInfo = id => {
    ApiRequest.create(
      `https://api.openweathermap.org/data/2.5/forecast?id=${id}&units=metric&APPID=97ea200bf11177ab3c207304b3be2608`
    ).get(
      response => {
        console.log("calling for city", response);
        this.setState({ data: response });
      },
      e => {
        console.log(e);
      }
    );
  };

  getPhoto = name => {
    ApiRequest.create(
      `https://api.unsplash.com/search/photos?page=1&query=${name},town&client_id=1daed900b99463debb658164eea9672dc7f95f9939b97a745a479ddbe5592be8`
    ).get(
      response => {
        if (response) {
          console.log(response);
          this.setState({
            image: response.results[Math.floor(Math.random() * (10 - 0) + 0)]
          });
        } else {
          console.error("response is empty", response);
        }
      },
      e => {
        throw new Error(e);
      }
    );
  };

  componentWillMount() {
    let idToSearch = this.props.city;
    this.getDetailedInfo(idToSearch);
    this.getPhoto(this.state.data.name);
  }

  render() {
    return <DetailedInfoBody photo={this.state.image} data={this.state.data} />;
  }
}

export default DetailedInfo;
