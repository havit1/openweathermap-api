import React from "react";
import "./DetailedInfo.scss";
import Pagination from "../../utils/pagination";

const DetailedInfoBody = ({
  data,
  photo,
  showComponent,
  handlePageChange,
  currentPage,
  sortedData,
  getDayName
}) => {
  return (
    <div>
      {showComponent === true ? (
        <div className="detailed-info">
          {data.info.map(day => (
            <div key={day[0].dt} className="detailed-info__body">
              <h2 className="detailed-info__day-name">
                {getDayName(day[0].dt_txt)}
              </h2>
              {day.map(time => (
                <div className="detailed-info__weather-card" key={time.dt_txt}>
                  <h2 className="detailed-info__weather-card-time">
                    {time.dt_txt
                      .slice(12, 16)
                      .replace(/(\w+)\.(\w+)/, "$1", "$2")
                      .replace("-", ".")}
                  </h2>
                  <div className="detailed-info__weather-card-temp-img">
                    <div>{Math.round(time.main.temp)}°C</div>
                    <img
                      alt="/"
                      src={`http://openweathermap.org/img/wn/${time.weather[0].icon}@2x.png`}
                    ></img>
                  </div>
                  <div className="detailed-info__weather-card-additional">
                    <span>Humidity: {time.main.humidity}</span>
                    <span>Wind: {time.wind.speed}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <Pagination
            className="pagination"
            itemsCount={sortedData.length}
            pageSize={1}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
          <h1 className="awesome-photos">Awesome photos</h1>
          <div className="awesome-photos__wrapper">
            {photo.map(photo => (
              <div key={photo.id} className="awesome-photos__wrapper-photo">
                <img src={photo.urls.small} alt="" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="loading">
          <h1 className="loading_text">Loading...</h1>
        </div>
      )}
    </div>
  );
};

export default DetailedInfoBody;
