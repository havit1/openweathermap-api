import React, { Component } from "react";
import cityId from "../../utils/city.list.json";

class Search extends Component {
  state = {
    searched: ""
  };

  onSearchChange = e => {
    this.setState({ searched: e.target.value });
    console.log(this.state.searched);
  };

  onHandleSearch = e => {
    e.preventDefault();

    const search =
      this.state.searched.length > 0
        ? cityId.find(city => city.name === this.state.searched)
        : "This city doesn't exist";
    this.props.onSearch(search);
  };

  render() {
    return (
      <form>
        <input type="text" onChange={this.onSearchChange} />
        <button onClick={this.onHandleSearch}>Search</button>
      </form>
    );
  }
}

export default Search;
