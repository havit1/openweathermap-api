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
        // <div className="detailed-info">
        //   <h2>{data.city.name}</h2>
        //   <table className="table">
        //     <thead>
        //       <tr>
        //         <th scope="col" className="bg-primary">
        //           Day
        //         </th>
        //         <th scope="col" className="bg-primary">
        //           Temp
        //         </th>
        //         <th scope="col" className="bg-primary">
        //           Max temp
        //         </th>
        //         <th scope="col" className="bg-primary">
        //           Min temp
        //         </th>
        //         <th scope="col" className="bg-primary">
        //           Huminity
        //         </th>
        //       </tr>
        //     </thead>
        //     <tbody>
        //       {data.info.map(day => (
        //         <tr key={day.dt_txt} className="table-info">
        //           <th scope="row">
        //             {day.dt_txt
        //               .slice(5, 16)
        //               .replace(/(\w+)\.(\w+)/, "$1", "$2")
        //               .replace("-", ".")}
        //           </th>
        //           <th>{Math.round(day.main.temp)}°C</th>
        //           <th>{Math.round(day.main.temp_max)}°C</th>
        //           <th>{Math.round(day.main.temp_min)}°C</th>
        //           <th>{day.main.humidity}</th>
        //         </tr>
        //       ))}
        //     </tbody>
        //   </table>
        //   <Pagination
        //     className="pagination"
        //     itemsCount={data.list.length}
        //     pageSize={7}
        //     currentPage={currentPage}
        //     onPageChange={handlePageChange}
        //   />
        //   <img className="picture" src={photo.urls.small} alt="" />
        // </div>
        <div className="detailed-info">
          {data.info.map(day => (
            <div className="detailed-info__body">
              <h2>{getDayName(day[0].dt_txt)}</h2>
              {day.map(time => (
                <div>
                  <h2>
                    {time.dt_txt
                      .slice(12, 16)
                      .replace(/(\w+)\.(\w+)/, "$1", "$2")
                      .replace("-", ".")}
                  </h2>
                  <div>{Math.round(time.main.temp)}°C</div>
                  <img
                    alt="/"
                    src={`http://openweathermap.org/img/wn/${time.weather[0].icon}@2x.png`}
                  ></img>
                  <span>Humidity: {time.main.humidity}</span>
                  <span>Wind: {time.wind.speed}</span>
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
        </div>
      ) : (
        <div className="loading">
          <h2>Still loading</h2>
        </div>
      )}
    </div>
  );
};

export default DetailedInfoBody;
