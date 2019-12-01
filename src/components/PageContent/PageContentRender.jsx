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
      <header className="header">
        <button className="header__home-button" onClick={onMainBtnClick}>
          Home
        </button>
        <Search
          closeDetailedInfo={closeDetailedInfo}
          onSearch={onSearch}
          getSearchedCityWeather={getSearchedCityWeather}
        ></Search>
      </header>
      {!showComponent ? (
        <main className="main-content-wrapper">
          {geolocationEnabled === "granted" ? (
            <div>
              {showUserLocationWindow ? (
                <div>
                  <UsersCityWeather
                    showComponent={_onButtonClick}
                  ></UsersCityWeather>
                </div>
              ) : null}
              <div
                className="main-content__show-info-button"
                onClick={onCloseUserLocationWindow}
              >
                {showUserLocationWindow ? "Hide" : "Show"} weather in your
                location
              </div>
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
        </main>
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
