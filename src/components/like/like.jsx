import React from "react";
import "./like.scss";

const Like = props => {
  let classes = "like-button";
  if (props.onMainPage(props.cityId)) classes += "_submitted";

  return (
    <button
      onClick={() => props.handleLike(props.cityId)}
      className={classes}
      aria-hidden="true"
    >
      {classes === "like-button_submitted" ? "X" : "✓"}
    </button>
  );
};

export default Like;
