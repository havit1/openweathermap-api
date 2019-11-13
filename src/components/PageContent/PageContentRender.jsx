import React from "react";
import CityCard from "../CityCard/CityCard";
import Search from "../Search/Search";
import UsersCityWeather from "../UsersCityWeather/UsersCityWeather";
import DetailedInfo from "../DetailedInfo/DetailedInfo";
import "./PageContent.scss";

const PageContentRender = ({
  onMainBtnClick,
  closeDetailedInfo,
  onSearch,
  _onButtonClick,
  changeButtonColor,
  handleLike,
  showComponent,
  searchedCity,
  showPage,
  data,
  showUserLocationWindow,
  onCloseUserLocationWindow,
  geolocationEnabled,
  getSearchedCityWeather,
  searchedCityInfo
}) => {
  return (
    <div className="wrapper">
      <nav className="top-nav">
        <button className="top-nav__home-button" onClick={onMainBtnClick}>
          Main page
        </button>
        <div className="top-nav__search-bar">
          <Search
            closeDetailedInfo={closeDetailedInfo}
            onSearch={onSearch}
            getSearchedCityWeather={getSearchedCityWeather}
          ></Search>
        </div>
      </nav>
      {!showComponent ? (
        <div className="main-content-wrapper">
          {geolocationEnabled === "granted" ? (
            <div>
              {showUserLocationWindow ? (
                <div>
                  <h1>Your location information:</h1>
                  <UsersCityWeather
                    showComponent={_onButtonClick}
                  ></UsersCityWeather>
                </div>
              ) : null}
              <button onClick={onCloseUserLocationWindow}>
                {showUserLocationWindow ? "Close" : "Show"} user location window
              </button>
            </div>
          ) : null}
          <div className="main-content">
            {searchedCityInfo !== null ? (
              searchedCityInfo.length !== 0 ? (
                <CityCard
                  changeButtonColor={changeButtonColor}
                  key={searchedCityInfo.id}
                  cityInfo={searchedCityInfo}
                  handleLike={handleLike}
                  showComponent={_onButtonClick}
                ></CityCard>
              ) : (
                data.map(city => (
                  <CityCard
                    changeButtonColor={changeButtonColor}
                    key={city.id}
                    cityInfo={city}
                    handleLike={handleLike}
                    showComponent={_onButtonClick}
                  ></CityCard>
                ))
              )
            ) : (
              <h1>No such city or misspelled name</h1>
            )}
          </div>
        </div>
      ) : (
        <div>
          <button className="detailed-info__button" onClick={closeDetailedInfo}>
            Close detailed info
          </button>
          <DetailedInfo city={showPage}></DetailedInfo>
        </div>
      )}
    </div>
  );
};

export default PageContentRender;
