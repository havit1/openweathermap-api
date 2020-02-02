import React from "react";
import Search from "../Search/Search";
import UsersCityWeather from "../UsersCityWeather/UsersCityWeather";
import "./PageContent.scss";

const CityCard = React.lazy(() => import("../CityCard/CityCard"));
const DetailedInfo = React.lazy(() => import("../DetailedInfo/DetailedInfo"));

const PageContentRender = ({
  onMainBtnClick,
  closeDetailedInfo,
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
    <React.Fragment>
      <div className="wrapper">
        <header className="header">
          <button className="header__home-button" onClick={onMainBtnClick}>
            Home
          </button>
          <Search
            closeDetailedInfo={closeDetailedInfo}
            getSearchedCityWeather={getSearchedCityWeather}
          ></Search>
        </header>
        {!showComponent ? (
          <main className="main-content-wrapper">
            {geolocationEnabled === "granted" ? (
              <div>
                {showUserLocationWindow ? (
                  <UsersCityWeather
                    showComponent={_onButtonClick}
                  ></UsersCityWeather>
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
                  <React.Suspense fallback={<div></div>}>
                    <CityCard
                      changeButtonColor={changeButtonColor}
                      key={searchedCityInfo.id}
                      cityInfo={searchedCityInfo}
                      handleLike={handleLike}
                      showComponent={_onButtonClick}
                    ></CityCard>
                  </React.Suspense>
                ) : (
                  data.map(city => (
                    <React.Suspense fallback={<div></div>}>
                      <CityCard
                        changeButtonColor={changeButtonColor}
                        key={city.id}
                        cityInfo={city}
                        handleLike={handleLike}
                        showComponent={_onButtonClick}
                      ></CityCard>
                    </React.Suspense>
                  ))
                )
              ) : (
                <h1>No such city or misspelled name</h1>
              )}
            </div>
          </main>
        ) : (
          <React.Fragment>
            <button
              className="detailed-info__button"
              onClick={closeDetailedInfo}
            >
              ←
            </button>
            <React.Suspense fallback={<div>Loading..</div>}>
              <DetailedInfo city={showPage}></DetailedInfo>
            </React.Suspense>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default PageContentRender;
