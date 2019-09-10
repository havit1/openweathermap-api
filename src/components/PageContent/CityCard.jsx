import React from "react";
import DetailedInfo from "./DetailedInfo";

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
      <div>
        <div onClick={this._onButtonClick}>
          <h2>
            {this.props.cityInfo.name}, {this.props.cityInfo.sys.country}
          </h2>
          <h3>{this.props.cityInfo.main.temp}</h3>
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
