import React, { Component } from "react";
import http from "../../utils/httpService";
import DetailedInfoBody from "./DetailedInfoBody";
import { paginate } from "../../utils/paginate";

class DetailedInfo extends Component {
  state = {
    data: {},
    showComponent: false,
    image: {},
    currentPage: 1
  };

  getDetailedInfo = id => {
    return http.get(
      `https://api.openweathermap.org/data/2.5/forecast?id=${id}&units=metric&APPID=97ea200bf11177ab3c207304b3be2608`
    );
  };

  getPhoto = name => {
    return http.get(
      `https://api.unsplash.com/search/photos?page=1-10&query=${name},town&client_id=1daed900b99463debb658164eea9672dc7f95f9939b97a745a479ddbe5592be8`
    );
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  async componentDidMount() {
    let idToSearch = this.props.city;
    const detailedInfo = await this.getDetailedInfo(idToSearch);

    this.setState({ data: detailedInfo.data });

    const photo = await this.getPhoto(this.state.data.city.name);

    this.setState({
      // data: detailedInfo.data,
      image: photo.data.results[Math.floor(Math.random() * (10 - 0) + 0)],
      showComponent: true
    });
  }

  render() {
    const { image, data, showComponent, currentPage } = this.state;

    const info = paginate(data.list, currentPage, 7);

    const paginatedData = { ...data, info };

    return (
      <React.Fragment>
        <DetailedInfoBody
          photo={image}
          data={paginatedData}
          showComponent={showComponent}
          handlePageChange={this.handlePageChange}
          currentPage={currentPage}
        />
      </React.Fragment>
    );
  }
}

export default DetailedInfo;
