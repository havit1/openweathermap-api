import React from "react";
import DetailedInfo from "./DetailedInfo";

// const CityCard = props => {
//   return (
//     <div>
//       <h2>
//         {props.cityInfo.name}, {props.cityInfo.sys.country}
//       </h2>
//       <h3>{props.cityInfo.main.temp}</h3>
//     </div>
//   );
// };

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
      <div onClick={this._onButtonClick}>
        <h2>
          {this.props.cityInfo.name}, {this.props.cityInfo.sys.country}
        </h2>
        <h3>{this.props.cityInfo.main.temp}</h3>
        {this.state.showComponent ? <DetailedInfo city={this.props} /> : null}
      </div>
    );
  }
}

export default CityCard;
