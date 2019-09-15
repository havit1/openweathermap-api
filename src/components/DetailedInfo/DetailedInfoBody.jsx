import React from "react";
import "../styles/bootstrap-4.3.1-dist/css/bootstrap.css";
import "./DetailedInfo.scss";

const DetailedInfoBody = props => {
  return (
    <div class="detailed-info">
      {props.data.length === 0 || props.photo.length === 0 ? null : (
        <div>
          <h2>{props.data.city.name}</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col" className="bg-primary">
                  Day
                </th>
                <th scope="col" className="bg-primary">
                  Temp
                </th>
                <th scope="col" className="bg-primary">
                  Max temp
                </th>
                <th scope="col" className="bg-primary">
                  Min temp
                </th>
                <th scope="col" className="bg-primary">
                  Huminity
                </th>
              </tr>
            </thead>
            <tbody>
              {props.data.list.map(day => (
                <tr className="table-info">
                  <th scope="row">
                    {day.dt_txt
                      .slice(5, 16)
                      .replace(/(\w+)\.(\w+)/, "$1", "$2")
                      .replace("-", ".")}
                  </th>
                  <th>{Math.round(day.main.temp)}°C</th>
                  <th>{Math.round(day.main.temp_max)}°C</th>
                  <th>{Math.round(day.main.temp_min)}°C</th>
                  <th>{day.main.humidity}</th>
                </tr>
              ))}
            </tbody>
          </table>
          <img src={props.photo.urls.small} alt="" />
        </div>
      )}
    </div>
  );
};

export default DetailedInfoBody;
