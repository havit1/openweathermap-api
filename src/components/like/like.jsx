import React from "react";
import "./like.scss";

const Like = props => {
  let classes = "button";
  if (props.onMainPage(props.cityId)) classes += "-green";

  return (
    <button
      onClick={() => props.handleLike(props.cityId)}
      style={{ cursor: "pointer", width: "10px", height: "10px" }}
      className={classes}
      aria-hidden="true"
    />
  );
};

export default Like;
