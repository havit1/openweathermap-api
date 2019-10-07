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
  isGeolocationEnabled,
  showComponent,
  searchedCity,
  showPage,
  data
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
          ></Search>
        </div>
      </nav>

      {!showComponent ? (
        <div className="main-content-wrapper">
          {isGeolocationEnabled ? null : (
            <div>
              <UsersCityWeather
                showComponent={_onButtonClick}
              ></UsersCityWeather>
            </div>
          )}
          <div className="main-content">
            {searchedCity !== null ? (
              searchedCity.length !== 0 ? (
                <CityCard
                  changeButtonColor={changeButtonColor}
                  key={searchedCity.id}
                  cityInfo={searchedCity}
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