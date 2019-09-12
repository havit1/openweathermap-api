import React from "react";
import DetailedInfo from "./DetailedInfo";
import "./CityCard.scss";

class CityCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false
    };
  }

  _onButtonClick = () => {
    const showComponent = !this.state.showComponent;
    this.setState({
      showComponent
    });
  };

  render() {
    return (
      <div className="city-card">
        <div onClick={this._onButtonClick}>
          <h2>{this.props.cityInfo.name}</h2>
          <p>Country: {this.props.cityInfo.sys.country}</p>
          <h3>{Math.round(this.props.cityInfo.main.temp)}°C</h3>
        </div>
        <button onClick={() => this.props.handleLike(this.props.cityInfo.id)}>
          Like/Dislike
        </button>
        {this.state.showComponent ? <DetailedInfo city={this.props} /> : null}
      </div>
    );
  }
}

export default CityCard;
