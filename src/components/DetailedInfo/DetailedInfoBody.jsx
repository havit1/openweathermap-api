import React from "react";
import "../styles/bootstrap-4.3.1-dist/css/bootstrap.css";

const DetailedInfoBody = props => {
  return (
    <div>
      {props.data.length === 0 || props.photo.length === 0 ? null : (
        <div>
          <h2>{props.data.city.name}</h2>
          <table className="table table-borderless">
            <thead>
              <tr>
                <th scope="col">Day</th>
                <th scope="col">Temp</th>
                <th scope="col">Max temp</th>
                <th scope="col">Min temp</th>
                <th scope="col">Huminity</th>
              </tr>
            </thead>
            <tbody>
              {props.data.list.map(day => (
                <tr>
                  <th scope="row">{day.dt_txt}</th>
                  <th>{Math.round(day.main.temp)}°C</th>
                  <th>{Math.round(day.main.temp_max)}°C</th>
                  <th>{Math.round(day.main.temp_min)}°C</th>
                  <th>{day.main.humidity}</th>
                </tr>
              ))}
            </tbody>
          </table>
          <img src={props.photo.urls.regular} alt="" />
        </div>
      )}
    </div>
  );
};

export default DetailedInfoBody;
